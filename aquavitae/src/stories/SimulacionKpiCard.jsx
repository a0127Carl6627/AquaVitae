import React from 'react';

const COLORS = {
  red:   { bg: '#fef2f2', text: '#e23b3b', border: '#fecaca' },
  amber: { bg: '#fffbeb', text: '#e89923', border: '#fde68a' },
  green: { bg: '#f0fdf4', text: '#2ea36b', border: '#bbf7d0' },
  blue:  { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
  gray:  { bg: '#f8fafc', text: '#64748b', border: '#e2e8f0' },
};

export default function SimulacionKpiCard({
  label = 'Índice hídrico actual',
  value = '85%',
  sublabel = 'Nivel de estrés',
  color = 'red',
  icon,
}) {
  const c = COLORS[color] || COLORS.gray;

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #f3f4f6',
      borderRadius: 10,
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'Inter, sans-serif',
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
        {icon && (
          <div style={{ color: c.text, display: 'flex', alignItems: 'center' }}>
            {icon}
          </div>
        )}
        <span style={{ fontSize: 32, fontWeight: 600, color: '#111827', lineHeight: 1 }}>
          {value}
        </span>
      </div>

      {sublabel && (
        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{sublabel}</p>
      )}
    </div>
  );
}
