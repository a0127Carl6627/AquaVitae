import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const TooltipPersonalizado = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '8px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontSize: '13px',
        color: '#1e3a5f',
        fontWeight: '600',
      }}>
        <div style={{ color: '#94a3b8', fontWeight: '400', marginBottom: '2px' }}>{label}</div>
        {payload[0].value.toLocaleString()} m³
      </div>
    );
  }
  return null;
};

export default function BarChartHistorico({ data = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const lastIndex = data.length - 1;

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '14px',
      padding: '20px',
      width: '320px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      fontFamily: 'sans-serif',
    }}>
      <p style={{
        fontSize: '11px',
        fontWeight: '600',
        color: '#94a3b8',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        margin: '0 0 12px 0',
      }}>
        Disponibilidad (5 años)
      </p>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barCategoryGap="20%" margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
          />
          <Tooltip
            content={<TooltipPersonalizado />}
            cursor={false}
          />
          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  index === lastIndex
                    ? '#2563eb'
                    : activeIndex === index
                    ? '#93c5fd'
                    : '#dbeafe'
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
