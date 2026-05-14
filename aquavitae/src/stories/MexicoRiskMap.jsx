import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const RISK_COLOR = {
  ALTO:       '#ef4444',
  MEDIO:      '#f97316',
  BAJO:       '#22c55e',   
  SIN_RIESGO: '#22c55e',   
};

const LEGEND = [
  { key: 'ALTO',  label: 'Riesgo alto' },
  { key: 'MEDIO', label: 'Riesgo medio' },
  { key: 'BAJO',  label: 'Riesgo bajo / Sin riesgo' },
];

const MEXICO_CENTER = [23.6345, -102.5528];
const ZOOM_INICIAL  = 5;

export default function MexicoRiskMap({ plantas = [], altura = '360px' }) {
  const counts = plantas.reduce((acc, p) => {
    acc[p.nivelRiesgo] = (acc[p.nivelRiesgo] ?? 0) + 1;
    return acc;
  }, {});

  const bajoSinRiesgoCount = (counts['BAJO'] ?? 0) + (counts['SIN_RIESGO'] ?? 0);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 12px' }}>
        Mapa de riesgo hídrico por ubicación (Semáforo)
      </h3>

      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #f3f4f6' }}>
        <MapContainer
          center={MEXICO_CENTER}
          zoom={ZOOM_INICIAL}
          scrollWheelZoom={true}
          style={{ height: altura, width: '100%' }}
          key="mexico-risk-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {plantas.map((planta) => (
            <CircleMarker
              key={planta.idPlanta}
              center={[planta.latitud, planta.longitud]}
              radius={9}
              pathOptions={{
                fillColor:   RISK_COLOR[planta.nivelRiesgo] ?? '#6b7280',
                fillOpacity: 1,
                color:       '#ffffff',
                weight:      2,
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif', minWidth: 140 }}>
                  <p style={{ fontWeight: 600, margin: '0 0 2px', fontSize: 13, color: '#111827' }}>
                    {planta.nombrePlanta}
                  </p>
                  <p style={{ margin: '0 0 6px', fontSize: 12, color: '#6b7280' }}>
                    {planta.ubicacionNombre}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: RISK_COLOR[planta.nivelRiesgo] + '22',
                    color: RISK_COLOR[planta.nivelRiesgo],
                  }}>
                    {planta.nivelRiesgo.replace('_', ' ')}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 10, flexWrap: 'wrap' }}>
        {LEGEND.map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 11, height: 11, borderRadius: '50%',
              background: RISK_COLOR[key], flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, color: '#374151' }}>
              {label} ({key === 'BAJO' ? bajoSinRiesgoCount : (counts[key] ?? 0)})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}