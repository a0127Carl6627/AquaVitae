import React, { useState } from 'react';
import ExpandableSidebar from './components/ExpandableSidebar';
import DashboardInicio from './pages/DashboardInicio';
import SimulacionPage from './pages/SimulacionPage';
import AlternativasPage from './pages/AlternativasPage';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", sans-serif' }}>
      <ExpandableSidebar activePage={page} onNavigate={handleNavigate} onLogout={handleLogout} />

      {/* Page content */}
      {page === 'dashboard' && <DashboardInicio />}
      {page === 'simulacion' && <SimulacionPage />}
      {page === 'alternativas' && <AlternativasPage />}
    </div>
  );
}
