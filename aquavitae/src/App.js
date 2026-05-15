import React, { useState } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import LoginContainer from './components/LoginPage/LoginContainer';
import { logout } from './lib/authService';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const handleLogout = async () => {
    await logout();

    setIsAuthenticated(false);
    setPage('dashboard');
  };

  if (!isAuthenticated) {
    return <LoginContainer onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
      }}
    >
      <ExpandableSidebar
        activePage={page}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main
        style={{
          flex: 1,
          minHeight: '100vh',
          marginLeft: 64,
          transition: 'margin-left 0.3s ease',
          overflowX: 'hidden',
        }}
      >
        {/* Contenido dinámico según la página seleccionada */}
        {page === 'dashboard' && <DashboardInicio />}
        {page === 'simulacion' && <SimulacionPage />}
        {page === 'alternativas' && <AlternativasPage />}
      </main>
    </div>
  );
}