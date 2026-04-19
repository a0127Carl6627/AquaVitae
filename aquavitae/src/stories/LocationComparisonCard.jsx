import React from 'react';
import BarChartHistorico from './BarChartHistorico';
import LineChartTendencia from './LineChartTendencia';

const STATUS = {
  favorable: { label: 'FAVORABLE', bg: '#dcfce7', color: '#15803d' },
  riesgo:    { label: 'EN RIESGO', bg: '#fef9c3', color: '#a16207' },
  critico:   { label: 'CRÍTICO',   bg: '#fee2e2', color: '#dc2626' },
};

const TREND_DOT = { favorable: '#3b82f6', riesgo: '#f59e0b', critico: '#ef4444' };

function formatVolume(m3) {
  if (m3 >= 1000000) return `${(m3 / 1000000).toFixed(1)}M m³`;
  if (m3 >= 1000)    return `${Math.round(m3 / 1000)}k m³`;
  return `${m3} m³`;
}

function StatusBadge({ status }) {
  const cfg = STATUS[status] || STATUS.favorable;
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', background: cfg.bg, color: cfg.color,
    }}>
      {cfg.label}
    </span>
  );
}

function TrendIndicator({ pct, status }) {
  const up = pct >= 0;
  const color = status === 'favorable' ? (up ? '#22c55e' : '#ef4444') : (up ? '#f59e0b' : '#ef4444');
  return (
    <span style={{ fontSize: 13, fontWeight: 700, color, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {up ? '↑' : '↓'} {up ? '+' : ''}{pct}%
    </span>
  );
}

export default function LocationComparisonCard({ locationData = {} }) {
  const {
    name = 'Ubicación',
    region = '',
    status = 'favorable',
    availabilityM3 = 0,
    trendPct = 0,
    barData = [],
    lineData = [],
    stressLabel = 'Estrés hídrico',
  } = locationData;

  const dotColor = TREND_DOT[status] || '#3b82f6';

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: '20px 20px 16px',
      minWidth: 240,
      maxWidth: 300,
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{name}</div>
          <div style={{ fontSize: 10, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>
            {region}
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Métrica principal */}
      <div>
        <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
          Disponibilidad (5 años)
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {formatVolume(availabilityM3)}
          </span>
          <TrendIndicator pct={trendPct} status={status} />
        </div>
      </div>

      {/* Gráfica de barras histórica */}
      {barData.length > 0 && (
        <div style={{ margin: '0 -20px' }}>
          <BarChartHistorico data={barData} />
        </div>
      )}

      {/* Gráfica de tendencia */}
      {lineData.length > 0 && (
        <div style={{ margin: '0 -20px' }}>
          <LineChartTendencia data={lineData} nivel={status} />
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
        {stressLabel}
      </div>
    </div>
  );
}
