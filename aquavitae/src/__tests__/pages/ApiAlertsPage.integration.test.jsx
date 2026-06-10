/**
 * Pruebas de integración para ApiAlertsPage.
 *
 * Estrategia:
 *  - Se renderiza la pantalla completa de ApiAlertsPage.
 *  - Los hooks de React Query se mockean para simular integración con datos reales
 *    provenientes del backend.
 *  - Se valida la interacción del botón "Actualizar APIs" con useTriggerApiCheck.
 *  - Se verifican escenarios de éxito, carga, error, datos vacíos y actualización manual.
 */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ApiAlertsPage from '../../pages/ApiAlertsPage';

import {
  useApiStatus,
  useApiAlerts,
  useTriggerApiCheck,
} from '../../hooks/useAquavitaeQueries';

// ── Mocks de hooks ────────────────────────────────────────────────────────
jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useApiStatus: jest.fn(),
  useApiAlerts: jest.fn(),
  useTriggerApiCheck: jest.fn(),
}));

// ── Fixtures ──────────────────────────────────────────────────────────────
const mockStatusList = [
  {
    nombreApi: 'Open-Meteo',
    endpoint: '/v1/forecast',
    estado: 'OK',
    ultimoCodigo: 200,
    erroresActivos: 0,
  },
  {
    nombreApi: 'SMN',
    endpoint: '/pronostico',
    estado: 'ERROR',
    ultimoCodigo: 404,
    erroresActivos: 2,
  },
];

const mockAlerts = [
  {
    nombreApi: 'SMN',
    endpoint: '/pronostico',
    codigoError: 404,
    mensaje: 'Endpoint no encontrado',
    severidad: 'Alta',
  },
  {
    nombreApi: 'NASA POWER',
    endpoint: '/api/temporal/daily/point',
    codigoError: 401,
    mensaje: 'No autorizado',
    severidad: 'Critica',
  },
];

function setupSuccess({ mutate = jest.fn(), isPending = false } = {}) {
  useApiStatus.mockReturnValue({
    data: mockStatusList,
    isLoading: false,
    error: null,
  });

  useApiAlerts.mockReturnValue({
    data: mockAlerts,
    isLoading: false,
    error: null,
  });

  useTriggerApiCheck.mockReturnValue({
    mutate,
    isPending,
  });

  return { mutate };
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('ApiAlertsPage — integración', () => {
  // ── 1. Carga exitosa de datos ───────────────────────────────────────────
  describe('carga exitosa', () => {
    it('integra status y alertas en una sola pantalla', () => {
      setupSuccess();

      render(<ApiAlertsPage />);

      expect(screen.getByText('Alertas de API')).toBeInTheDocument();
      expect(screen.getByText('Estado de APIs externas')).toBeInTheDocument();
      expect(screen.getByText('Alertas recientes')).toBeInTheDocument();

      expect(screen.getAllByText('Open-Meteo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('SMN').length).toBeGreaterThan(0);
      expect(screen.getByText('NASA POWER')).toBeInTheDocument();

      expect(screen.getByText('Endpoint no encontrado')).toBeInTheDocument();
      expect(screen.getAllByText('No autorizado').length).toBeGreaterThan(0);
    });

    it('muestra las métricas calculadas a partir de las alertas recibidas', () => {
      setupSuccess();

      render(<ApiAlertsPage />);

      const errores401Card = screen.getByText('Errores 401').closest('article');
      const errores404Card = screen.getByText('Errores 404').closest('article');
      const totalErroresCard = screen.getByText('Total de errores').closest('article');
      const apisAfectadasCard = screen.getByText('APIs afectadas').closest('article');

      expect(within(errores401Card).getByText('1')).toBeInTheDocument();
      expect(within(errores404Card).getByText('1')).toBeInTheDocument();
      expect(within(totalErroresCard).getByText('2')).toBeInTheDocument();
      expect(within(apisAfectadasCard).getByText('2')).toBeInTheDocument();
    });
  });

  // ── 2. Actualización manual ─────────────────────────────────────────────
  describe('actualización manual', () => {
    it('llama triggerCheck.mutate al hacer clic en Actualizar APIs', () => {
      const mutate = jest.fn();

      setupSuccess({ mutate });

      render(<ApiAlertsPage />);

      fireEvent.click(screen.getByRole('button', { name: /actualizar apis/i }));

      expect(mutate).toHaveBeenCalledTimes(1);
    });

    it('deshabilita el botón cuando triggerCheck está pendiente', () => {
      setupSuccess({ isPending: true });

      render(<ApiAlertsPage />);

      const button = screen.getByRole('button', { name: /actualizando/i });

      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Actualizando...');
    });
  });

  // ── 3. Estados de carga ────────────────────────────────────────────────
  describe('estado de carga', () => {
    it('muestra carga cuando useApiStatus está cargando', () => {
      useApiStatus.mockReturnValue({
        data: [],
        isLoading: true,
        error: null,
      });

      useApiAlerts.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });

      useTriggerApiCheck.mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
      });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Cargando monitoreo de APIs...')).toBeInTheDocument();
    });
  });

  // ── 4. Manejo de error ─────────────────────────────────────────────────
  describe('manejo de error', () => {
    it('muestra mensaje de error cuando falla useApiAlerts', () => {
      useApiStatus.mockReturnValue({
        data: mockStatusList,
        isLoading: false,
        error: null,
      });

      useApiAlerts.mockReturnValue({
        data: [],
        isLoading: false,
        error: new Error('No se pudieron cargar las alertas'),
      });

      useTriggerApiCheck.mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
      });

      render(<ApiAlertsPage />);

      expect(
        screen.getByText('Error: No se pudieron cargar las alertas')
      ).toBeInTheDocument();
    });
  });

  // ── 5. Datos vacíos ────────────────────────────────────────────────────
  describe('datos vacíos', () => {
    it('renderiza mensajes vacíos cuando no hay status ni alertas', () => {
      useApiStatus.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });

      useApiAlerts.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });

      useTriggerApiCheck.mockReturnValue({
        mutate: jest.fn(),
        isPending: false,
      });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Sin APIs monitoreadas todavía.')).toBeInTheDocument();
      expect(screen.getByText('No hay alertas activas.')).toBeInTheDocument();
    });
  });
});