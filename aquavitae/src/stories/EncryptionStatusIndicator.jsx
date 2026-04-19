import React, { useState } from 'react';

const STATES = {
  encrypted: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    color: '#15803d',
    bg: '#dcfce7',
    border: '#bbf7d0',
    label: 'Cifrada',
    tooltip: 'Esta llave está cifrada y almacenada de forma segura.',
  },
  warning: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
        <line x1="12" y1="15" x2="12" y2="17"/>
        <circle cx="12" cy="14" r="0.5" fill="currentColor"/>
      </svg>
    ),
    color: '#b45309',
    bg: '#fef3c7',
    border: '#fde68a',
    label: 'Riesgo',
    tooltip: 'Esta llave podría no estar cifrada correctamente. Revisa la configuración.',
  },
  insecure: {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1M17 11V7"/>
      </svg>
    ),
    color: '#dc2626',
    bg: '#fee2e2',
    border: '#fecaca',
    label: 'No segura',
    tooltip: 'Esta llave no está cifrada. Se recomienda rotarla inmediatamente.',
  },
};

function Tooltip({ text, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#1e293b',
      color: '#f1f5f9',
      fontSize: 11,
      padding: '6px 10px',
      borderRadius: 6,
      whiteSpace: 'nowrap',
      maxWidth: 240,
      whiteSpace: 'normal',
      textAlign: 'center',
      lineHeight: 1.4,
      zIndex: 20,
      pointerEvents: 'none',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    }}>
      {text}
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        border: '5px solid transparent',
        borderTopColor: '#1e293b',
      }} />
    </div>
  );
}

export default function EncryptionStatusIndicator({
  isEncrypted = true,
  securityLevel = null,
  showLabel = true,
  showTooltip = true,
  customTooltip = null,
}) {
  const [hovered, setHovered] = useState(false);

  const stateKey = securityLevel || (isEncrypted ? 'encrypted' : 'insecure');
  const cfg = STATES[stateKey] || STATES.encrypted;

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: showLabel ? '3px 9px 3px 7px' : '4px 6px',
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: 'sans-serif',
        cursor: showTooltip ? 'help' : 'default',
        whiteSpace: 'nowrap',
      }}>
        {cfg.icon}
        {showLabel && cfg.label}
      </span>

      {showTooltip && (
        <Tooltip text={customTooltip || cfg.tooltip} visible={hovered} />
      )}
    </div>
  );
}
