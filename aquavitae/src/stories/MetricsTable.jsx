import React from 'react';

function TendenciaIcono({ tipo }) {
  if (tipo === 'descendente') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
      </svg>
    );
  }
  if (tipo === 'ascendente') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    );
  }
  return null;
}

export default function MetricsTable({ metrics = [] }) {
  return (
    <div style={{
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: 'sans-serif',
      minWidth: '340px',
    }}>
      {/* Encabezado */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 20px',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Métrica</span>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Valor</span>
      </div>

      {/* Filas */}
      {metrics.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: index < metrics.length - 1 ? '1px solid #e2e8f0' : 'none',
            backgroundColor: '#fff',
          }}
        >
          <span style={{ fontSize: '15px', color: '#334155' }}>{item.label}</span>

          <span style={{
            fontSize: '15px',
            fontWeight: '700',
            color: item.status === 'critico' ? '#ef4444' : item.status === 'normal-ok' ? '#22c55e' : '#1e293b',
            display: 'flex',
            alignItems: 'center',
          }}>
            {item.trend && <TendenciaIcono tipo={item.trend} />}
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
