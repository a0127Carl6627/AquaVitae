import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock Firebase antes de importar App
jest.mock('./lib/firebase', () => ({ auth: {} }));
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
}));
jest.mock('./lib/authService', () => ({
  logout: jest.fn(),
  getStoredUser: jest.fn(() => null),
}));

// Mock de páginas pesadas para aislar App
jest.mock('./pages/LoginContainer', () => () => <div>Login</div>);
jest.mock('./pages/DashboardInicio', () => () => <div>Dashboard</div>);
jest.mock('./pages/SimulacionPage', () => () => <div>Simulacion</div>);
jest.mock('./pages/AlternativasPage', () => () => <div>Alternativas</div>);
jest.mock('./pages/GestionUsuariosPage', () => () => <div>GestionUsuarios</div>);
jest.mock('./pages/ApiAlertsPage', () => () => <div>ApiAlerts</div>);
jest.mock('./pages/AdminAuditoriaPage', () => () => <div>Auditoria</div>);
jest.mock('./layout/ExpandableSidebar', () => () => <nav>Sidebar</nav>);

import { onAuthStateChanged } from 'firebase/auth';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza nada mientras se resuelve el estado de auth (user === undefined)', () => {
    // onAuthStateChanged nunca llama al callback → user queda en undefined
    onAuthStateChanged.mockImplementation(() => jest.fn());

    const { container } = render(<App />);
    expect(container.firstChild).toBeNull();
  });

  it('muestra el login cuando no hay usuario autenticado', () => {
    // Simula que Firebase devuelve null (no autenticado)
    onAuthStateChanged.mockImplementation((_auth, cb) => {
      cb(null);
      return jest.fn();
    });

    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('muestra el sidebar cuando hay usuario autenticado con rol Director', () => {
    const fakeUser = { getIdToken: jest.fn().mockResolvedValue('token') };
    const { getStoredUser } = require('./lib/authService');
    getStoredUser.mockReturnValue({ rol: 'Director', nombre: 'Test' });

    onAuthStateChanged.mockImplementation((_auth, cb) => {
      cb(fakeUser);
      return jest.fn();
    });

    render(<App />);
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });
});
