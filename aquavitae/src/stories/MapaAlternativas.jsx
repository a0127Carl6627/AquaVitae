import React, { useEffect, useRef } from 'react';
import mexicoGeoJson from './assets/mexico-geojson.json';

const RISK_COLOR = { alta: '#e23b3b', amber: '#e89923', green: '#2ea36b', red: '#e23b3b' };

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function getStateColor(geoName, plantaActual, alternativas) {
  const gn = normalize(geoName);
  if (plantaActual && gn === normalize(plantaActual.estado)) return '#e23b3b';
  const alt = alternativas.find(a => {
    const an = normalize(a.estado);
    return gn === an || gn.startsWith(an) || an.startsWith(gn);
  });
  if (!alt) return '#dde3ec';
  return RISK_COLOR[alt.riesgo] || '#dde3ec';
}

export default function MapaAlternativas({
  plantaActual = null,
  alternativas = [],
  height = 380,
  onSelectAlternativa,
  selectedEstado = null,
}) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const layersRef = useRef({});   // normalizedName → leaflet layer

  useEffect(() => {
    if (instanceRef.current) return;

    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css');

      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([23.5, -101.5], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        opacity: 0.3,
      }).addTo(map);

      L.geoJson(mexicoGeoJson, {
        style: feature => {
          const name = feature.properties.name || feature.properties.NAME_1 || '';
          return {
            fillColor: getStateColor(name, plantaActual, alternativas),
            weight: 1.2,
            color: '#ffffff',
            fillOpacity: 0.7,
          };
        },
        onEachFeature: (feature, layer) => {
          const name = feature.properties.name || feature.properties.NAME_1 || '';
          const gn = normalize(name);

          layersRef.current[gn] = layer;

          const isActual = plantaActual && gn === normalize(plantaActual.estado);
          const alt = alternativas.find(a => {
            const an = normalize(a.estado);
            return gn === an || gn.startsWith(an) || an.startsWith(gn);
          });

          let tip;
          if (isActual) {
            tip = `<strong>${name}</strong><br/>Planta actual · Riesgo alto`;
          } else if (alt) {
            tip = `<strong>${name}</strong><br/>${alt.nombre}<br/>Riesgo: ${alt.riesgoLabel}<br/>Costo total: ${alt.costoTotal}`;
          } else {
            tip = `<strong>${name}</strong><br/>Sin alternativa`;
          }

          layer.bindTooltip(tip, { sticky: true });

          layer.on({
            mouseover: e => e.target.setStyle({ weight: 2.5, color: '#1a2332', fillOpacity: 0.9 }),
            mouseout: () => {
              const baseColor = getStateColor(name, plantaActual, alternativas);
              const isSel = selectedEstadoRef.current && (
                gn === normalize(selectedEstadoRef.current) ||
                gn.startsWith(normalize(selectedEstadoRef.current)) ||
                normalize(selectedEstadoRef.current).startsWith(gn)
              );
              layer.setStyle({
                weight: isSel ? 2.5 : 1.2,
                color: isSel ? '#1a2332' : '#ffffff',
                fillOpacity: isSel ? 0.95 : 0.7,
                fillColor: isSel ? '#2563eb' : baseColor,
              });
            },
            click: () => alt && onSelectAlternativa?.(alt),
          });
        },
      }).addTo(map);

      instanceRef.current = map;
    });

    return () => {
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
        layersRef.current = {};
      }
    };
  }, [plantaActual, alternativas, onSelectAlternativa]);

  // Ref to track current selectedEstado inside Leaflet event handlers
  const selectedEstadoRef = useRef(selectedEstado);

  // When selectedEstado changes, update layer styles imperatively
  useEffect(() => {
    selectedEstadoRef.current = selectedEstado;
    if (!instanceRef.current) return;

    const selNorm = selectedEstado ? normalize(selectedEstado) : null;

    Object.entries(layersRef.current).forEach(([gn, layer]) => {
      const feature = layer.feature;
      const name = feature.properties.name || feature.properties.NAME_1 || '';
      const baseColor = getStateColor(name, plantaActual, alternativas);

      const isSelected = selNorm && (
        gn === selNorm ||
        gn.startsWith(selNorm) ||
        selNorm.startsWith(gn)
      );

      layer.setStyle({
        fillColor: isSelected ? '#2563eb' : baseColor,
        weight: isSelected ? 2.5 : 1.2,
        color: isSelected ? '#1a2332' : '#ffffff',
        fillOpacity: isSelected ? 0.95 : 0.7,
      });
    });
  }, [selectedEstado, plantaActual, alternativas]);

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e6eaf0',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ padding: '16px 18px 10px', borderBottom: '1px solid #e6eaf0' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a2332', margin: 0 }}>
          Localizaciones alternativas recomendadas
        </h3>
        <div style={{ fontSize: 11.5, color: '#8a93a3', marginTop: 2 }}>
          México · Disponibilidad hídrica y riesgo de inversión · Selecciona un estado para detalles
        </div>
      </div>

      <div ref={mapRef} style={{ height, width: '100%' }} />

      <div style={{
        display: 'flex', gap: 10, padding: '10px 16px',
        borderTop: '1px solid #e6eaf0', flexWrap: 'wrap',
      }}>
        {[
          { color: '#2ea36b', label: 'Riesgo bajo' },
          { color: '#e89923', label: 'Riesgo bajo-medio' },
          { color: '#e23b3b', label: 'Riesgo medio' },
          { color: '#2563eb', label: 'Seleccionada' },
        ].map(({ color, label }) => (
          <span key={label} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: color + '20', color, borderRadius: 999,
            padding: '2px 9px', fontWeight: 600, fontSize: 11,
            border: `1px solid ${color}40`,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
