import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const datos = [
  { dia: 'HOY',      valor: 10 },
  { dia: '+10',      valor: 14 },
  { dia: '+20',      valor: 13 },
  { dia: '+30 DÍAS', valor: 16 },
  { dia: '+40',      valor: 22 },
  { dia: '+50',      valor: 35 },
  { dia: '+60 DÍAS', valor: 52 },
  { dia: '+70',      valor: 60 },
  { dia: '+80',      valor: 65 },
  { dia: '+90 DÍAS', valor: 72 },
];

const config = {
  bajo:  { color: '#22c55e', label: 'Bajo' },
  medio: { color: '#eab308', label: 'Medio' },
  alto:  { color: '#ef4444', label: 'Alto' },
};

const TooltipPersonalizado = ({ active, payload, label, nivel }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '12px',
      }}>
        <p style={{ margin: '0 0 4px', fontWeight: '700', color: '#475569' }}>
          PROYECTADO ({label})
        </p>
        <p style={{ margin: 0, color: config[nivel]?.color, fontWeight: '600' }}>
          {config[nivel]?.label}: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function GraficaSequia({ nivel = 'bajo' }) {
  const { color, label } = config[nivel] || config.bajo;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
            Proyección de Severidad de Sequía (%)
          </h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
            Predicción a 90 días basada en modelos climáticos históricos.
          </p>
        </div>
        <span style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', fontWeight: '600', color,
        }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
          {label}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={datos} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNivel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.25} />
              <stop offset="95%" stopColor={color} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
          <Tooltip content={(props) => <TooltipPersonalizado {...props} nivel={nivel} />} />
          <Area
            type="monotone"
            dataKey="valor"
            stroke={color}
            strokeWidth={2.5}
            fill="url(#colorNivel)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
