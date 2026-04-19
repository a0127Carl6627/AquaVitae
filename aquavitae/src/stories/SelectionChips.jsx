import React, { useState, useEffect } from 'react';

const CHIP_COLORS = [
  { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', dot: '#3b82f6' },
  { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0', dot: '#22c55e' },
  { bg: '#fdf4ff', color: '#7e22ce', border: '#e9d5ff', dot: '#a855f7' },
  { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa', dot: '#f97316' },
  { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd', dot: '#0ea5e9' },
  { bg: '#fdf2f8', color: '#be185d', border: '#fbcfe8', dot: '#ec4899' },
];

const IconX = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function Chip({ item, color, onRemove, animate }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleRemove = () => {
    setVisible(false);
    setTimeout(() => onRemove(item), 180);
  };

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 8px 5px 12px',
      background: color.bg,
      color: color.color,
      border: `1.5px solid ${color.border}`,
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 500,
      fontFamily: 'sans-serif',
      whiteSpace: 'nowrap',
      opacity: animate ? (visible ? 1 : 0) : 1,
      transform: animate ? (visible ? 'scale(1)' : 'scale(0.85)') : 'scale(1)',
      transition: 'opacity 0.18s ease, transform 0.18s ease',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: color.dot, flexShrink: 0,
      }} />
      {item.label}
      <button
        onClick={handleRemove}
        title={`Eliminar ${item.label}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18, borderRadius: '50%',
          background: color.border, border: 'none',
          color: color.color, cursor: 'pointer',
          padding: 0, flexShrink: 0,
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = color.dot}
        onMouseLeave={e => e.currentTarget.style.background = color.border}
      >
        <IconX />
      </button>
    </span>
  );
}

export default function SelectionChips({
  selectedItems = [],
  onRemove,
  onClearAll,
  animate = true,
  emptyLabel = 'Ninguna ubicación seleccionada',
  showClearAll = true,
}) {
  if (selectedItems.length === 0) {
    return (
      <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic', fontFamily: 'sans-serif' }}>
        {emptyLabel}
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {selectedItems.map((item, i) => (
        <Chip
          key={item.value}
          item={item}
          color={CHIP_COLORS[i % CHIP_COLORS.length]}
          onRemove={onRemove}
          animate={animate}
        />
      ))}
      {showClearAll && selectedItems.length > 1 && (
        <button
          onClick={onClearAll}
          style={{
            background: 'none', border: 'none',
            fontSize: 11, color: '#94a3b8',
            cursor: 'pointer', fontFamily: 'sans-serif',
            textDecoration: 'underline', padding: '0 4px',
          }}
        >
          Limpiar todo
        </button>
      )}
    </div>
  );
}
