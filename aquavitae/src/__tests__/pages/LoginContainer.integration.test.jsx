/**
 * Pruebas de integración para LoginContainer.
 *
 * Estrategia:
 *  - Se renderiza LoginContainer junto con LoginPage real.
 *  - loginWithEmail se mockea a nivel de módulo para no llamar Firebase ni backend.
 *  - Se validan reglas de validación, loading, éxito y error de autenticación.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginContainer from '../../pages/LoginContainer';
import { loginWithEmail } from '../../lib/authService';

// ── Mock de servicio de autenticación ──────────────────────────────────────
jest.mock('../../lib/authService', () => ({
  loginWithEmail: jest.fn(),
}));

const mockBackendUser = {
  uid: 'firebase-uid-123',
  email: 'admin@aquavitae.com',
  nombre: 'Carlos',
  apellido: 'Olivarez',
  rol: 'Administrador',
  permisos: ['USUARIOS', 'APIS', 'AUDITORIA'],
};

afterEach(() => {
  jest.clearAllMocks();
});

// ── Helper ────────────────────────────────────────────────────────────────
function fillLoginForm(email = 'admin@aquavitae.com', password = 'Password123') {
  fireEvent.change(screen.getByPlaceholderText('correo@empresa.com'), {
    target: { value: email },
  });

  fireEvent.change(screen.getByPlaceholderText('••••••••'), {
    target: { value: password },
  });
}

describe('LoginContainer — integración', () => {
  // ── 1. Validaciones ─────────────────────────────────────────────────────
  describe('validaciones del formulario', () => {
    it('muestra error si el email está vacío', () => {
      const onLogin = jest.fn();

      render(<LoginContainer onLogin={onLogin} />);

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      expect(screen.getByText('Ingresa tu correo electrónico')).toBeInTheDocument();
      expect(loginWithEmail).not.toHaveBeenCalled();
      expect(onLogin).not.toHaveBeenCalled();
    });

    it('muestra error si la contraseña está vacía', () => {
      const onLogin = jest.fn();

      render(<LoginContainer onLogin={onLogin} />);

      fireEvent.change(screen.getByPlaceholderText('correo@empresa.com'), {
        target: { value: 'admin@aquavitae.com' },
      });

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      expect(screen.getByText('Ingresa tu contraseña')).toBeInTheDocument();
      expect(loginWithEmail).not.toHaveBeenCalled();
      expect(onLogin).not.toHaveBeenCalled();
    });
  });

  // ── 2. Login exitoso ────────────────────────────────────────────────────
  describe('login exitoso', () => {
    it('llama loginWithEmail y ejecuta onLogin con el usuario del backend', async () => {
      const onLogin = jest.fn();

      loginWithEmail.mockResolvedValue({
        backendUser: mockBackendUser,
        token: 'fake-token',
        firebaseUser: { uid: 'firebase-uid-123' },
      });

      render(<LoginContainer onLogin={onLogin} />);

      fillLoginForm();

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(loginWithEmail).toHaveBeenCalledWith(
          'admin@aquavitae.com',
          'Password123'
        );
      });

      await waitFor(() => {
        expect(onLogin).toHaveBeenCalledWith(mockBackendUser);
      });
    });

    it('limpia errores previos al intentar iniciar sesión correctamente', async () => {
      const onLogin = jest.fn();

      loginWithEmail.mockResolvedValue({
        backendUser: mockBackendUser,
        token: 'fake-token',
        firebaseUser: { uid: 'firebase-uid-123' },
      });

      render(<LoginContainer onLogin={onLogin} />);

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
      expect(screen.getByText('Ingresa tu correo electrónico')).toBeInTheDocument();

      fillLoginForm();

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(screen.queryByText('Ingresa tu correo electrónico')).not.toBeInTheDocument();
      });

      expect(onLogin).toHaveBeenCalledWith(mockBackendUser);
    });
  });

  // ── 3. Login fallido ────────────────────────────────────────────────────
  describe('login fallido', () => {
    it('muestra error general cuando loginWithEmail falla', async () => {
      const onLogin = jest.fn();
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      loginWithEmail.mockRejectedValue(new Error('Firebase error'));

      render(<LoginContainer onLogin={onLogin} />);

      fillLoginForm();

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      expect(
        await screen.findByText('Credenciales incorrectas o usuario sin rol asignado.')
      ).toBeInTheDocument();

      expect(onLogin).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  // ── 4. Estado loading ───────────────────────────────────────────────────
  describe('estado loading', () => {
    it('muestra "Iniciando..." mientras loginWithEmail está pendiente', async () => {
      const onLogin = jest.fn();

      let resolveLogin;

      loginWithEmail.mockReturnValue(
        new Promise((resolve) => {
          resolveLogin = resolve;
        })
      );

      render(<LoginContainer onLogin={onLogin} />);

      fillLoginForm();

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      const loadingButton = await screen.findByRole('button', { name: /iniciando/i });

      expect(loadingButton).toBeDisabled();

      resolveLogin({
        backendUser: mockBackendUser,
        token: 'fake-token',
        firebaseUser: { uid: 'firebase-uid-123' },
      });

      await waitFor(() => {
        expect(onLogin).toHaveBeenCalledWith(mockBackendUser);
      });
    });
  });
});