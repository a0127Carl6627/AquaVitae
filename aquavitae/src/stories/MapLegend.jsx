import React from 'react';

const DEFAULTS = [
  { key: 'alto',  label: 'Estrés hídrico alto',  color: '#ef4444' },
  { key: 'medio', label: 'Estrés hídrico medio', color: '#f59e0b' },
  { key: 'bajo',  label: 'Estrés hídrico bajo',  color: '#22c55e' },
];

const styles = {
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 6,
    background: '#ffffff',
    border: '0.5px solid #d0e8f0',
    borderRadius: 10,
    padding: '10px 14px',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: 10,
    letterSpacing: '0.08em',
    color: '#8a9bb0',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  label: {
    fontSize: 12,
    color: '#1a2b4a',
  },
};

export default function MapLegend({
  title = 'Leyenda de riesgo',
  items = DEFAULTS,
}) {
  return (
    <div style={styles.container}>
      <span style={styles.title}>{title}</span>
      {items.map(({ key, label, color }) => (
        <div key={key} style={styles.item}>
          <span style={{ ...styles.dot, background: color }} />
          <span style={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}