import React from 'react';

function FactoryIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M2 20V8l6 4V8l6 4V4l8 5v11H2z" />
      <rect x="6" y="15" width="3" height="5" fill="white" />
      <rect x="11" y="15" width="3" height="5" fill="white" />
      <rect x="16" y="15" width="3" height="5" fill="white" />
    </svg>
  );
}

function AlertIcon({ color, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

const CARDS = [
  {
    key: 'crisis',
    label: 'Crisis activas',
    subLabel: 'Requieren atención inmediata',
    color: '#ef4444',
    Icon: AlertIcon,
  },
  {
    key: 'alto',
    label: 'Plantas en riesgo alto',
    subLabel: (total) => `De ${total} plantas totales`,
    color: '#ef4444',
    Icon: FactoryIcon,
  },
  {
    key: 'medio',
    label: 'Plantas en riesgo medio',
    subLabel: 'Requieren seguimiento',
    color: '#f97316',
    Icon: FactoryIcon,
  },
  {
    key: 'bajo',
    label: 'Plantas en riesgo bajo',
    subLabel: 'Condiciones normales',
    color: '#22c55e',
    Icon: FactoryIcon,
  },
];

export default function StatCards({
  crisisActivas = 3,
  plantasAltoRiesgo = 2,
  plantasMedioRiesgo = 4,
  plantasBajoRiesgo = 6,
  totalPlantas = 12,
}) {
  const values = {
    crisis: crisisActivas,
    alto: plantasAltoRiesgo,
    medio: plantasMedioRiesgo,
    bajo: plantasBajoRiesgo,
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      fontFamily: 'Inter, sans-serif',
    }}>
      {CARDS.map(({ key, label, subLabel, color, Icon }) => (
        <div key={key} style={{
          background: '#ffffff',
          border: '1px solid #f3f4f6',
          borderRadius: 10,
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <p style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: '#6b7280',
            margin: 0,
          }}>
            {label}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon color={color} size={30} />
            <span style={{ fontSize: 32, fontWeight: 600, color: '#111827', lineHeight: 1 }}>
              {values[key]}
            </span>
          </div>

          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
            {typeof subLabel === 'function' ? subLabel(totalPlantas) : subLabel}
          </p>
        </div>
      ))}
    </div>
  );
}