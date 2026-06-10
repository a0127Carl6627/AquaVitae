/**
 * Pruebas unitarias para LoginPage.
 *
 * Estrategia:
 *  - Se prueba únicamente el componente visual de login.
 *  - No se conecta con Firebase ni backend.
 *  - Se valida renderizado, errores visuales, submit, loading y mostrar/ocultar contraseña.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../../pages/LoginPage';

describe('LoginPage — unitarias', () => {
  // ── 1. Render principal ─────────────────────────────────────────────────
  describe('render principal', () => {
    it('renderiza título, subtítulo, inputs y botones principales', () => {
      render(<LoginPage />);

      expect(screen.getByText('AquaVitae')).toBeInTheDocument();
      expect(screen.getByText('Sistema de monitoreo de riesgo hídrico')).toBeInTheDocument();
      expect(screen.getByText('Inicio de sesión')).toBeInTheDocument();
      expect(screen.getByText('Accede con tus credenciales de AquaVitae')).toBeInTheDocument();

      expect(screen.getByPlaceholderText('correo@empresa.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();

      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /olvidaste tu contraseña/i })).toBeInTheDocument();
    });
  });

  // ── 2. Submit del formulario ────────────────────────────────────────────
  describe('submit del formulario', () => {
    it('llama onSubmit con email y contraseña ingresados', () => {
      const onSubmit = jest.fn();

      render(<LoginPage onSubmit={onSubmit} />);

      fireEvent.change(screen.getByPlaceholderText('correo@empresa.com'), {
        target: { value: 'admin@aquavitae.com' },
      });

      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: 'Password123' },
      });

      fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith({
        email: 'admin@aquavitae.com',
        password: 'Password123',
      });
    });
  });

  // ── 3. Errores visuales ─────────────────────────────────────────────────
  describe('errores visuales', () => {
    it('muestra error general cuando generalError tiene valor', () => {
      render(<LoginPage generalError="Credenciales inválidas" />);

      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });

    it('muestra errores de email y contraseña cuando existen', () => {
      render(
        <LoginPage
          emailError="Ingresa tu correo electrónico"
          passwordError="Ingresa tu contraseña"
        />
      );

      expect(screen.getByText('Ingresa tu correo electrónico')).toBeInTheDocument();
      expect(screen.getByText('Ingresa tu contraseña')).toBeInTheDocument();
    });
  });

  // ── 4. Mostrar / ocultar contraseña ─────────────────────────────────────
  describe('mostrar y ocultar contraseña', () => {
    it('cambia el input de password a text al presionar Ver', () => {
      render(<LoginPage />);

      const passwordInput = screen.getByPlaceholderText('••••••••');

      expect(passwordInput).toHaveAttribute('type', 'password');

      fireEvent.click(screen.getByRole('button', { name: /ver/i }));

      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(screen.getByRole('button', { name: /ocultar/i })).toBeInTheDocument();
    });

    it('regresa el input a password al presionar Ocultar', () => {
      render(<LoginPage />);

      const passwordInput = screen.getByPlaceholderText('••••••••');

      fireEvent.click(screen.getByRole('button', { name: /ver/i }));
      fireEvent.click(screen.getByRole('button', { name: /ocultar/i }));

      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  // ── 5. Estado loading ───────────────────────────────────────────────────
  describe('estado loading', () => {
    it('deshabilita el botón y muestra "Iniciando..." cuando loading es true', () => {
      render(<LoginPage loading />);

      const submitButton = screen.getByRole('button', { name: /iniciando/i });

      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('Iniciando...');
    });
  });
});