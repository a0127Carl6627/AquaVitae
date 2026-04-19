import React from 'react';

function Toggle({ enabled, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '9999px',
        backgroundColor: enabled ? '#3b82f6' : '#cbd5e1',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '3px',
        left: enabled ? '23px' : '3px',
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

export default function PermissionsTogglePanel({ permissions = [], onToggleChange }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      border: '1px solid #e2e8f0',
      padding: '20px 24px',
      maxWidth: '560px',
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      {/* Título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#1e293b',
          margin: '0',
        }}>
          Permisos Funcionales
        </h3>
      </div>

      {/* Grid de permisos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
      }}>
        {permissions.map((perm, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              border: '1px solid #f1f5f9',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                {perm.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                {perm.description}
              </div>
            </div>
            <Toggle
              enabled={perm.enabled}
              onChange={() => onToggleChange && onToggleChange(index, !perm.enabled)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
