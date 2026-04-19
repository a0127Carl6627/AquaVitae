import React from 'react';

const niveles = {
  critico:     { label: 'CRÍTICO',     color: '#ef4444', fondo: '#fef2f2' },
  advertencia: { label: 'ADVERTENCIA', color: '#f97316', fondo: '#fff7ed' },
  informativo: { label: 'INFORMATIVO', color: '#3b82f6', fondo: '#eff6ff' },
  ok:          { label: 'OK',          color: '#22c55e', fondo: '#f0fdf4' },
};

export default function BadgeSeveridad({ level = 'critico', label }) {
  const config = niveles[level] || niveles.critico;
  const texto = label || config.label;

  return (
    <span style={{
      display: 'inline-block',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '0.06em',
      color: config.color,
      backgroundColor: config.fondo,
      border: `1px solid ${config.color}`,
      borderRadius: '6px',
      padding: '2px 10px',
    }}>
      {texto}
    </span>
  );
}
