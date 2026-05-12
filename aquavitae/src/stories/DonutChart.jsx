import React from 'react';

const COLORS = {
  ALTO:  '#ef4444',
  MEDIO: '#f97316',
  BAJO:  '#22c55e',
};


function describeArc(cx, cy, r, startDeg, endDeg, thickness = 22) {
  const toRad = (d) => ((d - 90) * Math.PI) / 180;
  const inner = r - thickness;

  const x1o = cx + r * Math.cos(toRad(startDeg));
  const y1o = cy + r * Math.sin(toRad(startDeg));
  const x2o = cx + r * Math.cos(toRad(endDeg));
  const y2o = cy + r * Math.sin(toRad(endDeg));
  const x1i = cx + inner * Math.cos(toRad(endDeg));
  const y1i = cy + inner * Math.sin(toRad(endDeg));
  const x2i = cx + inner * Math.cos(toRad(startDeg));
  const y2i = cy + inner * Math.sin(toRad(startDeg));

  const large = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M ${x1o} ${y1o}`,
    `A ${r} ${r} 0 ${large} 1 ${x2o} ${y2o}`,
    `L ${x1i} ${y1i}`,
    `A ${inner} ${inner} 0 ${large} 0 ${x2i} ${y2i}`,
    'Z',
  ].join(' ');
}

export default function DonutChart({ alto = 2, medio = 4, bajo = 6 }) {
  const total = alto + medio + bajo;
  const segments = [
    { key: 'ALTO',  value: alto,  label: 'Alto'  },
    { key: 'MEDIO', value: medio, label: 'Medio' },
    { key: 'BAJO',  value: bajo,  label: 'Bajo'  },
  ];

  // Calcular ángulos acumulados con un pequeño gap entre segmentos
  const GAP = 2;
  let cursor = 0;
  const arcs = segments.map((seg) => {
    const sweep = total > 0 ? (seg.value / total) * 360 - GAP : 0;
    const start = cursor;
    const end = cursor + sweep;
    cursor += sweep + GAP;
    return { ...seg, start, end };
  });

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 16px' }}>
        Distribución de plantas por nivel de riesgo
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {/* Dona SVG */}
        <svg viewBox="0 0 140 140" width="140" height="140" aria-label="Distribución de plantas">
          {arcs.map((arc) => (
            <path
              key={arc.key}
              d={describeArc(70, 70, 60, arc.start, arc.end, 24)}
              fill={COLORS[arc.key]}
            />
          ))}
          {/* Texto central */}
          <text x="70" y="65" textAnchor="middle" fontSize="26" fontWeight="600" fill="#111827">
            {total}
          </text>
          <text x="70" y="82" textAnchor="middle" fontSize="11" fill="#9ca3af">
            Total
          </text>
        </svg>

        {/* Leyenda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {segments.map((seg) => {
            const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : '0.0';
            return (
              <div key={seg.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: COLORS[seg.key], flexShrink: 0,
                }} />
                <span style={{ fontSize: 13, color: '#374151' }}>
                  {seg.label}
                </span>
                <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 4 }}>
                  {seg.value} ({pct}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}