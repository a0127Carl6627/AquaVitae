import React from 'react';

const ICON_COLOR = {
  CRÍTICO:     '#E24B4A',
  ADVERTENCIA: '#EF9F27',
  INFORMATIVO: '#378ADD',
};

function TriangleIcon({ color }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 2 }}
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function AlertsList({ alerts = [] }) {
  if (alerts.length === 0) {
    return (
      <p style={{ fontFamily: 'Inter, sans-serif', color: '#6b7280', fontSize: 14 }}>
        No hay alertas recientes.
      </p>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, color: '#111827', margin: '0 0 1.25rem' }}>
        Alertas recientes
      </h2>
      {alerts.map((alert, index) => {
        const iconColor = ICON_COLOR[alert.tipo] ?? ICON_COLOR.ADVERTENCIA;
        const isLast = index === alerts.length - 1;
        return (
          <div
            key={alert.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '14px 0',
              borderBottom: isLast ? 'none' : '1px solid #f3f4f6',
            }}
          >
            <TriangleIcon color={iconColor} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: '#111827', margin: '0 0 4px' }}>
                {alert.titulo}
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.45 }}>
                {alert.descripcion}
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap', marginTop: 2 }}>
              {alert.hora}
            </span>
          </div>
        );
      })}
    </div>
  );
}