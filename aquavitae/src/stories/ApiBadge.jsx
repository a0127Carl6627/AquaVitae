import React from 'react';

const STATUS_MAP = {
  active: {
    label: 'Activo',
    dot:   '#3fb950',
    bg:    '#eafbee',
    color: '#1a6e30',
  },
  inactive: {
    label: 'Inactivo',
    dot:   '#8b949e',
    bg:    '#f0f1f3',
    color: '#4a5568',
  },
  error: {
    label: 'Error',
    dot:   '#ff7b72',
    bg:    '#fff0ee',
    color: '#a8200d',
  },
};

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    padding: '4px 10px',
    fontFamily: 'sans-serif',
    fontSize: 12,
    fontWeight: 500,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    flexShrink: 0,
  },
};

export default function ApiBadge({
  status = 'active',
  label,
}) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.inactive;
  const displayLabel = label ?? config.label;

  return (
    <span
      style={{
        ...styles.badge,
        background: config.bg,
        color: config.color,
      }}
    >
      <span style={{ ...styles.dot, background: config.dot }} />
      {displayLabel}
    </span>
  );
}