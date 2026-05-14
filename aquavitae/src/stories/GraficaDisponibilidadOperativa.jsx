import React from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload.find(p => p.dataKey === 'valor')?.value;
  return (
    <div style={{
      background: '#1a2332', borderRadius: 6, padding: '8px 12px',
      fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 3, fontSize: 10.5 }}>Día {label}</div>
      <div style={{ color: '#e23b3b', fontWeight: 700 }}>{val?.toFixed(1)}% disponible</div>
    </div>
  );
};

function LegendItem({ color, dashed, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#5a6577' }}>
      <span style={{
        width: 18, height: dashed ? 0 : 3,
        background: dashed ? 'transparent' : color,
        borderTop: dashed ? `2px dashed ${color}` : 'none',
        display: 'inline-block', borderRadius: 2,
      }} />
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
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e6eaf0',
      borderRadius: 12,
      padding: '18px 18px 10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      <div style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 13.5, fontWeight: 700, color: '#1a2332', margin: '0 0 3px 0' }}>
          Proyección de disponibilidad operativa
        </h3>
        <p style={{ fontSize: 11.5, color: '#8a93a3', margin: 0 }}>
          Escenario sin intervención · 90 días
        </p>
      </div>

      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e23b3b" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#e23b3b" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="dia" axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: '#8a93a3' }}
            />
            <YAxis
              axisLine={false} tickLine={false}
              tick={{ fontSize: 10, fill: '#8a93a3' }}
              tickFormatter={v => `${v}%`}
              domain={[0, 100]}
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

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        borderTop: '1px solid #e6eaf0', paddingTop: 14, marginTop: 8,
      }}>
        {[
          { label: 'Inicio declive', value: `Día ${inicioDeclive}`, color: '#1a2332' },
          { label: 'Cierre forzoso', value: `Día ${cierreForzoso}`, color: '#e23b3b' },
          { label: 'Pérdida proy.', value: perdidaProyectada, color: '#e23b3b' },
          { label: 'Prob. evento', value: probEvento, color: '#2563eb' },
        ].map(({ label, value, color }, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', gap: 2,
            padding: i === 0 ? '0 16px 0 0' : i === 3 ? '0 0 0 16px' : '0 16px',
            borderRight: i < 3 ? '1px solid #e6eaf0' : 'none',
          }}>
            <span style={{ fontSize: 11, color: '#8a93a3', textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color, letterSpacing: '-.01em' }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14, padding: '10px 0 0', borderTop: '1px solid #e6eaf0', marginTop: 14 }}>
        <LegendItem color="#e23b3b" dashed={false} label="Disponibilidad proyectada" />
        <LegendItem color="#e89923" dashed label="Umbral mínimo operativo" />
      </div>
    </div>
  );
}
