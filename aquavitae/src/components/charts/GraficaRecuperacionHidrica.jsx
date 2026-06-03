import React from 'react';
import {
  ComposedChart, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-[#1a2332] px-3 py-2 font-sans text-xs">
      <div className="mb-1 text-[10.5px] text-[#94a3b8]">Día {label}</div>
      {payload.map((p, i) => (
        <div key={i} className="text-[11px] font-bold" style={{ color: p.color }}>
          {p.name}: {p.value?.toFixed(1)}%
        </div>
      ))}
    </div>
  );
};

export default function GraficaRecuperacionHidrica({
  data = [],
  height = 240,
}) {
  return (
    <div className="rounded-xl border border-[#e6eaf0] bg-white px-[18px] pb-2.5 pt-[18px] font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="mb-3.5">
        <h3 className="m-0 mb-[3px] text-[13.5px] font-bold text-[#1a2332]">
          Simulación de recuperación hídrica
        </h3>
        <p className="m-0 text-[11.5px] text-[#8a93a3]">
          Comparativa con y sin intervención · 90 días
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 20, left: 20, bottom: 18 }}>
          <XAxis
            dataKey="dia" axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: '#8a93a3' }}
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

          <ReferenceLine x={60} stroke="#e23b3b" strokeDasharray="3 3" strokeWidth={1} opacity={0.55} />

          <Line
            type="monotone" dataKey="sinIntervencion"
            stroke="#94a0b3" strokeWidth={2} strokeDasharray="6 5"
            dot={false} activeDot={{ r: 4, fill: '#fff', stroke: '#94a0b3', strokeWidth: 2 }}
            name="Sin intervención"
          />
          <Line
            type="monotone" dataKey="conIntervencion"
            stroke="#2563eb" strokeWidth={2.4}
            dot={false} activeDot={{ r: 4, fill: '#fff', stroke: '#2563eb', strokeWidth: 2 }}
            name="Con intervención"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Leyenda */}
      <div className="mt-2 flex gap-4 border-t border-[#e6eaf0] pt-2.5">
        <LegendItem lineClass="h-0.5 bg-[#2563eb]" label="Con intervención" />
        <LegendItem lineClass="border-t-2 border-dashed border-[#94a0b3]" label="Sin intervención" />
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
