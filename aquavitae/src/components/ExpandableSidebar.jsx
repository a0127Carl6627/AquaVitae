import React, { useState } from 'react';

const styles = {
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #e6eaf0',
    display: 'flex',
    flexDirection: 'column',
    padding: '18px 12px',
    gap: 8,
    position: 'sticky',
    top: 0,
    height: '100vh',
    flexShrink: 0,
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'linear-gradient(160deg,#2563eb,#1577a8)',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    fontWeight: 700,
    marginBottom: 18,
    fontSize: 14,
    flexShrink: 0,
  },
  toggleBtn: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#8a93a3',
    transition: 'all 0.15s',
    marginBottom: 8,
    fontSize: 18,
  },
  navItem: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#8a93a3',
    transition: 'all 0.15s',
    padding: '0 10px',
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  navItemActive: {
    background: '#eaf1fe',
    color: '#1d4ed8',
  },
  icon: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  divider: {
    height: '1px',
    background: '#e6eaf0',
    margin: '8px 0',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  logoutBtn: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#8a93a3',
    transition: 'all 0.15s',
    padding: '0 10px',
    fontSize: 14,
    fontWeight: 500,
  },
};

const NAVIGATION_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    key: 'alternativas',
    label: 'Alternativas',
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: 'simulacion',
    label: 'Simulación',
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-5 4 4 8-9" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
];

export default function ExpandableSidebar({ activePage = 'dashboard', onNavigate, onLogout }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarWidth = isExpanded ? 220 : 64;

  return (
    <aside
      style={{
        ...styles.sidebar,
        width: sidebarWidth,
      }}
    >
      {/* Logo */}
      <div style={styles.logo}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C12 3 5 11 5 16a7 7 0 0 0 14 0c0-5-7-13-7-13Z" fill="#fff" opacity=".95" />
        </svg>
      </div>

      {/* Toggle Button */}
      <button
        style={styles.toggleBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Contraer' : 'Expandir'}
      >
        {isExpanded ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>

      <div style={styles.divider} />

      {/* Navigation Items */}
      {NAVIGATION_ITEMS.map(({ key, label, icon }) => {
        const isActive = activePage === key;
        return (
          <button
            key={key}
            style={{
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            }}
            onClick={() => onNavigate(key)}
            title={label}
          >
            <span style={styles.icon}>{icon(20)}</span>
            {isExpanded && <span style={styles.label}>{label}</span>}
          </button>
        );
      })}

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.divider} />
        <button
          style={styles.logoutBtn}
          onClick={onLogout}
          title="Salir"
        >
          <span style={styles.icon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          {isExpanded && <span style={styles.label}>Salir</span>}
        </button>
      </div>
    </aside>
  );
}
