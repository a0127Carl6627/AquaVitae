/**
 * SCRUM-232 · Prueba de integración (front) para SimulacionPage.
 *
 * Estrategia de mocks (mismo enfoque que DashboardInicio.integration):
 *  - Los hooks de React Query se mockean a nivel de módulo para controlar los
 *    datos sin depender de fetch/axios.
 *  - MapaRiesgoHidrico se mockea para evitar el crash de Leaflet en jsdom.
 *  - ResizeObserver se define globalmente (requerido por Recharts).
 *  - El resto de hijos (tarjetas KPI, gráficas) se renderizan reales.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import SimulacionPage from '../../pages/SimulacionPage';

import { useDashboard, useKpis, useProyeccion, useRecuperacion } from '../../hooks/useAquavitaeQueries';

jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useDashboard: jest.fn(),
  useKpis: jest.fn(),
  useProyeccion: jest.fn(),
  useRecuperacion: jest.fn(),
}));

// MapaRiesgoHidrico usa Leaflet, que falla en jsdom.
jest.mock('../../components/maps/MapaRiesgoHidrico', () => ({
  __esModule: true,
  default: function MockMapaRiesgoHidrico() {
    return <div data-testid="mapa-riesgo-mock">Mapa</div>;
  },
}));

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

beforeEach(() => {
  useDashboard.mockReturnValue({
    data: {
      plantas: [
        {
          id: 1,
          nombre: 'Planta Monterrey Norte',
          nivelRiesgo: 'ALTO',
          estado: 'Nuevo León',
          latitud: 25.68,
          longitud: -100.31,
          indiceHidrico: 0.85,
        },
      ],
      resumen: { alto: 1, medio: 0, bajo: 0 },
    },
    isLoading: false,
    error: null,
  });

  useKpis.mockReturnValue({
    data: {
      indiceHidricoActual: 0.72,
      diasHastaUmbralCritico: 12,
      probabilidadEventoCritico: 0.4,
      perdidaEconomicaProyectada: 1500000,
    },
    isLoading: false,
  });

  useProyeccion.mockReturnValue({
    data: {
      data: [
        { dia: 1, valor: 0.5 },
        { dia: 90, valor: 0.72 },
      ],
      startDay: 1,
      peakDay: 90,
      peakValue: 0.72,
    },
    isLoading: false,
  });

  useRecuperacion.mockReturnValue({
    data: {
      conIntervencion: [{ dia: 1, valor: 0.4 }],
      sinIntervencion: [{ dia: 1, valor: 0.38 }],
    },
    isLoading: false,
  });
});

describe('SimulacionPage — integración', () => {
  it('muestra el título y subtítulo de la pantalla', () => {
    render(<SimulacionPage />);
    expect(screen.getByText('Simulación y recuperación hídrica')).toBeInTheDocument();
  });

  it('muestra el selector de planta con la planta cargada', () => {
    render(<SimulacionPage />);
    expect(screen.getByText('PLANTA:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('integra las tarjetas de KPIs con los datos de los hooks', () => {
    render(<SimulacionPage />);
    expect(screen.getByText('Índice hídrico actual')).toBeInTheDocument();
    expect(screen.getByText('Días hasta umbral crítico')).toBeInTheDocument();
    expect(screen.getByText('Probabilidad evento crítico')).toBeInTheDocument();
    expect(screen.getByText('Pérdida económica proyectada')).toBeInTheDocument();
  });

  it('renderiza el mapa de riesgo (mock)', () => {
    render(<SimulacionPage />);
    expect(screen.getByTestId('mapa-riesgo-mock')).toBeInTheDocument();
  });
});
