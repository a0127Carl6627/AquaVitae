import React, { useState, useEffect } from 'react';
import ExpandableSidebar from './layout/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import GestionUsuariosPage from './pages/GestionUsuariosPage';
import LoginContainer from './pages/LoginContainer';
import ApiAlertsPage from './pages/ApiAlertsPage';
import AdminAuditoriaPage from './pages/AdminAuditoriaPage';

import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout, getStoredUser } from './lib/authService';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(undefined);
  const [appUser, setAppUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u ?? null);

      if (u) {
        const stored = getStoredUser();
        if (stored) {
          setAppUser(stored);
        } else {
          try {
            const token = await u.getIdToken();
            const API_URL = process.env.REACT_APP_API_URL || '';
            const res = await fetch(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              const backendUser = await res.json();
              localStorage.setItem('aquavitae_token', token);
              localStorage.setItem('aquavitae_user', JSON.stringify(backendUser));
              setAppUser(backendUser);
            } else {
              await logout();
              setUser(null);
            }
          } catch {
            await logout();
            setUser(null);
          }
        }
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
    <div className="flex min-h-screen font-sans">
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