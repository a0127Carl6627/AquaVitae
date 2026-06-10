import React from 'react';
import clsx from 'clsx';
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload.find(p => p.dataKey === 'valor')?.value;
  return (
    <div className="rounded-md bg-[#1a2332] px-3 py-2 font-sans text-xs">
      <div className="mb-[3px] text-[10.5px] text-[#94a3b8]">Día {label}</div>
      <div className="font-bold text-[#e23b3b]">{val?.toFixed(1)}% disponible</div>
    </div>
  );
};

function LegendItem({ lineClass, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#5a6577]">
      <span className={`inline-block w-[18px] rounded-sm ${lineClass}`} />
      {label}
    </span>
  );
}

export default function GraficaDisponibilidadOperativa({
  data = [],
  inicioDeclive = 10,
  cierreForzoso = 80,
  perdidaProyectada = '$4.8 M',
  probEvento = '82%',
  height = 220,
}) {
  const metricas = [
    { label: 'Inicio declive', value: `Día ${inicioDeclive}`, textClass: 'text-[#1a2332]' },
    { label: 'Cierre forzoso', value: `Día ${cierreForzoso}`, textClass: 'text-[#e23b3b]' },
    { label: 'Pérdida proy.', value: perdidaProyectada, textClass: 'text-[#e23b3b]' },
    { label: 'Prob. evento', value: probEvento, textClass: 'text-[#2563eb]' },
  ];

  return (
    <div className="rounded-xl border border-[#e6eaf0] bg-white px-[18px] pb-2.5 pt-[18px] font-sans shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="mb-3.5">
        <h3 className="m-0 mb-[3px] text-[13.5px] font-bold text-[#1a2332]">
          Proyección de disponibilidad operativa
        </h3>
        <p className="m-0 text-[11.5px] text-[#8a93a3]">
          Escenario sin intervención · 90 días
        </p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data} margin={{ top: 8, right: 20, left: 20, bottom: 18 }}>
            <defs>
              <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e23b3b" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#e23b3b" stopOpacity={0.03} />
              </linearGradient>
            </defs>

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
              label={{ value: 'Disponibilidad (%)', angle: -90, position: 'insideLeft', dx: -2, dy: 60, fontSize: 9, fill: '#8a93a3' }}
            />
            <Tooltip
              content={<TooltipCustom />}
              cursor={{ stroke: '#1a2332', strokeWidth: 1, strokeDasharray: '4 3', opacity: 0.35 }}
            />

            <Area dataKey="bandaSup" stroke="none" fill="url(#availGrad)" legendType="none" />
            <Area dataKey="bandaInf" stroke="none" fill="#fff" legendType="none" />

            <ReferenceLine y={30} stroke="#e89923" strokeDasharray="4 3" strokeWidth={1} opacity={0.75}
              label={{ value: 'Mín. operativo', position: 'right', fontSize: 9.5, fill: '#e89923', fontWeight: 600 }} />
            <ReferenceLine x={cierreForzoso} stroke="#e23b3b" strokeDasharray="3 3" strokeWidth={1} opacity={0.55} />

            <Line
              type="monotone" dataKey="valor" stroke="#e23b3b" strokeWidth={2}
              dot={false} activeDot={{ r: 5, fill: '#fff', stroke: '#e23b3b', strokeWidth: 2.5 }}
              name="Disponibilidad"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-0 border-t border-[#e6eaf0] pt-3.5">
        {metricas.map(({ label, value, textClass }, i) => (
          <div
            key={i}
            className={clsx(
              'flex flex-col gap-0.5',
              i === 0 ? 'pr-4' : i === 3 ? 'pl-4' : 'px-4',
              i < 3 && 'border-r border-[#e6eaf0]',
            )}
          >
            <span className="text-[11px] uppercase tracking-[.04em] text-[#8a93a3]">{label}</span>
            <span className={`text-[17px] font-bold tracking-[-.01em] ${textClass}`}>{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex gap-3.5 border-t border-[#e6eaf0] pt-2.5">
        <LegendItem lineClass="h-[3px] bg-[#e23b3b]" label="Disponibilidad proyectada" />
        <LegendItem lineClass="border-t-2 border-dashed border-[#e89923]" label="Umbral mínimo operativo" />
      </div>
    </div>
  );
}
