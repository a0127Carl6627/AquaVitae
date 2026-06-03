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
  const layersRef = useRef({});
  const onSelectRef = useRef(onSelectAlternativa);
  useEffect(() => { onSelectRef.current = onSelectAlternativa; });

  const plantaActualRef = useRef(plantaActual);
  const alternativasRef = useRef(alternativas);
  useEffect(() => {
    plantaActualRef.current = plantaActual;
    alternativasRef.current = alternativas;
  });

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
            fillColor: getStateColor(name, plantaActualRef.current, alternativasRef.current),
            weight: 1.2,
            color: '#ffffff',
            fillOpacity: 0.7,
          };
        },
        onEachFeature: (feature, layer) => {
          const name = feature.properties.name || feature.properties.NAME_1 || '';
          const gn = normalize(name);

          layersRef.current[gn] = layer;

          const isActual = plantaActualRef.current && gn === normalize(plantaActualRef.current.estado);
          const alt = alternativasRef.current.find(a => {
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
              const baseColor = getStateColor(name, plantaActualRef.current, alternativasRef.current);
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
            click: () => alt && onSelectRef.current?.(alt),
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

  const leyenda = [
    { chip: 'bg-[#2ea36b20] text-[#2ea36b] border-[#2ea36b40]', dot: 'bg-[#2ea36b]', label: 'Riesgo bajo' },
    { chip: 'bg-[#e8992320] text-[#e89923] border-[#e8992340]', dot: 'bg-[#e89923]', label: 'Riesgo bajo-medio' },
    { chip: 'bg-[#e23b3b20] text-[#e23b3b] border-[#e23b3b40]', dot: 'bg-[#e23b3b]', label: 'Riesgo medio' },
    { chip: 'bg-[#2563eb20] text-[#2563eb] border-[#2563eb40]', dot: 'bg-[#2563eb]', label: 'Seleccionada' },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-white font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="border-b border-[#e6eaf0] px-[18px] pb-2.5 pt-4">
        <h3 className="m-0 text-sm font-semibold text-[#1a2332]">
          Localizaciones alternativas recomendadas
        </h3>
        <div className="mt-0.5 text-[11.5px] text-[#8a93a3]">
          México · Disponibilidad hídrica y riesgo de inversión · Selecciona un estado para detalles
        </div>
      </div>

      {/* height es prop numérica dinámica: inline justificado */}
      <div ref={mapRef} className="w-full" style={{ height }} />

      <div className="flex flex-wrap gap-2.5 border-t border-[#e6eaf0] px-4 py-2.5">
        {leyenda.map(({ chip, dot, label }) => (
          <span key={label} className={`inline-flex items-center gap-[5px] rounded-full border px-[9px] py-0.5 text-[11px] font-semibold ${chip}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
