import React from 'react';

export default function RecommendedActionsList({ actions = [] }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '20px 24px',
      maxWidth: '560px',
      fontFamily: 'sans-serif',
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    }}>
      {/* Título */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        <h3 style={{
          fontSize: '13px',
          fontWeight: '800',
          color: '#2563eb',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          margin: '0',
        }}>
          Acciones recomendadas
        </h3>
      </div>

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {actions.map((action, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <span style={{
              minWidth: '28px',
              height: '28px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: '700',
              color: '#fff',
              flexShrink: 0,
            }}>
              {index + 1}
            </span>
            <span style={{
              fontSize: '15px',
              color: '#334155',
              lineHeight: '1.6',
              paddingTop: '3px',
            }}>
              {action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
