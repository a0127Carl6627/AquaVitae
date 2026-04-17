import React, { useState } from 'react';

function BotonRegresar({ onClick, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1,
        padding: '12px 24px',
        backgroundColor: disabled ? '#93c5fd' : hover ? '#1d4ed8' : '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        fontFamily: 'sans-serif',
      }}
    >
      Regresar
    </button>
  );
}

function BotonExportar({ onClick, disabled }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: 1,
        padding: '12px 24px',
        backgroundColor: hover ? '#f8fafc' : '#fff',
        color: disabled ? '#94a3b8' : '#334155',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'sans-serif',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/>
        <circle cx="6" cy="12" r="3"/>
        <circle cx="18" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
      </svg>
      Exportar
    </button>
  );
}

export default function ActionButtons({ onRegresar, onExportar, disabled = false }) {
  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      width: '400px',
      fontFamily: 'sans-serif',
    }}>
      <BotonRegresar onClick={onRegresar} disabled={disabled} />
      <BotonExportar onClick={onExportar} disabled={disabled} />
    </div>
  );
}
