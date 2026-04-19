import React from 'react';

function Chip({ label, onRemove }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#3b82f6',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '500',
      padding: '4px 10px',
      borderRadius: '9999px',
    }}>
      {label}
      {onRemove && (
        <span
          onClick={() => onRemove(label)}
          style={{ cursor: 'pointer', lineHeight: 1, opacity: 0.8, fontSize: '14px' }}
        >
          ×
        </span>
      )}
    </div>
  );
}

export default function DataScopeChips({ regions = [], onAddRegion, onRemoveRegion }) {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
          Alcance de Datos
        </h3>
      </div>

      <p style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Regiones Permitidas
      </p>

      {/* Chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {regions.length === 0 && (
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Sin regiones asignadas</span>
        )}
        {regions.map((region) => (
          <Chip key={region} label={region} onRemove={onRemoveRegion} />
        ))}
      </div>
    </div>
  );
}
