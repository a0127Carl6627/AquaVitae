import React from 'react';

export default function PlantasOperativasCounter({ 
  count = 3, 
  label = "PLANTAS OPERATIVAS"
}) {
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '20px 24px',
      minWidth: '160px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    }}>
      <div style={{
        fontSize: '36px',
        fontWeight: '700',
        color: '#0f172a',
        lineHeight: 1.2,
        marginBottom: '4px',
      }}>
        {count}
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        color: '#64748b',
        textTransform: 'uppercase',
        textAlign: 'center',
      }}>
        {label}
      </div>
    </div>
  );
}