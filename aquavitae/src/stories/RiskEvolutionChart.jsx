import React, { useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, ReferenceLine, Label,
} from 'recharts';

const getRiskColors = (maxPercent) => {
  if (maxPercent > 60) {
    return { stroke: '#ef4444', fill: '#fee2e2' };
  } else if (maxPercent > 30) {
    return { stroke: '#f59e0b', fill: '#fef3c7' };
  }
  return { stroke: '#22c55e', fill: '#dcfce7' };
};

export default function RiskEvolutionChart({ data = [] }) {
  const chartData = useMemo(
    () => data.map((d) => ({
      fecha: d.fecha,
      porcentaje: +(d.valorPromedio).toFixed(1),
    })),
    [data]
  );

  const maxPercent = useMemo(
    () => (chartData.length > 0
      ? Math.max(...chartData.map((d) => d.porcentaje))
      : 100),
    [chartData]
  );

  const { stroke, fill } = getRiskColors(maxPercent);

  if (chartData.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-family, "Inter", sans-serif)' }}>
        No hay datos de evolución.
      </p>
    );
  }

  return (
    <div style={{
      fontFamily: 'var(--font-family, "Inter", sans-serif)',
      width: '100%',
      height: '300px',
    }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="fecha" tick={{ fontSize: 12 }} axisLine={{ stroke: '#9ca3af' }} tickLine={false}>
            <Label value="Día" offset={-10} position="insideBottom" style={{ fontSize: 13, fill: '#6b7280' }} />
          </XAxis>
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} axisLine={{ stroke: '#9ca3af' }} tickLine={false}>
            <Label value="Índice Hídrico (%)" angle={-90} position="insideLeft" offset={0} style={{ fontSize: 13, fill: '#6b7280' }} />
          </YAxis>
          <Tooltip formatter={(value) => `${value}%`} labelStyle={{ fontWeight: 600 }} />
          <Area type="monotone" dataKey="porcentaje" stroke="none" fill={fill} fillOpacity={0.3} />
          <Line type="monotone" dataKey="porcentaje" stroke={stroke} strokeWidth={3} dot={{ r: 4, fill: stroke }} activeDot={{ r: 6 }} />
          <ReferenceLine y={30} stroke="#86efac" strokeDasharray="4 4" />
          <ReferenceLine y={60} stroke="#fcd34d" strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}