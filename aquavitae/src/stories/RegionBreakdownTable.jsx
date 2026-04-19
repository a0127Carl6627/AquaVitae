import React from 'react';
import ActionBadge from './ActionBadge';

function IconoNivel({ nivel, color }) {
  if (nivel === 'Alto') return (
    <span style={{ fontSize: '16px' }}>❗</span>
  );
  if (nivel === 'Medio') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L1 21h22L12 2z"/>
      <text x="12" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">!</text>
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function getNivel(pct) {
  if (pct >= 70) return { color: '#ef4444', bg: '#fef2f2', label: 'Alto' };
  if (pct >= 40) return { color: '#f59e0b', bg: '#fffbeb', label: 'Medio' };
  return { color: '#22c55e', bg: '#f0fdf4', label: 'Bajo' };
}

function BarraSeveridad({ pct }) {
  const { color } = getNivel(pct);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '80px', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '9999px' }} />
      </div>
      <span style={{ fontSize: '13px', fontWeight: '700', color }}>{pct}%</span>
    </div>
  );
}

function BotonGestion({ label, nivel }) {
  const isPrimary = nivel === 'Alto';
  return (
    <button style={{
      padding: '6px 14px',
      backgroundColor: isPrimary ? '#3b82f6' : 'transparent',
      color: isPrimary ? '#fff' : '#475569',
      border: isPrimary ? 'none' : '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontFamily: 'sans-serif',
    }}>
      {label}
    </button>
  );
}

export default function RegionBreakdownTable({ data = [] }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      {/* Encabezado */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.5fr 3fr 1.5fr',
        padding: '12px 20px',
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
      }}>
        {['REGIÓN', 'SEVERIDAD PROYECTADA (%)', 'ACCIÓN RECOMENDADA', 'GESTIÓN'].map((col) => (
          <span key={col} style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.07em' }}>
            {col}
          </span>
        ))}
      </div>

      {/* Filas */}
      {data.map((row, i) => {
        const nivel = getNivel(row.severidad);
        return (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 3fr 1.5fr',
              padding: '14px 20px',
              borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none',
              alignItems: 'center',
            }}
          >
            {/* Región */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{row.region}</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>{row.plantaId}</div>
            </div>

            {/* Severidad */}
            <BarraSeveridad pct={row.severidad} />

            {/* Acción recomendada */}
            {row.actionType
              ? <ActionBadge label={row.accion} type={row.actionType} />
              : <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <IconoNivel nivel={nivel.label} color={nivel.color} />
                  <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>{row.accion}</span>
                </div>
            }

            {/* Gestión */}
            <BotonGestion label={row.boton} nivel={nivel.label} />
          </div>
        );
      })}
    </div>
  );
}
