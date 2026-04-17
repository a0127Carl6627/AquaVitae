import React from 'react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
    padding: '14px 18px',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    width: 18,
    height: 18,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  label: {
    fontSize: 10,
    letterSpacing: '0.08em',
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    lineHeight: 1.2,
  },
};

// Colores personalizados para cada KPI
const KPI_COLORS = {
  uptime: {
    bg: '#ffffff',      
    icon: '#2e7d32',    
    label: '#5e7a61',
    value: '#1b3b1f',
  },
  latency: {
    bg: '#ffffff',      
    icon: '#e65100',    
    label: '#a07a56',
    value: '#4d2e00',
  },
  requests: {
    bg: '#ffffff',      
    icon: '#0d47a1',    
    label: '#5e7a9c',
    value: '#0a2540',
  },
  endpoints: {
    bg: '#ffffff',     
    icon: '#6a1b9a',   
    label: '#8e6b9a',
    value: '#3c1053',
  },
};

const ICONS = {
  uptime: (
    <svg style={styles.icon} viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  latency: (
    <svg style={styles.icon} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  requests: (
    <svg style={styles.icon} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="17" width="18" height="4" rx="1" />
    </svg>
  ),
  endpoints: (
    <svg style={styles.icon} viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
};

const KPI_DEFAULTS = [
  { key: 'uptime',    label: 'Avg Uptime',  value: '99.98%',   icon: 'uptime'    },
  { key: 'latency',   label: 'Latency',     value: '42ms',     icon: 'latency'   },
  { key: 'requests',  label: 'Total Req',   value: '4.8M',     icon: 'requests'  },
  { key: 'endpoints', label: 'Endpoints',   value: '24 active',icon: 'endpoints' },
];

export default function KpiFooter({ kpis = KPI_DEFAULTS }) {
  return (
    <div style={styles.container}>
      {kpis.map(({ key, label, value, icon }) => {
        const colors = KPI_COLORS[key] || KPI_COLORS.uptime; // fallback
        return (
          <div key={key} style={{ ...styles.card, background: colors.bg }}>
            <div style={{ ...styles.iconWrap, background: 'rgba(255,255,255,0.4)' }}>
              {React.cloneElement(ICONS[icon], { style: { ...styles.icon, stroke: colors.icon } })}
            </div>
            <div style={styles.text}>
              <span style={{ ...styles.label, color: colors.label }}>{label}</span>
              <span style={{ ...styles.value, color: colors.value }}>{value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}