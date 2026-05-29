import React from 'react';

const tipos = {
  critical: {
    color: '#ef4444',
    fondo: '#fef2f2',
    icono: '❗',
  },
  warning: {
    color: '#f59e0b',
    fondo: '#fffbeb',
    icono: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L1 21h22L12 2z"/>
        <text x="12" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">!</text>
      </svg>
    ),
  },
  safe: {
    color: '#22c55e',
    fondo: '#f0fdf4',
    icono: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
};

export default function ActionBadge({ label = '', type = 'safe' }) {
  const config = tipos[type] || tipos.safe;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      backgroundColor: config.fondo,
      color: config.color,
      border: `1px solid ${config.color}`,
      borderRadius: '9999px',
      padding: '3px 10px',
      fontSize: '12px',
      fontWeight: '600',
      fontFamily: 'sans-serif',
      whiteSpace: 'nowrap',
      width: 'fit-content',
    }}>
      {typeof config.icono === 'string'
        ? <span style={{ fontSize: '12px' }}>{config.icono}</span>
        : config.icono
      }
      {label}
    </span>
  );
}
