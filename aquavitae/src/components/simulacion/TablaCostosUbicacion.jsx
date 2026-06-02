import React, { useState } from 'react';

export default function TablaCostosUbicacion({
  alternativas = [],
  onSelectAlternativa,
  selectedNombre = null,
}) {
  const [internalIdx, setInternalIdx] = useState(0);

  const controlledIdx = selectedNombre != null
    ? alternativas.findIndex(a => a.nombre === selectedNombre)
    : -1;
  const selectedIdx = controlledIdx >= 0 ? controlledIdx : internalIdx;

  function handleSelect(i) {
    setInternalIdx(i);
    onSelectAlternativa?.(alternativas[i]);
  }

  const lowest = alternativas.reduce((min, a, i) => {
    const v = parseFloat(a.costoTotal.replace(/[^0-9.]/g, ''));
    return v < min.v ? { v, i } : min;
  }, { v: Infinity, i: -1 });

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
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', gap: 12,
        borderBottom: '1px solid #e6eaf0',
      }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a2332', margin: 0 }}>
            Costos estimados de cierre y apertura por ubicación
          </h3>
          <div style={{ fontSize: 11.5, color: '#8a93a3', marginTop: 2 }}>
            Comparación de escenarios operativos · Valores estimados en MXN millones
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr>
              {['Ubicación', 'Costo de cierre', 'Tiempo de cierre', 'Costo de apertura', 'Costo TOTAL'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', fontWeight: 500, color: '#8a93a3',
                  fontSize: 11, letterSpacing: '.03em', textTransform: 'uppercase',
                  padding: '10px 14px', background: '#fafbfc',
                  borderBottom: '1px solid #e6eaf0',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternativas.map((a, i) => {
              const isSelected = i === selectedIdx;
              const isLowest = i === lowest.i;
              return (
                <tr
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    borderBottom: '1px solid #e6eaf0',
                    borderLeft: `3px solid ${isSelected ? '#2563eb' : 'transparent'}`,
                    background: isSelected ? '#eaf1fe' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background .12s',
                  }}
                >
                  <td style={{ padding: '11px 14px', color: '#1a2332', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {a.recommended && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '2px 7px', borderRadius: 999,
                          fontSize: 10, fontWeight: 600,
                          background: '#e3f4ea', color: '#2ea36b',
                          border: '1px solid rgba(46,163,107,.2)',
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2ea36b', display: 'inline-block' }} />
                          Recomendada
                        </span>
                      )}
                      <span style={{ fontWeight: isSelected ? 600 : 400 }}>{a.nombre}, {a.estado}</span>
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px', color: '#1a2332', fontVariantNumeric: 'tabular-nums' }}>{a.costoCierre}</td>
                  <td style={{ padding: '11px 14px', color: '#5a6577' }}>{a.tiempoCierre}</td>
                  <td style={{ padding: '11px 14px', color: '#1a2332', fontVariantNumeric: 'tabular-nums' }}>{a.costoApertura}</td>
                  <td style={{
                    padding: '11px 14px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 700,
                    color: isLowest ? '#2ea36b' : '#1a2332',
                  }}>{a.costoTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{
  padding: '12px 18px',
  borderTop: '1px solid #e6eaf0',
}}>
  <span style={{ fontSize: 11, color: '#8a93a3' }}>
    {alternativas.length} ubicaciones analizadas · 1 recomendada
  </span>
</div>
    </div>
  );
}
