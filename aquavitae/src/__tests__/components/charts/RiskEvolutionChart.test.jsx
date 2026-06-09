import React from 'react';
import { render, screen } from '@testing-library/react';
import RiskEvolutionChart from '../../../components/charts/RiskEvolutionChart';

const dataVerde = [
  { fecha: '10 Ene', valorPromedio: 10.0 },
  { fecha: '11 Ene', valorPromedio: 15.0 },
  { fecha: '12 Ene', valorPromedio: 12.0 },
];

const dataAmbar = [
  { fecha: '10 Ene', valorPromedio: 40.0 },
  { fecha: '11 Ene', valorPromedio: 45.0 },
];

const dataRoja = [
  { fecha: '10 Ene', valorPromedio: 65.0 },
  { fecha: '11 Ene', valorPromedio: 70.0 },
];

describe('RiskEvolutionChart', () => {
  it('muestra mensaje vacío cuando data es []', () => {
    render(<RiskEvolutionChart data={[]} />);
    expect(screen.getByText('No hay datos de evolución.')).toBeInTheDocument();
  });

  it('muestra mensaje vacío cuando data no se proporciona', () => {
    render(<RiskEvolutionChart />);
    expect(screen.getByText('No hay datos de evolución.')).toBeInTheDocument();
  });

  it('renderiza sin romper con datos en rango verde (maxPercent ≤ 30)', () => {
    render(<RiskEvolutionChart data={dataVerde} />);
    expect(screen.queryByText('No hay datos de evolución.')).not.toBeInTheDocument();
  });

  it('renderiza sin romper con datos en rango ámbar (maxPercent 30-60)', () => {
    render(<RiskEvolutionChart data={dataAmbar} />);
    expect(screen.queryByText('No hay datos de evolución.')).not.toBeInTheDocument();
  });

  it('renderiza sin romper con datos en rango rojo (maxPercent > 60)', () => {
    render(<RiskEvolutionChart data={dataRoja} />);
    expect(screen.queryByText('No hay datos de evolución.')).not.toBeInTheDocument();
  });

  it('el componente renderiza su contenido principal cuando hay datos', () => {
    render(<RiskEvolutionChart data={dataVerde} />);
    // El SVG del gráfico es renderizado (no el mensaje de vacío)
    expect(screen.queryByText('No hay datos de evolución.')).not.toBeInTheDocument();
  });

  it('renderiza con un único punto de datos sin romper', () => {
    render(<RiskEvolutionChart data={[{ fecha: '10 Ene', valorPromedio: 50.0 }]} />);
    expect(screen.queryByText('No hay datos de evolución.')).not.toBeInTheDocument();
  });
});
