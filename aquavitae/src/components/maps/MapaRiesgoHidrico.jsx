import React, { useEffect, useRef } from 'react';
import mexicoGeoJson from './assets/mexico-geojson.json';

const RISK_COLOR = { alta: '#e23b3b', medio: '#e89923', bajo: '#2ea36b' };

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function getColor(stateName, plantas) {
  const n = normalize(stateName);
  const planta = plantas.find(p => {
    const pn = normalize(p.estado);
    return n === pn || n.startsWith(pn) || pn.startsWith(n);
  });
  if (!planta) return '#dde3ec';
  return RISK_COLOR[planta.riesgo] || '#dde3ec';
}

export default function MapaRiesgoHidrico({
  plantas = [],
  height = 380,
  onSelectPlanta,
  selectedEstado = null,
}) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);
  const layersRef = useRef({});
  const onSelectRef = useRef(onSelectPlanta);
  useEffect(() => { onSelectRef.current = onSelectPlanta; });

  const plantasRef = useRef(plantas);
  useEffect(() => { plantasRef.current = plantas; });

  const selectedEstadoRef = useRef(selectedEstado);

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
            const pn = normalize(p.estado);
            return n === pn || n.startsWith(pn) || pn.startsWith(n);
          });

          const tip = planta
            ? `<strong>${name}</strong><br/>Planta: ${planta.nombre}<br/>Riesgo: ${planta.riesgoLabel}<br/>Índice: ${planta.indice}%`
            : `<strong>${name}</strong><br/>Sin datos`;

          layer.bindTooltip(tip, { sticky: true });

          layer.on({
            mouseover: e => e.target.setStyle({ weight: 2.5, color: '#1a2332', fillOpacity: 0.9 }),
            mouseout: e => layer.setStyle({ weight: 1.2, color: '#ffffff', fillOpacity: 0.7 }),
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

  const leyenda = [
    { chip: 'bg-[#2ea36b20] text-[#2ea36b] border-[#2ea36b40]', dot: 'bg-[#2ea36b]', label: 'Riesgo bajo' },
    { chip: 'bg-[#e8992320] text-[#e89923] border-[#e8992340]', dot: 'bg-[#e89923]', label: 'Riesgo medio' },
    { chip: 'bg-[#e23b3b20] text-[#e23b3b] border-[#e23b3b40]', dot: 'bg-[#e23b3b]', label: 'Riesgo alto' },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-[#e6eaf0] bg-white font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* height es prop numérica dinámica: inline justificado */}
      <div ref={mapRef} className="w-full" style={{ height }} />
      <div className="flex flex-wrap gap-2.5 border-t border-[#e6eaf0] px-4 py-2.5">
        {leyenda.map(({ chip, dot, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 text-[11.5px] text-[#5a6577]">
            <span className={`inline-flex items-center gap-[5px] rounded-full border px-[9px] py-0.5 text-[11px] font-semibold ${chip}`}>
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
