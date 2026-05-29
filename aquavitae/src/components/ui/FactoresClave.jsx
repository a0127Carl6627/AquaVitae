import React from 'react';

const ICONS = {
  water: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="1.5"/>
      <circle cx="18.5" cy="18.5" r="1.5"/>
    </svg>
  ),
};

const ICON_BG = {
  water: { background: '#dbeafe', color: '#2563eb' },
  money: { background: '#e3f4ea', color: '#2ea36b' },
  clock: { background: '#fdf2dd', color: '#e89923' },
  shield: { background: '#ede9fe', color: '#7c3aed' },
  truck: { background: '#fef3c7', color: '#d97706' },
};

export default function FactoresClave({
  titulo = 'Para la ubicación seleccionada',
  factores = [],
}) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e6eaf0',
      borderRadius: 12,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        padding: '16px 18px 10px',
        borderBottom: '1px solid #e6eaf0',
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a2332', margin: 0 }}>Factores clave considerados</h3>
        <div style={{ fontSize: 11.5, color: '#8a93a3', marginTop: 2 }}>{titulo}</div>
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {factores.map((f, i) => {
          const bg = ICON_BG[f.icon] || { background: '#f1f5f9', color: '#64748b' };
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                display: 'grid', placeItems: 'center', flexShrink: 0,
                ...bg,
              }}>
                <div style={{ width: 16, height: 16 }}>{ICONS[f.icon]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1a2332', marginBottom: 6 }}>{f.nombre}</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <div key={j} style={{
                      width: 9, height: 9, borderRadius: '50%',
                      background: j < f.puntos ? f.color : 'transparent',
                      border: `1.5px solid ${f.color}`,
                      opacity: j < f.puntos ? 1 : 0.28,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
