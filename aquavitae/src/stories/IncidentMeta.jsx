import React from 'react';

function formatTiempo(fechaISO) {
  const ahora = new Date();
  const fecha = new Date(fechaISO);
  const diffHoras = (ahora - fecha) / (1000 * 60 * 60);

  if (diffHoras < 24) {
    const h = Math.floor(diffHoras);
    return `Hace ${h} hora${h !== 1 ? 's' : ''}`;
  } else if (diffHoras < 48) {
    return 'Ayer';
  } else {
    return fecha.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}

export default function IncidentMeta({ ubicacion = '', timestamp }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: '#64748b',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        {ubicacion}
      </span>

      {timestamp && (
        <>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {formatTiempo(timestamp)}
          </span>
        </>
      )}
    </div>
  );
}
