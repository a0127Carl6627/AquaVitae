import React from 'react';

export default function UbicacionField({ 
  label = "UBICACIÓN", 
  location = "Edo. Mex, MX"
}) {
  return (
    <div style={{
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '16px 20px',
      border: '1px solid #e2e8f0',
      minWidth: '180px',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#0f172a',
      }}>
        {location}
      </div>
    </div>
  );
}