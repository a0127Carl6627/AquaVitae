import React, { useState } from 'react';

export function SecondaryButton({ label = 'Cancelar', onClick, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 24px',
        backgroundColor: disabled ? '#f1f5f9' : hover ? '#e2e8f0' : '#f1f5f9',
        color: disabled ? '#94a3b8' : '#475569',
        border: 'none',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        fontFamily: 'sans-serif',
      }}
    >
      {label}
    </button>
  );
}

export function PrimaryButton({ label = 'Confirmar', onClick, disabled, loading }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 28px',
        backgroundColor: disabled || loading ? '#93c5fd' : hover ? '#1d4ed8' : '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '15px',
        fontWeight: '700',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {loading && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 1s linear infinite' }}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      )}
      {loading ? 'Guardando...' : label}
    </button>
  );
}

export default function ModalActionButtons({ onCancel, onConfirm, disabled, loading }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '12px',
      fontFamily: 'sans-serif',
    }}>
      <SecondaryButton label="Cancelar" onClick={onCancel} disabled={disabled} />
      <PrimaryButton label="Confirmar" onClick={onConfirm} disabled={disabled} loading={loading} />
    </div>
  );
}
