import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Carga el CSS de Leaflet desde CDN para evitar el null-loader de Storybook
if (typeof document !== 'undefined') {
  if (!document.getElementById('leaflet-cdn-css')) {
    const link = document.createElement('link');
    link.id = 'leaflet-cdn-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const nivelColores = {
  critico:     { color: '#ef4444', label: 'Crítico' },
  advertencia: { color: '#f97316', label: 'Advertencia' },
  informativo: { color: '#3b82f6', label: 'Informativo' },
  ok:          { color: '#22c55e', label: 'OK' },
};

function ZoomControls() {
  const map = useMap();
  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      {['+', '−'].map((symbol, i) => (
        <button
          key={i}
          onClick={() => i === 0 ? map.zoomIn() : map.zoomOut()}
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          {symbol}
        </button>
      ))}
    </div>
  );
}

export default function MiniMapLocation({
  coordinates = { lat: 19.4326, lng: -99.1332 },
  locationName = 'Acuífero Valle de México',
  riskLevel = 'critico',
  riskValue = '15%',
  radius = 12.5,
  onOpenFullMap,
}) {
  const { color, label } = nivelColores[riskLevel] || nivelColores.critico;

  return (
    <div style={{
      width: '280px',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      fontFamily: 'sans-serif',
      backgroundColor: '#fff',
    }}>
      <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
          Localización del Incidente
        </span>
      </div>

      <div style={{ position: 'relative', height: '200px' }}>
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={11}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{locationName}</div>
              <div style={{ fontSize: '12px', color: color, fontWeight: '700', marginTop: '2px' }}>
                Nivel: {riskValue} ({label})
              </div>
            </Popup>
          </Marker>
          <ZoomControls />
        </MapContainer>
      </div>

      <div style={{ padding: '10px 16px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Coordenadas</div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
              {coordinates.lat}° N, {Math.abs(coordinates.lng)}° W
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Radio</div>
            <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>{radius} km</div>
          </div>
        </div>
        <button
          onClick={onOpenFullMap}
          style={{
            width: '100%',
            padding: '8px',
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#475569',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Abrir visor completo
        </button>
      </div>
    </div>
  );
}
