import React from 'react';

export default function IncidentSummary({ title = 'Resumen de la situación', description = '' }) {
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
      <h3 style={{
        fontSize: '13px',
        fontWeight: '800',
        color: '#1e293b',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        margin: '0 0 14px 0',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#334155',
        lineHeight: '1.8',
        margin: '0',
      }}>
        {description}
      </p>
    </div>
  );
}
