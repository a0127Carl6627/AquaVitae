import React from 'react';

export default function AlertaBannerHidrico({
  plantaNombre = 'Planta Monterrey',
  estresActual = 85,
  cierreRecomendadoDias = 60,
  costoApertura = '$2.4 M',
  costoOperacion = '$3.1 M',
  diasApertura = '45–60',
}) {
  return (
    <div style={{
      background: '#fde8e8',
      border: '1px solid rgba(226,59,59,.22)',
      borderRadius: 12,
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        width: 40, height: 40, flexShrink: 0,
        borderRadius: 10, background: '#e23b3b',
        display: 'grid', placeItems: 'center', color: '#fff',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/>
          <path d="M12 9v4M12 17h.01"/>
        </svg>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <strong style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#e23b3b', marginBottom: 3 }}>
          Estrés hídrico Alto en {plantaNombre}
        </strong>
        <span style={{ fontSize: 12, color: '#5a6577' }}>
          Esta planta está por encima del límite operativo. Se recomienda evaluar alternativas de cierre temporal y reubicación.
        </span>
      </div>

      <div style={{ display: 'flex', flexShrink: 0 }}>
        {[
          { val: `${estresActual}%`, lbl: 'Estrés actual' },
          { val: `${cierreRecomendadoDias} días`, lbl: 'Cierre recomendado' },
          { val: costoApertura, lbl: 'Costo est. de apertura' },
          { val: costoOperacion, lbl: 'Costo est. de operación' },
          { val: `${diasApertura}`, lbl: 'días est. de apertura' },
        ].map(({ val, lbl }, i) => (
          <div key={i} style={{
            padding: i === 0 ? '0 18px 0 12px' : '0 18px',
            borderLeft: i === 0 ? 'none' : '1px solid rgba(226,59,59,.2)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#e23b3b', letterSpacing: '-.01em', lineHeight: 1 }}>{val}</span>
            <span style={{ fontSize: 10.5, color: '#8a93a3', whiteSpace: 'nowrap', textAlign: 'center' }}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
