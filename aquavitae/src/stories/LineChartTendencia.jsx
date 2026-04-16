import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const colores = {
  favorable: { linea: '#3b82f6', area: '#3b82f6' },
  riesgo:    { linea: '#f59e0b', area: '#f59e0b' },
  critico:   { linea: '#ef4444', area: '#ef4444' },
};

const TooltipPersonalizado = ({ active, payload, label, color }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: `1px solid ${color}`,
        borderRadius: '8px',
        padding: '8px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontSize: '13px',
        color: '#1e3a5f',
        fontWeight: '600',
      }}>
        <div style={{ color: '#94a3b8', fontWeight: '400', marginBottom: '2px' }}>{label}</div>
        {payload[0].value}%
      </div>
    );
  }
  return null;
};

export default function LineChartTendencia({ data = [], nivel = 'favorable' }) {
  const { linea, area } = colores[nivel] || colores.favorable;
  const gradientId = `gradientSequia-${nivel}`;

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      padding: '20px',
      width: '340px',
      fontFamily: 'sans-serif',
    }}>
      <p style={{
        fontSize: '11px',
        fontWeight: '700',
        color: '#94a3b8',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        margin: '0 0 16px 0',
      }}>
        Tendencia de sequía (12 meses)
      </p>

      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={area} stopOpacity={0.2} />
              <stop offset="95%" stopColor={area} stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            ticks={['Ene', 'Jun', 'Dic']}
          />

          <Tooltip
            content={(props) => <TooltipPersonalizado {...props} color={linea} />}
            cursor={false}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={linea}
            strokeWidth={2.5}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 4, fill: linea, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
