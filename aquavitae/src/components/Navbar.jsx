import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function DashboardIcon({ isActive }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#378ADD' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function AlternativasIcon({ isActive }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#378ADD' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function SimulacionIcon({ isActive }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#378ADD' : '#9ca3af'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export default function Navbar({ isExpanded, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', Icon: DashboardIcon },
    { path: '/alternativas', label: 'Alternativas', Icon: AlternativasIcon },
    { path: '/simulacion', label: 'Simulación', Icon: SimulacionIcon },
  ];

  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: isExpanded ? '210px' : '70px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: isExpanded ? 'flex-start' : 'center',
      paddingTop: '20px',
      paddingBottom: '20px',
      gap: '20px',
      zIndex: 999,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: isExpanded ? 'flex-start' : 'center',
        paddingLeft: isExpanded ? '15px' : '0',
        cursor: 'pointer',
        marginBottom: '10px'
      }}
      onClick={() => navigate('/')}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#378ADD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>A</span>
        </div>
        {isExpanded && (
          <span style={{ marginLeft: '12px', fontSize: '18px', fontWeight: 'bold', color: '#1f2937', alignSelf: 'center' }}>
            AquaVitae
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {navItems.map(({ path, label, Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              width: isExpanded ? 'calc(100% - 20px)' : '50px',
              height: '50px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: isActive(path) ? '#eff6ff' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isExpanded ? 'flex-start' : 'center',
              padding: isExpanded ? '0 15px' : '0',
              transition: 'all 0.2s ease',
              marginLeft: isExpanded ? '10px' : '0',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              if (!isActive(path)) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(path)) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon isActive={isActive(path)} />
            <span style={{
              display: isExpanded ? 'block' : 'none',
              color: isActive(path) ? '#378ADD' : '#4b5563',
              fontSize: '14px',
              fontWeight: isActive(path) ? '600' : '500',
              whiteSpace: 'nowrap',
              opacity: isExpanded ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        <button
          style={{
            width: isExpanded ? 'calc(100% - 20px)' : '50px',
            height: '50px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isExpanded ? 'flex-start' : 'center',
            padding: isExpanded ? '0 15px' : '0',
            gap: '12px',
            marginLeft: isExpanded ? '10px' : '0',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <LogoutIcon />
          {isExpanded && (
            <span style={{ color: '#4b5563', fontSize: '14px', whiteSpace: 'nowrap' }}>
              Cerrar sesión
            </span>
          )}
        </button>

        <button
          onClick={onToggle}
          style={{
            width: isExpanded ? 'calc(100% - 20px)' : '50px',
            height: '40px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isExpanded ? 'flex-start' : 'center',
            padding: isExpanded ? '0 15px' : '0',
            gap: '12px',
            marginLeft: isExpanded ? '10px' : '0',
            color: '#9ca3af',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title={isExpanded ? "Colapsar" : "Expandir"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isExpanded ? (
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            ) : (
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            )}
          </svg>
          {isExpanded && <span style={{ fontSize: '14px' }}>Colapsar</span>}
        </button>
      </div>
    </nav>
  );
}