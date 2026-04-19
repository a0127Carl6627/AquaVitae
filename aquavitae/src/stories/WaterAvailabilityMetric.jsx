import React from 'react';

function formatVolume(m3) {
  if (m3 >= 1000000) return `${(m3 / 1000000).toFixed(1)}M m³`;
  if (m3 >= 1000)    return `${Math.round(m3 / 1000)}k m³`;
  return `${m3} m³`;
}

export default function WaterAvailabilityMetric({
  value = 0,
  variation = 0,
  label = 'Disponibilidad (5 años)',
  size = 'md',
}) {
  const up = variation >= 0;
  const variationColor = up ? '#16a34a' : '#dc2626';

  const fontSize = { sm: 18, md: 26, lg: 36 }[size] || 26;
  const varSize  = { sm: 11, md: 13, lg: 16 }[size] || 13;

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <span style={{
          fontSize: 10, fontWeight: 600, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>
          {label}
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          fontSize, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1,
        }}>
          {formatVolume(value)}
        </span>
        <span style={{
          fontSize: varSize, fontWeight: 700, color: variationColor,
          display: 'inline-flex', alignItems: 'center', gap: 2,
        }}>
          {up ? '↑' : '↓'} {up ? '+' : ''}{variation}%
        </span>
      </div>
    </div>
  );
}
