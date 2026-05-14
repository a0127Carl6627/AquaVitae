import React from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis,
  Tooltip, ReferenceLine, ResponsiveContainer, Legend,
} from 'recharts';

const TooltipCustom = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload.find(p => p.dataKey === 'valor')?.value;
  const color = val >= 75 ? '#e23b3b' : val >= 50 ? '#e89923' : '#2563eb';
  return (
    <div style={{
      background: '#1a2332', borderRadius: 6, padding: '8px 12px',
      fontSize: 12, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 3, fontSize: 10.5 }}>Día {label}</div>
      <div style={{ color, fontWeight: 700 }}>{val?.toFixed(1)}% estrés</div>
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
          Proyección de estrés hídrico
        </h3>
        <p style={{ fontSize: 11.5, color: '#8a93a3', margin: 0 }}>
          Escenario sin intervención · 90 días
        </p>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
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
          />
          <YAxis
            axisLine={false} tickLine={false}
            tick={{ fontSize: 10, fill: '#8a93a3' }}
            tickFormatter={v => `${v}%`}
            domain={[0, 100]}
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
      <div style={{ display: 'flex', gap: 14, padding: '10px 0 0', borderTop: '1px solid #e6eaf0', marginTop: 8 }}>
        <LegendItem color="#e23b3b" dashed={false} label="Estrés proyectado" />
        <LegendItem color="#e23b3b" dashed label="Umbral crítico (75%)" />
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
