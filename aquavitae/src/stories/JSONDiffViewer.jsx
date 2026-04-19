import React from 'react';

const styles = {
  viewer: {
    background: '#0f1117',
    borderRadius: 10,
    padding: '1rem 1.25rem',
    fontFamily: 'monospace',
    fontSize: 12.5,
    color: '#c9d1d9',
    border: '0.5px solid #30363d',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: 10,
    letterSpacing: '0.08em',
    color: '#6e7681',
  },
  record: {
    fontSize: 10,
    color: '#6e7681',
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
  },
  colLabel: {
    fontSize: 10,
    letterSpacing: '0.08em',
    color: '#6e7681',
    fontFamily: 'sans-serif',
    marginBottom: '0.5rem',
  },
  block: {
    margin: 0,
    lineHeight: 1.7,
  },
};

const TOKEN = {
  default: { color: '#c9d1d9' },
};

const STATUS_COLORS = {
  active:   '#3fb950', // verde
  inactive: '#ff7b72', // rojo
  update:   '#79c0ff', // azul
  login:    '#8b949e', // gris
};

function getStatusColor(value) {
  const val = String(value).toLowerCase();
  if (val === 'active')                         return STATUS_COLORS.active;
  if (val === 'inactive')                       return STATUS_COLORS.inactive;
  if (val === 'update')                         return STATUS_COLORS.update;
  if (val === 'login')                          return STATUS_COLORS.login;
  return TOKEN.default.color;
}

function formatValue(val) {
  if (typeof val === 'string') return `"${val}"`;
  return String(val);
}

function JsonBlock({ data }) {
  const entries = Object.entries(data);

  return (
    <pre style={styles.block}>
      <span style={TOKEN.default}>{'{'}</span>
      {'\n'}
      {entries.map(([key, val], i) => {
        const isStatus = key === 'status';
        const valueColor = isStatus
          ? getStatusColor(val)
          : TOKEN.default.color;

        return (
          <span key={key}>
            {'  '}
            <span style={TOKEN.default}>"{key}"</span>
            <span style={TOKEN.default}>: </span>
            <span style={{ color: valueColor }}>{formatValue(val)}</span>
            {i < entries.length - 1 && (
              <span style={TOKEN.default}>,</span>
            )}
            {'\n'}
          </span>
        );
      })}
      <span style={TOKEN.default}>{'}'}</span>
    </pre>
  );
}

export default function JsonDiffViewer({
  before = {},
  after = {},
  recordId,
}) {
  const columns = [
    { label: 'VALOR ANTERIOR', data: before },
    { label: 'VALOR NUEVO',    data: after  },
  ];

  return (
    <div style={styles.viewer}>
      <div style={styles.header}>
        <span style={styles.title}>DETALLE DE CAMBIOS (JSON DIFF)</span>
        {recordId && <span style={styles.record}>Record ID: {recordId}</span>}
      </div>

      <div style={styles.columns}>
        {columns.map(({ label, data }) => (
          <div key={label} style={styles.col}>
            <span style={styles.colLabel}>{label}</span>
            <JsonBlock data={data} />
          </div>
        ))}
      </div>
    </div>
  );
}