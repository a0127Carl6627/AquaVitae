import React from 'react';

export default function IncidentHeader({ title = '', subtitle = '' }) {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: '800',
        color: '#1e293b',
        margin: '0 0 6px 0',
        lineHeight: '1.2',
      }}>
        {title}
      </h1>
      <h2 style={{
        fontSize: '26px',
        fontWeight: '700',
        color: '#3b82f6',
        margin: '0',
        lineHeight: '1.2',
      }}>
        {subtitle}
      </h2>
    </div>
  );
}
