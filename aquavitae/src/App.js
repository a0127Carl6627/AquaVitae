import React, { useState } from 'react';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import LoginContainer from './components/LoginPage/LoginContainer';

const NAV = [
  {
    key: 'simulacion',
    title: 'Simulación',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-5 4 4 8-9"/><path d="M14 7h6v6"/>
      </svg>
    ),
  },
  {
    key: 'alternativas',
    title: 'Alternativas',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function App() {
  const [page, setPage] = useState('simulacion');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginContainer onLogin={() => setIsAuthenticated(true)} />;
  }

  // Si está autenticado, mostrar la app con sidebar
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: 64, background: '#fff', borderRight: '1px solid #e6eaf0',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '18px 0', gap: 4, position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(160deg,#2563eb,#1577a8)',
          display: 'grid', placeItems: 'center', color: '#fff',
          fontWeight: 700, marginBottom: 18, fontSize: 14,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C12 3 5 11 5 16a7 7 0 0 0 14 0c0-5-7-13-7-13Z" fill="#fff" opacity=".95"/>
          </svg>
        </div>

        {NAV.map(({ key, title, icon }) => {
          const active = page === key;
          return (
            <button
              key={key}
              title={title}
              onClick={() => setPage(key)}
              style={{
                width: 40, height: 40, borderRadius: 10,
                display: 'grid', placeItems: 'center',
                cursor: 'pointer', border: 'none',
                background: active ? '#eaf1fe' : 'transparent',
                color: active ? '#1d4ed8' : '#8a93a3',
                transition: 'background .15s, color .15s',
              }}
            >
              {icon}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />

        {/* Botón Logout — ahora funcional */}
        <button
          title="Salir"
          onClick={() => setIsAuthenticated(false)}
          style={{
            width: 40, height: 40, borderRadius: 10,
            display: 'grid', placeItems: 'center',
            cursor: 'pointer', border: 'none',
            background: 'transparent', color: '#8a93a3',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </aside>

      {/* Page content */}
      {page === 'simulacion' && <SimulacionPage />}
      {page === 'alternativas' && <AlternativasPage />}
    </div>
  );
}