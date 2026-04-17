import React from 'react';
import BadgeSeveridad from './BadgeSeveridad';
import IncidentMeta from './IncidentMeta';

const coloresBorde = {
  critico: '#ef4444',
  advertencia: '#f97316',
  informativo: '#3b82f6',
};

export default function AlertCard({
  level = 'critico',
  title = '',
  description = '',
  location = '',
  timestamp = null,
  metrics = [],
  onDetailClick = null,
}) {
  const colorBorde = coloresBorde[level] || '#ef4444';

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      borderLeft: `5px solid ${colorBorde}`,
      padding: '16px 20px',
      marginBottom: '12px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s ease',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Botón Ver detalle en esquina superior derecha */}
      {onDetailClick && (
        <button
          onClick={onDetailClick}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            fontSize: '13px',
            fontWeight: '400',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafc';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          Ver detalle <span>›</span>
        </button>
      )}

      {/* Encabezado: Badge + Título */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        paddingRight: onDetailClick ? '120px' : '0',
        flexWrap: 'wrap',
      }}>
        <BadgeSeveridad level={level} />
        {description && (
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#0f172a',
            lineHeight: '1.3',
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Ubicación y tiempo */}
      {(location || timestamp) && (
        <div>
          <IncidentMeta ubicacion={location} timestamp={timestamp} />
        </div>
      )}

      {/* Métricas en línea */}
      {metrics.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          fontSize: '13px',
          color: '#64748b',
        }}>
          {metrics.map((metric, index) => (
            <div key={index} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#94a3b8',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {metric.label}:
              </span>
              <span style={{
                fontWeight: '700',
                color: metric.status === 'critico' ? '#ef4444' : metric.status === 'normal-ok' ? '#22c55e' : '#1e293b',
                fontSize: '13px',
              }}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}