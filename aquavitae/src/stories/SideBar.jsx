import React from 'react';

const styles = {
  sidebar: {
    width: 52,
    background: '#ffffff',
    borderRight: '0.5px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    gap: 4,
    height: '100vh',
    boxSizing: 'border-box',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    overflow: 'hidden',
    marginBottom: 8,
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    background: '#dceeff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
    color: '#2F9EF3',
    fontFamily: 'sans-serif',
  },
  divider: {
    width: 28,
    height: '0.5px',
    background: '#e2e8f0',
    margin: '4px 0',
  },
  iconBtn: {
    position: 'relative',
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    transition: 'background 0.15s ease',
  },
  iconBtnActive: {
    background: '#e8f4ff',
  },
  icon: {
    width: 18,
    height: 18,
    stroke: '#94a3b8',
    fill: 'none',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  iconActive: {
    stroke: '#2F9EF3',
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#ff7b72',
    border: '1.5px solid #ffffff',
  },
  logout: {
    marginTop: 'auto',
  },
};

const ICONS = {
  bell: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  users: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  doc: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  monitor: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  globe: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  pin: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  key: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  eye: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  settings: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  logout: (s) => (
    <svg style={s} viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

function NavItem({ iconKey, active = false, hasDot = false, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const iconStyle = {
    ...styles.icon,
    ...(active || hovered ? styles.iconActive : {}),
  };
  const btnStyle = {
    ...styles.iconBtn,
    ...(active ? styles.iconBtnActive : {}),
    ...(hovered && !active ? { background: '#f1f5f9' } : {}),
  };
  return (
    <button
      style={btnStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {ICONS[iconKey]?.(iconStyle)}
      {hasDot && <span style={styles.dot} />}
    </button>
  );
}

const DIRECTOR_ITEMS = [
  { key: 'bell',    icon: 'bell',    dotProp: 'hasNotification' },
  { key: 'doc',     icon: 'doc'     },
  { key: 'monitor', icon: 'monitor' },
  { key: 'globe',   icon: 'globe'   },
  { key: 'pin',     icon: 'pin'     },
];

const ADMIN_ITEMS = [
  { key: 'settings', icon: 'settings' },
  { key: 'key',      icon: 'key',     dotProp: 'hasApiError' },
  { key: 'eye',      icon: 'eye'      },
];

export default function Sidebar({
  role = 'director',
  activeItem,
  hasNotification = false,
  hasApiError = false,
  avatarUrl,
  avatarInitials = 'U',
  onItemClick,
  onLogout,
}) {
  const items = role === 'admin' ? ADMIN_ITEMS : DIRECTOR_ITEMS;

  return (
    <div style={styles.sidebar}>
      {/* Avatar */}
      <div style={styles.avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" style={styles.avatarImg} />
        ) : (
          <div style={styles.avatarFallback}>{avatarInitials}</div>
        )}
      </div>

      <div style={styles.divider} />

      {/* Nav items */}
      {items.map(({ key, icon, dotProp }) => {
        const hasDot =
          dotProp === 'hasNotification' ? hasNotification :
          dotProp === 'hasApiError'     ? hasApiError     : false;
        return (
          <NavItem
            key={key}
            iconKey={icon}
            active={activeItem === key}
            hasDot={hasDot}
            onClick={() => onItemClick?.(key)}
          />
        );
      })}

      {/* Logout al fondo */}
      <div style={styles.logout}>
        <NavItem iconKey="logout" onClick={onLogout} />
      </div>
    </div>
  );
}