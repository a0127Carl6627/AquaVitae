import React from 'react';
import { render, screen } from '@testing-library/react';
import DonutChart from '../../../components/charts/DonutChart';

describe('DonutChart', () => {
  it('renderiza el título del gráfico', () => {
    render(<DonutChart />);
    expect(
      screen.getByText('Distribución de plantas por nivel de riesgo'),
    ).toBeInTheDocument();
  });

  it('muestra las tres etiquetas de la leyenda', () => {
    render(<DonutChart alto={1} medio={2} bajo={3} />);
    expect(screen.getByText('Alto')).toBeInTheDocument();
    expect(screen.getByText('Medio')).toBeInTheDocument();
    expect(screen.getByText('Bajo')).toBeInTheDocument();
  });

  it('muestra el total correcto en el centro del SVG', () => {
    render(<DonutChart alto={2} medio={4} bajo={6} />);
    // total = 12; aparece como texto SVG
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('calcula y muestra los porcentajes de la leyenda', () => {
    // alto=1, medio=1, bajo=2 → total=4; 25.0%, 25.0%, 50.0%
    render(<DonutChart alto={1} medio={1} bajo={2} />);
    expect(screen.getAllByText('1 (25.0%)').length).toBe(2);
    expect(screen.getByText('2 (50.0%)')).toBeInTheDocument();
  });

  it('muestra porcentaje 0.0% para segmentos vacíos cuando el total es positivo', () => {
    render(<DonutChart alto={0} medio={0} bajo={4} />);
    expect(screen.getAllByText('0 (0.0%)').length).toBe(2);
    expect(screen.getByText('4 (100.0%)')).toBeInTheDocument();
  });

  it('no rompe cuando total es 0', () => {
    render(<DonutChart alto={0} medio={0} bajo={0} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    // Los 3 segmentos muestran "0 (0.0%)"
    expect(screen.getAllByText('0 (0.0%)').length).toBe(3);
  });

  it('renderiza el SVG con aria-label', () => {
    render(<DonutChart />);
    expect(screen.getByLabelText('Distribución de plantas')).toBeInTheDocument();
  });

  it('renderiza con props por defecto sin errores', () => {
    render(<DonutChart />);
    // Valores por defecto: alto=2, medio=4, bajo=6 → total=12
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
