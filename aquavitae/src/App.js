import React, { useState, useEffect } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';
import LoginContainer from './components/LoginPage/LoginContainer';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from './lib/authService';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u ?? null));
    return unsub;
  }, []);

  if (user === undefined) return null;
  if (user === null) return <LoginContainer />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif' }}>
      <ExpandableSidebar activePage={page} onNavigate={setPage} onLogout={logout} />
      {page === 'dashboard'     && <DashboardInicio />}
      {page === 'simulacion'    && <SimulacionPage />}
      {page === 'alternativas'  && <AlternativasPage />}
    </div>
  );
}
