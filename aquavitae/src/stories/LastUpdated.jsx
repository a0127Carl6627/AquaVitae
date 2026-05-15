import React from 'react';

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date)) return '—';

  const day = date.getDate();
  const month = date.toLocaleString('es-MX', { month: 'short' });
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1).replace('.', '');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  hours = hours % 12 || 12;

  return `${day} ${monthCap} ${year}, ${hours}:${minutes} ${ampm}`;
}

export default function LastUpdated({ fechaActualizacion, onRefresh, loading = false }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      fontFamily: 'Inter, sans-serif',
    }}>
      <div>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
          Última actualización:
        </p>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
          {formatDate(fechaActualizacion)}
        </p>
      </div>
      <button
        onClick={onRefresh}
        aria-label="Actualizar datos"
        disabled={loading}
        style={{
          background: 'none',
          border: 'none',
          cursor: loading ? 'default' : 'pointer',
          padding: 4,
          borderRadius: 4,
          color: '#6b7280',
          display: 'flex',
          alignItems: 'center',
          marginTop: 2,
          opacity: loading ? 0.5 : 1,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            animation: loading ? 'spin 1s linear infinite' : 'none',
          }}
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      </button>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}