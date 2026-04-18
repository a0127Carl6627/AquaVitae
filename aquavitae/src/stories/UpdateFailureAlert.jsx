import React from 'react';

const styles = {
  alert: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    background: '#fff5f5',
    border: '1px solid #ffc9c9',
    borderLeft: '4px solid #ff7b72',
    borderRadius: 10,
    padding: '12px 16px',
    fontFamily: 'sans-serif',
  },
  left: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    background: '#ffe0de',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    width: 16,
    height: 16,
    stroke: '#ff7b72',
    fill: 'none',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: '#a8200d',
  },
  message: {
    fontSize: 12,
    color: '#c0392b',
    lineHeight: 1.5,
  },
  timestamp: {
    fontSize: 11,
    color: '#e07070',
    marginTop: 4,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: '#e07070',
    flexShrink: 0,
    lineHeight: 1,
  },
};

function AlertIcon() {
  return (
    <svg style={styles.icon} viewBox="0 0 24 24">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function UpdateFailureAlert({
  title = 'Fallo en actualización',
  message = 'No se pudo sincronizar el módulo. Intenta de nuevo.',
  timestamp,
  onClose,
  visible = true,
}) {
  if (!visible) return null;

  return (
    <div style={styles.alert} role="alert">
      <div style={styles.left}>
        <div style={styles.iconWrap}>
          <AlertIcon />
        </div>
        <div style={styles.body}>
          <span style={styles.title}>{title}</span>
          <span style={styles.message}>{message}</span>
          {timestamp && (
            <span style={styles.timestamp}>{timestamp}</span>
          )}
        </div>
      </div>
      {onClose && (
        <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar alerta">
          ✕
        </button>
      )}
    </div>
  );
}