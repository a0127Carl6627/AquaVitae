import React, { useState } from 'react';

export default function CreateProfileButton({ label = 'Crear nuevo perfil', showIcon = true, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: hover ? '#f8fafc' : 'transparent',
        color: hover ? '#3b82f6' : '#475569',
        border: '1.5px dashed #cbd5e1',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
        borderColor: hover ? '#3b82f6' : '#cbd5e1',
        fontFamily: 'sans-serif',
      }}
    >
      {showIcon && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      )}
      {label}
    </button>
  );
}
