import React, { useEffect, useRef } from 'react';
import mexicoGeoJson from './assets/mexico-geojson.json';

const RISK_COLOR = { alta: '#e23b3b', medio: '#e89923', bajo: '#2ea36b' };

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function getColor(stateName, plantas) {
  const n = normalize(stateName);
  const planta = plantas.find(p => {
    const pn = normalize(p.estado ?? '');
    return n === pn || n.startsWith(pn) || pn.startsWith(n);
  });
  if (!planta) return '#dde3ec';
  return RISK_COLOR[planta.riesgo] || '#dde3ec';
}

export default function MexicoRiskMap({ plantas = [], height = 340, selectedEstado = null, onSelectPlanta }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const layersRef = useRef({});
  const plantasRef = useRef(plantas);
  const onSelectRef = useRef(onSelectPlanta);
  const selectedEstadoRef = useRef(selectedEstado);

  useEffect(() => { plantasRef.current = plantas; });
  useEffect(() => { onSelectRef.current = onSelectPlanta; });

  useEffect(() => {
    selectedEstadoRef.current = selectedEstado;
    if (!instanceRef.current) return;
    const selNorm = selectedEstado ? normalize(selectedEstado) : null;
    Object.entries(layersRef.current).forEach(([gn, layer]) => {
      const name = layer.feature?.properties?.name || layer.feature?.properties?.NAME_1 || '';
      const baseColor = getColor(name, plantasRef.current);
      const isSelected = selNorm && (gn === selNorm || gn.startsWith(selNorm) || selNorm.startsWith(gn));
      layer.setStyle({
        fillColor: isSelected ? '#2563eb' : baseColor,
        weight: isSelected ? 2.5 : 1.2,
        color: isSelected ? '#1a2332' : '#ffffff',
        fillOpacity: isSelected ? 0.95 : 0.7,
      });
    });
  }, [selectedEstado]);

  useEffect(() => {
    if (instanceRef.current) return;

    import('leaflet').then(L => {
      import('leaflet/dist/leaflet.css');
      if (!mapRef.current) return;
      if (mapRef.current._leaflet_id) mapRef.current._leaflet_id = null;

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
            fillColor: getColor(name, plantasRef.current),
            weight: 1.2,
            color: '#ffffff',
            fillOpacity: 0.7,
          };
        },
        onEachFeature: (feature, layer) => {
          const name = feature.properties.name || feature.properties.NAME_1 || '';
          const n = normalize(name);
          layersRef.current[n] = layer;

          const planta = plantasRef.current.find(p => {
            const pn = normalize(p.estado ?? '');
            return n === pn || n.startsWith(pn) || pn.startsWith(n);
          });

          const tip = planta
            ? `<strong>${name}</strong><br/>Planta: ${planta.nombre}<br/>Riesgo: ${planta.riesgoLabel}`
            : `<strong>${name}</strong><br/>Sin datos`;

          layer.bindTooltip(tip, { sticky: true });

          layer.on({
            mouseover: e => e.target.setStyle({ weight: 2.5, color: '#1a2332', fillOpacity: 0.9 }),
            mouseout: () => {
              const baseColor = getColor(name, plantasRef.current);
              const isSel = selectedEstadoRef.current && (
                n === normalize(selectedEstadoRef.current) ||
                n.startsWith(normalize(selectedEstadoRef.current)) ||
                normalize(selectedEstadoRef.current).startsWith(n)
              );
              layer.setStyle({
                fillColor: isSel ? '#2563eb' : baseColor,
                weight: isSel ? 2.5 : 1.2,
                color: isSel ? '#1a2332' : '#ffffff',
                fillOpacity: isSel ? 0.95 : 0.7,
              });
            },
            click: () => planta && onSelectRef.current?.(planta),
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e6eaf0',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div ref={mapRef} style={{ height, width: '100%' }} />
      <div style={{
        display: 'flex', gap: 10, padding: '10px 16px',
        borderTop: '1px solid #e6eaf0', flexWrap: 'wrap',
      }}>
        {[
          { color: '#2ea36b', label: 'Riesgo bajo' },
          { color: '#e89923', label: 'Riesgo medio' },
          { color: '#e23b3b', label: 'Riesgo alto' },
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
