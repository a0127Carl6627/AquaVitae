import React from 'react';

const niveles = {
  bajo: {
    color: '#22c55e',
    etiqueta: 'Bajo',
  },
  medio: {
    color: '#f97316',
    etiqueta: 'Medio',
  },
  alto: {
    color: '#ef4444',
    etiqueta: 'Alto',
  },
};

function WarningIcon({ color, size = 45 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path
        d="M12 2L1 21H23L12 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
      />
      <path
        d="M12 9V14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1" fill="white" />
    </svg>
  );
}

export default function RiesgoPromedioCard({
  nivel = 'medio',
  label = 'NIVEL RIESGO PROMEDIO',
}) {
  const { color, etiqueta } = niveles[nivel] || niveles.medio;

  // Solo mostrar ícono si el nivel NO es bajo
  const mostrarIcono = nivel !== 'bajo';

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '16px 20px',
      border: '1px solid #e2e8f0',
      borderLeft: `4px solid ${color}`,
      minWidth: '180px',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        color: '#64748b',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: '30px',
        fontWeight: '700',
        color: color,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span>{etiqueta}</span>
        {mostrarIcono && <WarningIcon color={color} size={22} />}
      </div>
    </div>
  );
}