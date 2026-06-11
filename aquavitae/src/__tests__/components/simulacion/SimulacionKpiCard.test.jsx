// SCRUM-227 · Pruebas unitarias (front) — SimulacionKpiCard
import React from 'react';
import { render, screen } from '@testing-library/react';
import SimulacionKpiCard from '../../../components/simulacion/SimulacionKpiCard';

describe('SimulacionKpiCard — unitarias', () => {
  it('renderiza label, value y sublabel', () => {
    render(
      <SimulacionKpiCard label="Índice hídrico actual" value="72%" sublabel="Nivel de estrés" color="red" />
    );
    expect(screen.getByText('Índice hídrico actual')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('Nivel de estrés')).toBeInTheDocument();
  });

  it('no renderiza el sublabel cuando viene vacío', () => {
    render(<SimulacionKpiCard label="KPI" value="10" sublabel="" />);
    expect(screen.getByText('KPI')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('Nivel de estrés')).not.toBeInTheDocument();
  });

  it('usa los valores por defecto cuando no se pasan props', () => {
    render(<SimulacionKpiCard />);
    expect(screen.getByText('Índice hídrico actual')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });
});
