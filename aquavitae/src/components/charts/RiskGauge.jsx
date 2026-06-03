import React from 'react';

const NIVELES = {
  bajo:  { label: 'Bajo',  color: '#22c55e', textClass: 'text-[#22c55e]', angle: -90 },
  medio: { label: 'Medio', color: '#f97316', textClass: 'text-[#f97316]', angle: 0   },
  alto:  { label: 'Alto',  color: '#ef4444', textClass: 'text-[#ef4444]', angle: 72  },
};

export default function RiskGauge({ nivel = 'alto', regiones = 3 }) {
  const config = NIVELES[nivel] ?? NIVELES.alto;
  const needleAngle = config.angle;

  return (
    <div className="flex flex-col items-center gap-1 [font-family:Inter,sans-serif]">
      <p className="m-0 mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-gray-500">
        Riesgo hídrico general
      </p>

      <svg viewBox="0 0 200 120" width="220" height="100" aria-label={`Riesgo ${nivel}`}>
        {/* Arco de fondo gris */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none" stroke="#e5e7eb" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento verde (bajo) */}
        <path
          d="M 20 100 A 80 80 0 0 1 73 33"
          fill="none" stroke="#22c55e" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento naranja (medio) */}
        <path
          d="M 73 33 A 80 80 0 0 1 127 33"
          fill="none" stroke="#f97316" strokeWidth="18" strokeLinecap="round"
        />
        {/* Segmento rojo (alto) */}
        <path
          d="M 127 33 A 80 80 0 0 1 180 100"
          fill="none" stroke="#ef4444" strokeWidth="18" strokeLinecap="round"
        />

        {/* Aguja */}
        <g transform={`translate(100,100) rotate(${needleAngle})`}>
          <line x1="0" y1="0" x2="0" y2="-68" stroke="#1e3a5f" strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="0" r="6" fill="#1e3a5f" />
        </g>
      </svg>

      <p className={`-mt-3 mb-0.5 text-[26px] font-semibold ${config.textClass}`}>
        {config.label}
      </p>
      <p className="m-0 text-xs text-gray-500">
        El riesgo hídrico es {nivel} en {regiones} {regiones === 1 ? 'región' : 'regiones'}.
      </p>
    </div>
  );
}
