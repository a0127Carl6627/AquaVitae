import React, { useState, useEffect } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import GestionUsuariosPage from './pages/GestionUsuariosPage';
import LoginContainer from './components/LoginPage/LoginContainer';
import ApiAlertsPage from './components/ApiAlertsPage/ApiAlertsPage';
import AdminAuditoriaPage from './components/Auditoria/AdminAuditoriaPage';

import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout, getStoredUser } from './lib/authService';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(undefined);
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);

      if (u) {
        setAppUser(getStoredUser());
      } else {
        setAppUser(null);
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (!appUser) return;

    if (appUser.rol === 'Administrador') {
      setPage('gestion-usuarios');
    }

    if (appUser.rol === 'Director') {
      setPage('dashboard');
    }
  }, [appUser]);

  const handleNavigate = (newPage) => {
    if (
      appUser?.rol === 'Administrador' &&
      !['gestion-usuarios', 'api-alerts', 'auditoria'].includes(newPage)
    ) {
      setPage('gestion-usuarios');
      return;
    }

    if (
      appUser?.rol === 'Director' &&
      !['dashboard', 'alternativas', 'simulacion'].includes(newPage)
    ) {
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

          if (backendUser?.rol === 'Administrador') {
            setPage('gestion-usuarios');
          } else {
            setPage('dashboard');
          }
        }}
      />
    );
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
        user={appUser}
      />

      {page === 'dashboard' && appUser?.rol === 'Director' && <DashboardInicio />}
      {page === 'simulacion' && appUser?.rol === 'Director' && <SimulacionPage />}
      {page === 'alternativas' && appUser?.rol === 'Director' && <AlternativasPage />}

      {page === 'gestion-usuarios' && appUser?.rol === 'Administrador' && <GestionUsuariosPage />}
      {page === 'api-alerts' && appUser?.rol === 'Administrador' && <ApiAlertsPage />}
      {page === 'auditoria' && appUser?.rol === 'Administrador' && <AdminAuditoriaPage />}
    </div>
  );
}