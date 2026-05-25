import React, { useState, useEffect } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import LoginContainer from './components/LoginPage/LoginContainer';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout, getStoredUser } from './lib/authService';
import ApiAlertsPage from './components/ApiAlertsPage/ApiAlertsPage';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(undefined);
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u ?? null);

      if (u) {
        setAppUser(getStoredUser());
      } else {
        setAppUser(null);
      }
    });

    return unsub;
  }, []);

  const handleNavigate = (newPage) => {
    if (appUser?.rol === 'Director' && newPage === 'api-alerts') {
      setPage('dashboard');
      return;
    }

    setPage(newPage);
  };

  const handleLogout = async () => {
    await logout();
    setAppUser(null);
    setPage('dashboard');
  };

  if (user === undefined) return null;
  if (user === null) {
  return (
    <LoginContainer
      onLogin={(backendUser) => {
        setAppUser(backendUser);
        setPage('dashboard');
      }}
    />
  );
}

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif' }}>
      <ExpandableSidebar
        activePage={page}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={appUser}
      />

      {page === 'dashboard' && <DashboardInicio />}
      {page === 'simulacion' && <SimulacionPage />}
      {page === 'alternativas' && <AlternativasPage />}
      {page === 'api-alerts' && appUser?.rol === 'Administrador' && <ApiAlertsPage />}
    </div>
  );
}