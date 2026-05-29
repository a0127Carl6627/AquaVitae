// Components/MetricCard.jsx
import React from 'react';

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: '20px 16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    border: '1px solid #edf2f7',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    strokeWidth: 1.7,
    fill: 'none',
  },
  content: { flex: 1 },
  title: {
    fontSize: 13,
    fontWeight: 500,
    color: '#5b6e8c',
    letterSpacing: '0.02em',
    marginBottom: 6,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  value: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a2c3e',
    lineHeight: 1.2,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  subtitle: {
    fontSize: 12,
    color: '#7e8b9e',
    marginTop: 4,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
};

// Colores principales del ícono
const iconColors = {
  users: '#2563eb',      // azul
  roles: '#9333ea',      // morado
  permissions: '#16a34a', // verde
  activity: '#ea580c',    // naranja
};

// Colores de fondo (tonalidad clara) para cada tipo
const bgColors = {
  users: '#dbeafe',      // azul muy claro
  roles: '#f3e8ff',      // morado muy claro
  permissions: '#d1fae5', // verde muy claro
  activity: '#fff3e8',    // naranja muy claro
};

const getIcon = (type) => {
  const color = iconColors[type] || '#2c3e50';
  const iconStyle = { ...styles.icon, stroke: color };

  switch (type) {
    case 'users':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'roles':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'permissions':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'activity':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    default:
      return null;
  }
};

export default function MetricCard({ title, value, subtitle, icon }) {
  const backgroundColor = bgColors[icon] || '#f8fafc'; // fallback gris claro

  return (
    <div style={styles.card}>
      <div style={{ ...styles.iconWrapper, backgroundColor }}>
        {getIcon(icon)}
      </div>
      <div style={styles.content}>
        <div style={styles.title}>{title}</div>
        <div style={styles.value}>{value}</div>
        {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
}