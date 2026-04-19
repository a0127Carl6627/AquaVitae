import React from 'react';

export default function ProjectionTooltip({ value, label = 'Proyectado', trend = 'up', position = { x: 0, y: 0 }, static: isStatic = true }) {
  const trendColor = trend === 'up' ? '#ef4444' : '#22c55e';
  const trendIcon = trend === 'up' ? '↑' : '↓';

  return (
    <div style={{
      position: isStatic ? 'relative' : 'absolute',
      left: isStatic ? 'auto' : position.x,
      top: isStatic ? 'auto' : position.y,
      display: 'inline-block',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '10px 14px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      fontFamily: 'sans-serif',
      minWidth: '120px',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: '4px',
      }}>
        {label}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          fontSize: '24px',
          fontWeight: '800',
          color: '#1e293b',
          lineHeight: 1,
        }}>
          {value}
        </span>
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          color: trendColor,
        }}>
          {trendIcon}
        </span>
      </div>
    </div>
  );
}
