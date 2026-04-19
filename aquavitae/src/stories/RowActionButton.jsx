import React, { useState } from 'react';

const variants = {
  primary: {
    background: '#1d4ed8',
    color: '#ffffff',
    border: '1.5px solid #1d4ed8',
    backgroundHover: '#1e40af',
    backgroundActive: '#1e3a8a',
  },
  secondary: {
    background: '#ffffff',
    color: '#374151',
    border: '1.5px solid #d1d5db',
    backgroundHover: '#f9fafb',
    backgroundActive: '#f3f4f6',
  },
};

export default function RowActionButton({
  label = 'Ver detalle',
  icon = null,
  variant = 'secondary',
  rowData = {},
  onClick,
  disabled = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const config = variants[variant] || variants.secondary;

  const background = active
    ? config.backgroundActive
    : hovered
    ? config.backgroundHover
    : config.background;

  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.(rowData)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        background: disabled ? '#e5e7eb' : background,
        color: disabled ? '#9ca3af' : config.color,
        border: disabled ? '1.5px solid #e5e7eb' : config.border,
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: 'sans-serif',
        whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.15s ease, border-color 0.15s ease',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        lineHeight: '1',
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
