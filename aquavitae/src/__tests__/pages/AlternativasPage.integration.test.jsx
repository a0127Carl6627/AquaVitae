/**
 * SCRUM-236 · Prueba de integración (front) para AlternativasPage.
 * Mismo enfoque que DashboardInicio.integration: hooks mockeados a nivel de
 * módulo, mapa mockeado (Leaflet falla en jsdom) y ResizeObserver global.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AlternativasPage from '../../pages/AlternativasPage';

import {
  useDashboard,
  useAlerta,
  useAlternativas,
  useFactores,
  useProyeccion,
  useKpis,
} from '../../hooks/useAquavitaeQueries';

jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useDashboard: jest.fn(),
  useAlerta: jest.fn(),
  useAlternativas: jest.fn(),
  useFactores: jest.fn(),
  useProyeccion: jest.fn(),
  useKpis: jest.fn(),
}));

jest.mock('../../components/maps/MapaAlternativas', () => ({
  __esModule: true,
  default: function MockMapaAlternativas() {
    return <div data-testid="mapa-alternativas-mock">Mapa</div>;
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
        { id: 1, nombre: 'Planta Monterrey Norte', nivelRiesgo: 'ALTO', estado: 'Nuevo León', latitud: 25.68, longitud: -100.31, indiceHidrico: 0.85 },
      ],
      resumen: { alto: 1, medio: 0, bajo: 0 },
    },
    isLoading: false,
    error: null,
  });

  // Forma TRANSFORMADA que devuelve el hook (fetchAlerta): incluye strings formateados
  useAlerta.mockReturnValue({
    data: {
      nombrePlanta: 'Planta Monterrey Norte',
      indiceActual: 0.85,
      estresActual: 85,
      costoAperturaStr: '$120,000',
      costoOperacionStr: '$45,000',
      diasAperturaStr: '30–60',
      diasCierreRecomendado: 5,
    },
    isLoading: false,
  });

  // Forma TRANSFORMADA que devuelve el hook (fetchAlternativas): costos como strings
  useAlternativas.mockReturnValue({
    data: [
      {
        nombre: 'Planta Saltillo',
        estado: 'Coahuila',
        riesgo: 'baja',
        riesgoLabel: 'Riesgo bajo',
        costoCierre: '$50,000',
        tiempoCierre: '15 días',
        costoApertura: '$80,000',
        tiempoApertura: '30–45 días',
        costoTotal: '$130,000',
        recommended: true,
      },
    ],
    isLoading: false,
  });

  useFactores.mockReturnValue({
    data: [
      { nombre: 'Disponibilidad de agua', icon: 'water', puntos: 4, color: '#2ea36b' },
    ],
    isLoading: false,
  });

  useProyeccion.mockReturnValue({
    data: { data: [{ dia: 1, valor: 0.5 }, { dia: 90, valor: 0.72 }], startDay: 1, peakDay: 90, peakValue: 0.72 },
    isLoading: false,
  });

  useKpis.mockReturnValue({
    data: { indiceHidricoActual: 0.72, diasHastaUmbralCritico: 12, probabilidadEventoCritico: 0.4, perdidaEconomicaProyectada: 1500000 },
    isLoading: false,
  });
});

describe('AlternativasPage — integración', () => {
  it('muestra el título de la pantalla', () => {
    render(<AlternativasPage />);
    expect(screen.getByText('Alternativas de ubicación')).toBeInTheDocument();
  });

  it('integra la tabla de ubicaciones alternativas', () => {
    render(<AlternativasPage />);
    expect(screen.getByText(/Saltillo/)).toBeInTheDocument();
  });

  it('integra los factores de evaluación', () => {
    render(<AlternativasPage />);
    expect(screen.getByText('Disponibilidad de agua')).toBeInTheDocument();
  });

  it('renderiza el mapa de alternativas (mock)', () => {
    render(<AlternativasPage />);
    expect(screen.getByTestId('mapa-alternativas-mock')).toBeInTheDocument();
  });
});
