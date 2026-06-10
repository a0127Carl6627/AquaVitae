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
    <div className="grid grid-cols-4 gap-3 [font-family:Inter,sans-serif]">
      {CARDS.map(({ key, label, subLabel, color, Icon }) => (
        <div key={key} className="flex flex-col gap-2.5 rounded-[10px] border border-gray-100 bg-white px-[18px] py-4">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.07em] text-gray-500">
            {label}
          </p>

          <div className="flex items-center gap-3">
            <Icon color={color} size={30} />
            <span className="text-[32px] font-semibold leading-none text-gray-900">
              {values[key]}
            </span>
          </div>

          <p className="m-0 text-xs text-gray-400">
            {typeof subLabel === 'function' ? subLabel(totalPlantas) : subLabel}
          </p>
        </div>
      ))}
    </div>
  );
}