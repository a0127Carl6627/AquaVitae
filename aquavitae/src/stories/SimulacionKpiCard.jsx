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
      background: '#fff',
      border: `1px solid #e6eaf0`,
      borderRadius: 12,
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minWidth: 180,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11.5, color: '#5a6577', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {label}
        </span>
        {icon && (
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: c.bg, border: `1px solid ${c.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c.text, fontSize: 14,
          }}>
            {icon}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: c.text, letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </div>
      {sublabel && (
        <span style={{ fontSize: 11.5, color: '#8a93a3' }}>{sublabel}</span>
      )}
    </div>
  );
}
