import React from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload.find(p => p.dataKey === 'valor')?.value;
  const colorClass = val >= 75 ? 'text-[#e23b3b]' : val >= 50 ? 'text-[#e89923]' : 'text-[#2563eb]';
  return (
    <div className="rounded-md bg-[#1a2332] px-3 py-2 font-sans text-xs">
      <div className="mb-[3px] text-[10.5px] text-[#94a3b8]">Día {label}</div>
      <div className={`font-bold ${colorClass}`}>{val?.toFixed(1)}% estrés</div>
    </div>
  );
};

export default function GraficaProyeccionHidrica({
  data = [],
  startDay = 14,
  peakDay = 50,
  peakValue = 88,
  height = 240,
}) {
  return (
    <div className="rounded-xl border border-[#e6eaf0] bg-white px-[18px] pb-2.5 pt-[18px] font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="mb-3.5">
        <h3 className="m-0 mb-[3px] text-[13.5px] font-bold text-[#1a2332]">
          Proyección de estrés hídrico
        </h3>
        <p className="m-0 text-[11.5px] text-[#8a93a3]">
          Escenario sin intervención · 90 días
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 20, left: 20, bottom: 18 }}>
          <defs>
            <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e23b3b" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#e23b3b" stopOpacity={0.04} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="dia" axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: '#8a93a3' }}
            tickFormatter={v => `${v}`}
            label={{ value: 'Días', position: 'insideBottomRight', offset: -8, fontSize: 9, fill: '#8a93a3' }}
          />
          <YAxis
            axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: '#8a93a3' }}
            tickFormatter={v => `${v}%`}
            domain={[0, 100]}
            label={{ value: 'Estrés hídrico (%)', angle: -90, position: 'insideLeft', dx: -2, dy: 60, fontSize: 9, fill: '#8a93a3' }}
          />
          <Tooltip content={<TooltipCustom />} cursor={{ stroke: '#1a2332', strokeWidth: 1, strokeDasharray: '4 3', opacity: 0.35 }} />

          {/* Bandas de zona de riesgo */}
          <Area dataKey="bandaSup" stroke="none" fill="url(#bandGrad)" legendType="none" />
          <Area dataKey="bandaInf" stroke="none" fill="#fff" legendType="none" />

          {/* Umbrales */}
          <ReferenceLine y={75} stroke="#e23b3b" strokeDasharray="4 3" strokeWidth={1} opacity={0.75}
            label={{ value: 'Crítico', position: 'right', fontSize: 9.5, fill: '#e23b3b', fontWeight: 600 }} />
          <ReferenceLine y={50} stroke="#e89923" strokeDasharray="4 3" strokeWidth={1} opacity={0.75}
            label={{ value: 'Medio', position: 'right', fontSize: 9.5, fill: '#e89923', fontWeight: 600 }} />
          <ReferenceLine y={25} stroke="#2563eb" strokeDasharray="4 3" strokeWidth={1} opacity={0.75}
            label={{ value: 'Bajo', position: 'right', fontSize: 9.5, fill: '#2563eb', fontWeight: 600 }} />

          {/* Línea de pico */}
          <ReferenceLine x={peakDay} stroke="#e23b3b" strokeDasharray="3 3" strokeWidth={1} opacity={0.45} />

          {/* Línea principal */}
          <Line
            type="monotone" dataKey="valor" stroke="#e23b3b" strokeWidth={2}
            dot={false} activeDot={{ r: 5, fill: '#fff', stroke: '#e23b3b', strokeWidth: 2.5 }}
            name="Estrés hídrico"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Leyenda */}
      <div className="mt-2 flex gap-3.5 border-t border-[#e6eaf0] pt-2.5">
        <LegendItem lineClass="h-0.5 bg-[#e23b3b]" label="Estrés proyectado" />
        <LegendItem lineClass="border-t-2 border-dashed border-[#e23b3b]" label="Umbral crítico (75%)" />
      </div>
    </div>
  );
}

function LegendItem({ lineClass, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#5a6577]">
      <span className={`inline-block w-5 ${lineClass}`} />
      {label}
    </span>
  );
}
