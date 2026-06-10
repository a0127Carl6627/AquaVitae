import React from 'react';

const COLORS = {
  ALTO:  '#ef4444',
  MEDIO: '#f97316',
  BAJO:  '#22c55e',
};

// Clases de fondo para los puntos de la leyenda (set fijo, detectables por el JIT).
const BG_CLASS = {
  ALTO:  'bg-[#ef4444]',
  MEDIO: 'bg-[#f97316]',
  BAJO:  'bg-[#22c55e]',
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
    <div className="w-full [font-family:Inter,sans-serif]">
      <h3 className="m-0 mb-4 text-[15px] font-medium text-gray-900">
        Distribución de plantas por nivel de riesgo
      </h3>

      {/* Dona centrada y más grande */}
      <div className="mb-3 flex justify-center">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-label="Distribución de plantas">
          {arcs.map((arc) => (
            <path
              key={arc.key}
              d={describeArc(100, 100, 85, arc.start, arc.end, 30)}
              fill={COLORS[arc.key]}
            />
          ))}
          {/* Texto central con el total, opcional */}
          <text x="100" y="95" textAnchor="middle" fontSize="32" fontWeight="600" fill="#111827">
            {total}
          </text>
          <text x="100" y="115" textAnchor="middle" fontSize="13" fill="#9ca3af">
            Total
          </text>
        </svg>
      </div>

      {/* Leyenda debajo de la dona */}
      <div className="flex flex-wrap justify-center gap-6">
        {segments.map((seg) => {
          const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : '0.0';
          return (
            <div key={seg.key} className="flex items-center gap-2">
              <span className={`h-3 w-3 shrink-0 rounded-full ${BG_CLASS[seg.key]}`} />
              <span className="text-[13px] text-gray-700">{seg.label}</span>
              <span className="ml-1 text-[13px] text-gray-500">
                {seg.value} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
