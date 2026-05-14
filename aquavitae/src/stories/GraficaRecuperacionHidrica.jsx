import React from 'react';
import {
  ComposedChart, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a2332', borderRadius: 6, padding: '8px 12px',
      fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 4, fontSize: 10.5 }}>Día {label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 700, fontSize: 11 }}>
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
          Simulación de recuperación hídrica
        </h3>
        <p style={{ fontSize: 11.5, color: '#8a93a3', margin: 0 }}>
          Comparativa con y sin intervención · 90 días
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
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
      <div style={{ display: 'flex', gap: 16, padding: '10px 0 0', borderTop: '1px solid #e6eaf0', marginTop: 8 }}>
        <LegendItem color="#2563eb" dashed={false} label="Con intervención" />
        <LegendItem color="#94a0b3" dashed label="Sin intervención" />
      </div>
    </div>
  );
}

function LegendItem({ color, dashed, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#5a6577' }}>
      <span style={{
        width: 20, height: 2, background: dashed ? 'transparent' : color,
        borderTop: dashed ? `2px dashed ${color}` : 'none', display: 'inline-block',
      }} />
      {label}
    </span>
  );
}
