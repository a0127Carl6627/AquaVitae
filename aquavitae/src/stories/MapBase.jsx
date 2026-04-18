import React from 'react';

const styles = {
  wrapper: {
    position: 'relative',
    background: '#e8f4f8',
    borderRadius: 12,
    overflow: 'hidden',
    border: '0.5px solid #d0e8f0',
  },
  controls: {
    position: 'absolute',
    top: 12,
    right: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    zIndex: 10,
  },
  ctrlBtn: {
    width: 28,
    height: 28,
    background: '#ffffff',
    border: '0.5px solid #d0e8f0',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 16,
    color: '#64748b',
    fontFamily: 'sans-serif',
    lineHeight: 1,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94a3b8',
    fontSize: 13,
    fontFamily: 'sans-serif',
  },
  pin: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  pinLabel: {
    background: '#ffffff',
    border: '0.5px solid #d0e8f0',
    borderRadius: 6,
    padding: '2px 6px',
    fontSize: 11,
    fontFamily: 'sans-serif',
    color: '#1a2b4a',
    whiteSpace: 'nowrap',
    marginBottom: 2,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
};

const SEVERITY_COLORS = {
  alto:  '#ef4444',
  medio: '#f59e0b',
  bajo:  '#22c55e',
};

function PinIcon({ color }) {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path
        d="M11 0C5.477 0 1 4.477 1 10c0 7.5 10 18 10 18s10-10.5 10-18C21 4.477 16.523 0 11 0z"
        fill={color}
      />
      <circle cx="11" cy="10" r="4" fill="#ffffff" fillOpacity="0.8" />
    </svg>
  );
}

export default function MapBase({
  height = 320,
  pins = [],
  children,
  onZoomIn,
  onZoomOut,
}) {
  const [tooltip, setTooltip] = React.useState(null);

  return (
    <div style={{ ...styles.wrapper, height }}>
      {/* Fondo simulado del mapa */}
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        {children || (
          <div style={styles.placeholder}>
            Mapa base — integra tu proveedor (Leaflet / Mapbox)
          </div>
        )}

        {/* Pins */}
        {pins.map((pin, i) => {
          const color = SEVERITY_COLORS[pin.severity] ?? SEVERITY_COLORS.bajo;
          return (
            <div
              key={i}
              style={{
                ...styles.pin,
                left: `${pin.x}%`,
                top:  `${pin.y}%`,
              }}
              onMouseEnter={() => setTooltip(i)}
              onMouseLeave={() => setTooltip(null)}
            >
              {tooltip === i && pin.label && (
                <span style={styles.pinLabel}>{pin.label}</span>
              )}
              <PinIcon color={color} />
            </div>
          );
        })}
      </div>

      {/* Controles zoom */}
      <div style={styles.controls}>
        <button style={styles.ctrlBtn} onClick={onZoomIn}>+</button>
        <button style={styles.ctrlBtn} onClick={onZoomOut}>−</button>
      </div>
    </div>
  );
}