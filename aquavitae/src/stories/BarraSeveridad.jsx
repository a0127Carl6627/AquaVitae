import React from 'react';

function getNivel(porcentaje) {
  if (porcentaje <= 34) return 'bajo';
  if (porcentaje <= 68) return 'medio';
  return 'alto';
}

const colores = {
  bajo:  { barra: '#22c55e', fondo: '#f0fdf4', texto: '#166534', etiqueta: 'Bajo' },
  medio: { barra: '#f97316', fondo: '#fff7ed', texto: '#9a3412', etiqueta: 'Medio' },
  alto:  { barra: '#ef4444', fondo: '#fef2f2', texto: '#991b1b', etiqueta: 'Alto' },
};

export default function BarraSeveridad({ porcentaje = 0 }) {
  const pct = Math.min(100, Math.max(0, porcentaje));
  const nivel = getNivel(pct);
  const { barra, fondo, texto, etiqueta } = colores[nivel];

  return (
    <div style={{
      backgroundColor: fondo,
      border: `1px solid ${barra}`,
      borderRadius: '10px',
      padding: '16px 20px',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '10px',
      minWidth: '260px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
          Severidad proyectada
        </span>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          color: texto,
          backgroundColor: barra + '22',
          padding: '2px 10px',
          borderRadius: '9999px',
          border: `1px solid ${barra}`,
        }}>
          {etiqueta.toUpperCase()}
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '10px',
        backgroundColor: '#e2e8f0',
        borderRadius: '9999px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: barra,
          borderRadius: '9999px',
          transition: 'width 0.5s ease',
        }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
        <span>0%</span>
        <span style={{ fontWeight: '700', fontSize: '14px', color: barra }}>{pct}%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
