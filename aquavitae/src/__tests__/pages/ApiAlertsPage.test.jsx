/**
 * Pruebas unitarias para ApiAlertsPage.
 *
 * Estrategia:
 *  - Se mockean los hooks useApiStatus, useApiAlerts y useTriggerApiCheck.
 *  - Se valida el renderizado visual de la pantalla de monitoreo de APIs.
 *  - Se prueban estados de carga, error, datos exitosos, métricas calculadas
 *    y estados vacíos sin depender del backend.
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
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
  {
    nombreApi: 'NASA POWER',
    endpoint: '/api/temporal/hourly/point',
    codigoError: 401,
    mensaje: 'Token inválido',
    severidad: 'Critica',
  },
];

// ── Helper ────────────────────────────────────────────────────────────────
function setupHooks({
  statusList = mockStatusList,
  alerts = mockAlerts,
  loadingStatus = false,
  loadingAlerts = false,
  statusError = null,
  alertsError = null,
  isPending = false,
} = {}) {
  useApiStatus.mockReturnValue({
    data: statusList,
    isLoading: loadingStatus,
    error: statusError,
  });

  useApiAlerts.mockReturnValue({
    data: alerts,
    isLoading: loadingAlerts,
    error: alertsError,
  });

  useTriggerApiCheck.mockReturnValue({
    mutate: jest.fn(),
    isPending,
  });
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('ApiAlertsPage — unitarias', () => {
  // ── 1. Estado de carga ─────────────────────────────────────────────────
  describe('estado de carga', () => {
    it('muestra mensaje de carga cuando status está cargando', () => {
      setupHooks({ loadingStatus: true });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Cargando monitoreo de APIs...')).toBeInTheDocument();
    });

    it('muestra mensaje de carga cuando alertas está cargando', () => {
      setupHooks({ loadingAlerts: true });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Cargando monitoreo de APIs...')).toBeInTheDocument();
    });
  });

  // ── 2. Estado de error ─────────────────────────────────────────────────
  describe('estado de error', () => {
    it('muestra error cuando falla la consulta de status', () => {
      setupHooks({
        statusError: new Error('Error al cargar estado de APIs'),
      });

      render(<ApiAlertsPage />);

      expect(
        screen.getByText('Error: Error al cargar estado de APIs')
      ).toBeInTheDocument();
    });

    it('muestra error cuando falla la consulta de alertas', () => {
      setupHooks({
        alertsError: new Error('Error al cargar alertas'),
      });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Error: Error al cargar alertas')).toBeInTheDocument();
    });
  });

  // ── 3. Render exitoso ──────────────────────────────────────────────────
  describe('render exitoso', () => {
    it('renderiza título, descripción y botón principal', () => {
      setupHooks();

      render(<ApiAlertsPage />);

      expect(screen.getByText('Alertas de API')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Monitorea errores de integración para detectar y resolver problemas antes de que afecten al usuario.'
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', { name: /actualizar apis/i })
      ).toBeInTheDocument();
    });

    it('renderiza secciones principales de la pantalla', () => {
      setupHooks();

      render(<ApiAlertsPage />);

      expect(screen.getByText('Estado de APIs externas')).toBeInTheDocument();
      expect(screen.getByText('Errores por API')).toBeInTheDocument();
      expect(screen.getByText('Alertas recientes')).toBeInTheDocument();
    });

    it('renderiza status de APIs externas', () => {
      setupHooks();

      render(<ApiAlertsPage />);

      expect(screen.getAllByText('Open-Meteo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('SMN').length).toBeGreaterThan(0);
      expect(screen.getByText('/v1/forecast')).toBeInTheDocument();
      expect(screen.getAllByText('/pronostico').length).toBeGreaterThan(0);
      expect(screen.getByText('OK')).toBeInTheDocument();
      expect(screen.getByText('ERROR')).toBeInTheDocument();
    });

    it('renderiza tabla de alertas recientes', () => {
      setupHooks();

      render(<ApiAlertsPage />);

      expect(screen.getByText('API')).toBeInTheDocument();
      expect(screen.getByText('Endpoint')).toBeInTheDocument();
      expect(screen.getByText('Código')).toBeInTheDocument();
      expect(screen.getByText('Mensaje')).toBeInTheDocument();
      expect(screen.getByText('Severidad')).toBeInTheDocument();

      expect(screen.getByText('Endpoint no encontrado')).toBeInTheDocument();
      expect(screen.getAllByText('No autorizado').length).toBeGreaterThan(0);
      expect(screen.getByText('Token inválido')).toBeInTheDocument();
    });
  });

  // ── 4. Métricas calculadas ─────────────────────────────────────────────
  describe('métricas calculadas', () => {
    it('calcula correctamente errores 401, 404, total de errores y APIs afectadas', () => {
      setupHooks();

      render(<ApiAlertsPage />);

      const errores401Card = screen.getByText('Errores 401').closest('article');
      const errores404Card = screen.getByText('Errores 404').closest('article');
      const totalErroresCard = screen.getByText('Total de errores').closest('article');
      const apisAfectadasCard = screen.getByText('APIs afectadas').closest('article');

      expect(within(errores401Card).getByText('2')).toBeInTheDocument();
      expect(within(errores404Card).getByText('1')).toBeInTheDocument();
      expect(within(totalErroresCard).getByText('3')).toBeInTheDocument();
      expect(within(apisAfectadasCard).getByText('2')).toBeInTheDocument();
    });
  });

  // ── 5. Datos vacíos ────────────────────────────────────────────────────
  describe('datos vacíos', () => {
    it('muestra mensajes vacíos cuando no hay APIs ni alertas', () => {
      setupHooks({
        statusList: [],
        alerts: [],
      });

      render(<ApiAlertsPage />);

      expect(screen.getByText('Sin APIs monitoreadas todavía.')).toBeInTheDocument();
      expect(screen.getByText('No hay alertas activas.')).toBeInTheDocument();
    });

    it('muestra métricas en cero cuando no hay alertas', () => {
      setupHooks({
        statusList: [],
        alerts: [],
      });

      render(<ApiAlertsPage />);

      const errores401Card = screen.getByText('Errores 401').closest('article');
      const errores404Card = screen.getByText('Errores 404').closest('article');
      const totalErroresCard = screen.getByText('Total de errores').closest('article');
      const apisAfectadasCard = screen.getByText('APIs afectadas').closest('article');

      expect(within(errores401Card).getByText('0')).toBeInTheDocument();
      expect(within(errores404Card).getByText('0')).toBeInTheDocument();
      expect(within(totalErroresCard).getByText('0')).toBeInTheDocument();
      expect(within(apisAfectadasCard).getByText('0')).toBeInTheDocument();
    });
  });
});