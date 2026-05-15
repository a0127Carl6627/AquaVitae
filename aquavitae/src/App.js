import React, { useState } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio   from './pages/DashboardInicio';
import SimulacionPage    from './pages/SimulacionPage';
import AlternativasPage  from './pages/AlternativasPage';
import LoginContainer    from './components/LoginPage/LoginContainer';

export default function App() {
  const [page, setPage] = useState('dashboard');

  // Inicializa leyendo localStorage para que al recargar la página
  // el usuario no tenga que volver a iniciar sesión si ya tenía token.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('aquavitae_token');
  });

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const handleLogin = () => {
    // El token ya fue guardado en localStorage por authService.js.
    // Solo actualizamos el estado de React para mostrar el dashboard.
    setIsAuthenticated(true);
    setPage('dashboard');
  };

  const handleLogout = () => {
    // Limpia el token del localStorage y vuelve al login.
    localStorage.removeItem('aquavitae_token');
    localStorage.removeItem('aquavitae_user');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginContainer onLogin={handleLogin} />;
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif',
    }}>
      <ExpandableSidebar
        activePage={page}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {page === 'dashboard'     && <DashboardInicio />}
      {page === 'simulacion'    && <SimulacionPage />}
      {page === 'alternativas'  && <AlternativasPage />}
    </div>
  );
}