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

export default function SpecificPermissionsPanel({ permissions = [], onChange }) {
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
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
          Permisos Específicos
        </h3>
      </div>

      {/* Grupos de permisos */}
      {permissions.map((grupo, gi) => (
        <div key={gi} style={{ marginBottom: gi < permissions.length - 1 ? '20px' : 0 }}>
          <p style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            margin: '0 0 10px 0',
          }}>
            {grupo.module}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {grupo.items.map((item, ii) => (
              <div key={ii} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '1px solid #f1f5f9',
              }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '2px' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.description}
                  </div>
                </div>
                <Toggle
                  enabled={item.enabled}
                  onChange={() => onChange && onChange(gi, ii, !item.enabled)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
