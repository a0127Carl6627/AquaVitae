import React from 'react';
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const TooltipPersonalizado = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px 14px',
        fontSize: '13px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontWeight: '600' }}>
            {p.name}: {p.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AreaConfidenceBand({ data = [], showBand = true }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      padding: '20px 24px',
      fontFamily: 'sans-serif',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>
            Proyección de Severidad de Sequía (%)
          </h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Predicción a 90 días basada en modelos climáticos históricos
          </p>
        </div>
        {showBand && (
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#64748b',
            backgroundColor: '#f1f5f9',
            padding: '4px 10px',
            borderRadius: '9999px',
          }}>
            Intervalo de Confianza (95%)
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="bandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
            </linearGradient>
          </defs>

          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
          <Tooltip content={<TooltipPersonalizado />} />

          {/* Banda de intervalo de confianza */}
          {showBand && (
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#bandGradient)"
              legendType="none"
              name="Intervalo superior"
            />
          )}
          {showBand && (
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="#fff"
              legendType="none"
              name="Intervalo inferior"
            />
          )}

          {/* Línea principal de proyección */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
            name="Proyección"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
