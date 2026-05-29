import React from 'react';

const NIVELES = {
  bajo:  { label: 'Bajo',  color: '#22c55e', angle: -90 },
  medio: { label: 'Medio', color: '#f97316', angle: 0   },
  alto:  { label: 'Alto',  color: '#ef4444', angle: 72  },
};

export default function RiskGauge({ nivel = 'alto', regiones = 3 }) {
  const config = NIVELES[nivel] ?? NIVELES.alto;
  const needleAngle = config.angle;

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    }}>
      <p style={{
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.08em',
        color: '#6b7280',
        margin: '0 0 4px',
        textTransform: 'uppercase',
      }}>
        Riesgo hídrico general
      </p>

      <svg viewBox="0 0 200 120" width="220" height="100" aria-label={`Riesgo ${nivel}`}>
        {/* Arco de fondo gris */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none" stroke="#e5e7eb" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento verde (bajo) */}
        <path
          d="M 20 100 A 80 80 0 0 1 73 33"
          fill="none" stroke="#22c55e" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento naranja (medio) */}
        <path
          d="M 73 33 A 80 80 0 0 1 127 33"
          fill="none" stroke="#f97316" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento rojo (alto) */}
        <path
          d="M 127 33 A 80 80 0 0 1 180 100"
          fill="none" stroke="#ef4444" strokeWidth="18" strokeLinecap="round"
        />

        {/* Aguja */}
        <g transform={`translate(100,100) rotate(${needleAngle})`}>
          <line x1="0" y1="0" x2="0" y2="-68" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="0" r="6" fill="#1e3a5f" />
        </g>
      </svg>

      <p style={{ fontSize: 26, fontWeight: 600, color: config.color, margin: '-12px 0 2px' }}>
        {config.label}
      </p>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>
        El riesgo hídrico es {nivel} en {regiones} {regiones === 1 ? 'región' : 'regiones'}.
      </p>
    </div>
  );
}