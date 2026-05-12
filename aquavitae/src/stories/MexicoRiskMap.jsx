import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap } from 'react-leaflet';

const RISK_COLORS = {
  ALTO: '#ef4444',
  MEDIO: '#f97316',
  BAJO: '#22c55e',
  SIN_RIESGO: '#22c55e',
};

const LEGEND_ITEMS = [
  { key: 'ALTO', label: 'Riesgo alto' },
  { key: 'MEDIO', label: 'Riesgo medio' },
  { key: 'BAJO', label: 'Riesgo bajo / Sin riesgo' },
];

function ZoomControls() {
  const map = useMap();
  return (
    <div style={{
      position: 'absolute',
      bottom: 12,
      left: 12,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <button
        onClick={() => map.zoomIn()}
        aria-label="Acercar"
        style={{
          width: 28,
          height: 28,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 4,
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#374151',
        }}
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        aria-label="Alejar"
        style={{
          width: 28,
          height: 28,
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 4,
          fontSize: 16,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#374151',
        }}
      >
        −
      </button>
    </div>
  );
}

export default function MexicoRiskMap({ plantas = [] }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('/mexico-states.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Error loading Mexico GeoJSON:', err));
  }, []);

  const counts = plantas.reduce((acc, p) => {
    acc[p.nivelRiesgo] = (acc[p.nivelRiesgo] ?? 0) + 1;
    return acc;
  }, {});

  const bajoCount = (counts['BAJO'] ?? 0) + (counts['SIN_RIESGO'] ?? 0);
  const leyendaConteos = {
    ALTO: counts['ALTO'] ?? 0,
    MEDIO: counts['MEDIO'] ?? 0,
    BAJO: bajoCount,
  };

  const geoStyle = {
    fillColor: '#d1d5db',
    weight: 0.5,
    color: '#ffffff',
    fillOpacity: 1,
  };

  const onEachState = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ fillColor: '#c4c9d2' });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillColor: '#d1d5db' });
      },
    });
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 12px' }}>
        Mapa de riesgo hídrico por ubicación (Semáforo)
      </h3>

      <div style={{
        position: 'relative',
        background: '#f9fafb',
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        <MapContainer
          center={[24, -102]}
          zoom={5}
          style={{ height: 360, width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geoData && (
            <GeoJSON data={geoData} style={geoStyle} onEachFeature={onEachState} />
          )}
          {plantas.map((planta) => (
            <CircleMarker
              key={planta.idPlanta}
              center={[planta.latitud, planta.longitud]}
              radius={7}
              fillColor={RISK_COLORS[planta.nivelRiesgo] || '#6b7280'}
              color="#ffffff"
              weight={1.5}
              fillOpacity={1}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
                <div style={{ fontSize: 12 }}>
                  <p style={{ fontWeight: 600, margin: '0 0 2px', color: '#111827' }}>
                    {planta.nombrePlanta}
                  </p>
                  <p style={{ margin: 0, color: '#6b7280' }}>{planta.ubicacionNombre}</p>
                  <p
                    style={{
                      margin: '4px 0 0',
                      fontWeight: 500,
                      color: RISK_COLORS[planta.nivelRiesgo],
                    }}
                  >
                    {planta.nivelRiesgo.replace('_', ' ')}
                  </p>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
          <ZoomControls />
        </MapContainer>
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
        {LEGEND_ITEMS.map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: RISK_COLORS[key],
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, color: '#374151' }}>
              {label} ({leyendaConteos[key]})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}