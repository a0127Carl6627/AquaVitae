import React, { useState } from 'react';

const STATUS = { idle: 'idle', confirm: 'confirm', loading: 'loading', success: 'success', error: 'error' };

const IconRotate = ({ spinning }) => (
  <svg
    width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: spinning ? 'rotate-spin 0.7s linear infinite' : 'none' }}
  >
    <style>{`@keyframes rotate-spin { to { transform: rotate(360deg); } }`}</style>
    <path d="M23 4v6h-6"/>
    <path d="M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconWarn = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

function ConfirmModal({ keyName, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: '28px 28px 24px',
        maxWidth: 380, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ fontSize: 28, marginBottom: 12, textAlign: 'center' }}>🔄</div>
        <h3 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>
          ¿Rotar llave de API?
        </h3>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b', textAlign: 'center', lineHeight: 1.5 }}>
          La llave <strong style={{ color: '#0f172a' }}>{keyName}</strong> será invalidada y se generará una nueva.
          Esta acción no se puede deshacer.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '9px 0', background: '#f1f5f9', border: 'none',
              borderRadius: 7, fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '9px 0', background: '#1d4ed8', border: 'none',
              borderRadius: 7, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
            }}
          >
            Sí, rotar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RotateKeyButton({
  keyId = '',
  keyName = 'API Key',
  onRotate = null,
  forceStatus = null,
}) {
  const [status, setStatus] = useState(STATUS.idle);
  const current = forceStatus || status;

  const handleClick = () => {
    if (current !== STATUS.idle) return;
    setStatus(STATUS.confirm);
  };

  const handleConfirm = async () => {
    setStatus(STATUS.loading);
    try {
      await onRotate?.(keyId);
      setStatus(STATUS.success);
      setTimeout(() => setStatus(STATUS.idle), 3000);
    } catch {
      setStatus(STATUS.error);
      setTimeout(() => setStatus(STATUS.idle), 3000);
    }
  };

  const handleCancel = () => setStatus(STATUS.idle);

  const cfg = {
    idle:    { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', text: 'Rotar llave',   icon: <IconRotate spinning={false} /> },
    confirm: { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0', text: 'Rotar llave',   icon: <IconRotate spinning={false} /> },
    loading: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe', text: 'Rotando...',    icon: <IconRotate spinning={true} /> },
    success: { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0', text: 'Llave rotada',  icon: <IconCheck /> },
    error:   { bg: '#fee2e2', color: '#dc2626', border: '#fecaca', text: 'Error al rotar', icon: <IconWarn /> },
  }[current];

  return (
    <>
      <button
        onClick={handleClick}
        disabled={current === STATUS.loading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          background: cfg.bg,
          color: cfg.color,
          border: `1.5px solid ${cfg.border}`,
          borderRadius: 7,
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'sans-serif',
          cursor: current === STATUS.loading ? 'not-allowed' : 'pointer',
          whiteSpace: 'nowrap',
          transition: 'background 0.15s, color 0.15s',
        }}
      >
        {cfg.icon}
        {cfg.text}
      </button>

      {current === STATUS.confirm && (
        <ConfirmModal keyName={keyName} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </>
  );
}
