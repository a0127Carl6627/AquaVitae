import React from 'react';

const FIELD_COLORS = {
  status:       { bg: '#1e3a5f', color: '#79c0ff', border: '#1d4ed8' },
  email:        { bg: '#1a2f1a', color: '#3fb950', border: '#16a34a' },
  role:         { bg: '#2d1b4e', color: '#c084fc', border: '#7c3aed' },
  mfa_required: { bg: '#3b1f0a', color: '#fb923c', border: '#ea580c' },
  password:     { bg: '#3b0a0a', color: '#ff7b72', border: '#dc2626' },
  nombre:       { bg: '#1a2a3b', color: '#58a6ff', border: '#2563eb' },
  region:       { bg: '#1a3030', color: '#2dd4bf', border: '#0d9488' },
  plant:        { bg: '#1a3030', color: '#2dd4bf', border: '#0d9488' },
};

const DEFAULT_CHIP = { bg: '#21262d', color: '#8b949e', border: '#30363d' };

function getChipStyle(field) {
  return FIELD_COLORS[field.toLowerCase()] || DEFAULT_CHIP;
}

function FieldChip({ field }) {
  const style = getChipStyle(field);
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      borderRadius: 4,
      fontSize: 11,
      fontFamily: 'monospace',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
    }}>
      <span style={{ fontSize: 9, opacity: 0.7 }}>⬡</span>
      {field}
    </span>
  );
}

export default function ChangedFieldCell({
  fields = [],
  emptyLabel = '—',
}) {
  const normalized = Array.isArray(fields)
    ? fields
    : typeof fields === 'string' && fields.trim() !== ''
    ? [fields]
    : [];

  if (normalized.length === 0) {
    return <span style={{ color: '#6e7681', fontSize: 12, fontStyle: 'italic' }}>{emptyLabel}</span>;
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      alignItems: 'center',
    }}>
      {normalized.map((field) => (
        <FieldChip key={field} field={field} />
      ))}
    </div>
  );
}
