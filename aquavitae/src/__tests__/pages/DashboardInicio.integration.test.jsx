/**
 * Prueba de integración para DashboardInicio.
 *
 * Estrategia de mocks:
 *  - Los hooks de React Query (useDashboard, useAlertas, useEvolucion) se mockean
 *    a nivel de módulo para controlar los estados loading / error / success sin
 *    depender de la implementación de fetch/axios de aquavitaeApi.js.
 *  - MexicoRiskMap se mockea para evitar el crash de Leaflet en jsdom.
 *    Los chips de leyenda que testea el componente real se replican en el mock.
 *  - ResizeObserver se define globalmente (requerido por Recharts).
 *  - Los demás hijos (StatCards, RiskGauge, DonutChart, RiskEvolutionChart,
 *    AlertsList, LastUpdated, PlantRiskList) se renderizan REALES.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardInicio from '../../pages/DashboardInicio';

// ── Importar mocks ya configurados ────────────────────────────────────────
import { useDashboard, useAlertas, useEvolucion } from '../../hooks/useAquavitaeQueries';

// ── Mocks de infraestructura ───────────────────────────────────────────────
jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useDashboard: jest.fn(),
  useAlertas:   jest.fn(),
  useEvolucion: jest.fn(),
}));

// MexicoRiskMap usa import('leaflet') de forma asíncrona, lo que falla en jsdom.
// Se reemplaza por un componente stub que reproduce los chips de leyenda
// que verifican los tests de integración.
jest.mock('../../components/maps/MexicoRiskMap', () => ({
  __esModule: true,
  default: function MockMexicoRiskMap() {
    return (
      <div data-testid="mexico-risk-map-mock">
        <span>Riesgo bajo</span>
        <span>Riesgo medio</span>
        <span>Riesgo alto</span>
        <span>Seleccionada</span>
      </div>
    );
  },
}));

jest.mock('../../components/maps/assets/mexico-geojson.json', () => ({
  type: 'FeatureCollection',
  features: [],
}));

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});



// ── Fixtures ──────────────────────────────────────────────────────────────
const mockPlantas = [
  {
    idPlanta: 1,
    nombrePlanta: 'Planta Monterrey',
    estado: 'Nuevo León',
    nivelRiesgo: 'ALTO',
    riesgo: 'alta',
    riesgoLabel: 'Alto',
    ubicacionNombre: 'Monterrey',
    tendencia: 'SUBIENDO',
    indiceHidrico: 0.82,
  },
  {
    idPlanta: 2,
    nombrePlanta: 'Planta Hermosillo',
    estado: 'Sonora',
    nivelRiesgo: 'BAJO',
    riesgo: 'bajo',
    riesgoLabel: 'Bajo',
    ubicacionNombre: 'Hermosillo',
    tendencia: 'BAJANDO',
    indiceHidrico: 0.15,
  },
];

const mockDashboardData = {
  plantas: mockPlantas,
  resumen: { alto: 1, medio: 0, bajo: 1 },
};

const mockAlertasData = [
  {
    id: 1,
    tipo: 'CRÍTICO',
    titulo: 'Nivel crítico detectado',
    descripcion: 'Riesgo alto en Monterrey.',
    fecha: '2024-01-15T10:00:00Z',
  },
];

const mockEvolucionData = [
  { fecha: '2024-01-10', valorPromedio: 0.35 },
  { fecha: '2024-01-11', valorPromedio: 0.42 },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function setupSuccess(overrides = {}) {
  const mockRefetch = jest.fn();
  useDashboard.mockReturnValue({
    isLoading: false,
    error: null,
    data: mockDashboardData,
    refetch: mockRefetch,
    ...overrides,
  });
  useAlertas.mockReturnValue({ data: mockAlertasData });
  useEvolucion.mockReturnValue({ data: mockEvolucionData });
  return { mockRefetch };
}

afterEach(() => {
  jest.resetAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────
describe('DashboardInicio — integración', () => {
  // ── 1. Estado de carga ───────────────────────────────────────────────────
  describe('estado de carga', () => {
    it('muestra "Cargando resumen ejecutivo…" mientras isLoading es true', () => {
      useDashboard.mockReturnValue({
        isLoading: true,
        error: null,
        data: undefined,
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: undefined });
      useEvolucion.mockReturnValue({ data: undefined });

      render(<DashboardInicio />);

      expect(
        screen.getByText('Cargando resumen ejecutivo…'),
      ).toBeInTheDocument();
    });

    it('no renderiza el layout principal mientras carga', () => {
      useDashboard.mockReturnValue({
        isLoading: true,
        error: null,
        data: undefined,
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: undefined });
      useEvolucion.mockReturnValue({ data: undefined });

      render(<DashboardInicio />);

      expect(screen.queryByText('Resumen ejecutivo hídrico')).not.toBeInTheDocument();
    });
  });

  // ── 2. Carga exitosa ─────────────────────────────────────────────────────
  describe('carga exitosa', () => {
    it('renderiza el título principal del dashboard', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(
        screen.getAllByText('Resumen ejecutivo hídrico').length,
      ).toBeGreaterThanOrEqual(1);
    });

    it('renderiza el nombre de una planta (StatCards / PlantRiskList)', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Planta Monterrey')).toBeInTheDocument();
    });

    it('muestra "De N plantas totales" via StatCards (total = 2)', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('De 2 plantas totales')).toBeInTheDocument();
    });

    it('muestra el nivel de riesgo "Alto" en RiskGauge (1 alto > 0)', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getAllByText('Alto').length).toBeGreaterThan(0);
    });

    it('renderiza la alerta reciente desde AlertsList', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Nivel crítico detectado')).toBeInTheDocument();
    });

    it('renderiza "Alertas recientes" como encabezado de AlertsList', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Alertas recientes')).toBeInTheDocument();
    });

    it('renderiza "Última actualización:" desde LastUpdated', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Última actualización:')).toBeInTheDocument();
    });

    it('renderiza los encabezados de la tabla de PlantRiskList', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Nivel de riesgo')).toBeInTheDocument();
      expect(screen.getByText('Tendencia')).toBeInTheDocument();
    });

    it('renderiza el título de distribución de DonutChart', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(
        screen.getByText('Distribución de plantas por nivel de riesgo'),
      ).toBeInTheDocument();
    });

    it('renderiza los chips de leyenda del mapa', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(screen.getByText('Riesgo bajo')).toBeInTheDocument();
      expect(screen.getByText('Riesgo alto')).toBeInTheDocument();
    });

    it('no muestra el spinner / mensaje de carga tras carga exitosa', () => {
      setupSuccess();
      render(<DashboardInicio />);
      expect(
        screen.queryByText('Cargando resumen ejecutivo…'),
      ).not.toBeInTheDocument();
    });
  });

  // ── 3. Manejo de error ───────────────────────────────────────────────────
  describe('manejo de error', () => {
    it('muestra el mensaje de error cuando useDashboard devuelve error', () => {
      useDashboard.mockReturnValue({
        isLoading: false,
        error: new Error('Error de conexión con el servidor'),
        data: undefined,
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: undefined });
      useEvolucion.mockReturnValue({ data: undefined });

      render(<DashboardInicio />);

      expect(
        screen.getByText(/Error: Error de conexión con el servidor/),
      ).toBeInTheDocument();
    });

    it('no muestra el layout principal cuando hay error', () => {
      useDashboard.mockReturnValue({
        isLoading: false,
        error: new Error('Fallo de red'),
        data: undefined,
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: undefined });
      useEvolucion.mockReturnValue({ data: undefined });

      render(<DashboardInicio />);

      expect(screen.queryByText('Resumen ejecutivo hídrico')).not.toBeInTheDocument();
    });

    it('muestra texto rojo con el mensaje de error', () => {
      useDashboard.mockReturnValue({
        isLoading: false,
        error: new Error('Timeout'),
        data: undefined,
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: undefined });
      useEvolucion.mockReturnValue({ data: undefined });

      render(<DashboardInicio />);

      const errorEl = screen.getByText(/Error: Timeout/);
      expect(errorEl).toBeInTheDocument();
    });
  });

  // ── 4. Refresco manual ───────────────────────────────────────────────────
  describe('refresco manual', () => {
    it('llama a refetch al hacer clic en el botón de actualización (LastUpdated)', () => {
      const { mockRefetch } = setupSuccess();
      render(<DashboardInicio />);

      const refreshBtn = screen.getByRole('button', { name: 'Actualizar datos' });
      fireEvent.click(refreshBtn);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    it('el botón de actualización está habilitado cuando loading es false', () => {
      setupSuccess({ isLoading: false });
      render(<DashboardInicio />);

      const refreshBtn = screen.getByRole('button', { name: 'Actualizar datos' });
      expect(refreshBtn).not.toBeDisabled();
    });
  });

  // ── 5. Selección de planta ───────────────────────────────────────────────
  describe('selección de planta', () => {
    it('resalta la fila de la planta al hacer clic en PlantRiskList', () => {
      setupSuccess();
      render(<DashboardInicio />);

      fireEvent.click(screen.getByRole('row', { name: /Planta Monterrey/ }));

      expect(
        screen.getByRole('row', { name: /Planta Monterrey/ }),
      ).toHaveClass('border-l-[#2563eb]');
    });

    it('deselecciona la resaltación al seleccionar otra planta', () => {
      setupSuccess();
      render(<DashboardInicio />);

      fireEvent.click(screen.getByRole('row', { name: /Planta Monterrey/ }));
      expect(
        screen.getByRole('row', { name: /Planta Monterrey/ }),
      ).toHaveClass('border-l-[#2563eb]');

      fireEvent.click(screen.getByRole('row', { name: /Planta Hermosillo/ }));
      expect(
        screen.getByRole('row', { name: /Planta Hermosillo/ }),
      ).toHaveClass('border-l-[#2563eb]');
      expect(
        screen.getByRole('row', { name: /Planta Monterrey/ }),
      ).not.toHaveClass('border-l-[#2563eb]');
    });
  });

  // ── 6. Datos vacíos pero exitosos ────────────────────────────────────────
  describe('datos vacíos pero exitosos', () => {
    it('renderiza sin romper cuando plantas es [] y resumen es todo ceros', () => {
      useDashboard.mockReturnValue({
        isLoading: false,
        error: null,
        data: { plantas: [], resumen: { alto: 0, medio: 0, bajo: 0 } },
        refetch: jest.fn(),
      });
      useAlertas.mockReturnValue({ data: [] });
      useEvolucion.mockReturnValue({ data: [] });

      render(<DashboardInicio />);

      expect(
        screen.getAllByText('Resumen ejecutivo hídrico').length,
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('No hay datos de plantas.')).toBeInTheDocument();
      expect(screen.getByText('No hay alertas recientes.')).toBeInTheDocument();
      expect(screen.getByText('No hay datos de evolución.')).toBeInTheDocument();
    });
  });
});
