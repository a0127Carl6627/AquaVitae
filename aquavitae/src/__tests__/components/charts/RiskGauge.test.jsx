import React from 'react';
import { render, screen } from '@testing-library/react';
import RiskGauge from '../../../components/charts/RiskGauge';

describe('RiskGauge', () => {
  it('renderiza el título del componente', () => {
    render(<RiskGauge />);
    expect(screen.getByText('Riesgo hídrico general')).toBeInTheDocument();
  });

  it('muestra nivel "Bajo" y texto descriptivo en plural', () => {
    render(<RiskGauge nivel="bajo" regiones={2} />);
    expect(screen.getByText('Bajo')).toBeInTheDocument();
    expect(
      screen.getByText('El riesgo hídrico es bajo en 2 regiones.'),
    ).toBeInTheDocument();
  });

  it('muestra nivel "Medio"', () => {
    render(<RiskGauge nivel="medio" regiones={3} />);
    expect(screen.getByText('Medio')).toBeInTheDocument();
    expect(
      screen.getByText('El riesgo hídrico es medio en 3 regiones.'),
    ).toBeInTheDocument();
  });

  it('muestra nivel "Alto"', () => {
    render(<RiskGauge nivel="alto" regiones={4} />);
    expect(screen.getByText('Alto')).toBeInTheDocument();
    expect(
      screen.getByText('El riesgo hídrico es alto en 4 regiones.'),
    ).toBeInTheDocument();
  });

  it('usa "región" en singular cuando regiones === 1', () => {
    render(<RiskGauge nivel="alto" regiones={1} />);
    expect(
      screen.getByText('El riesgo hídrico es alto en 1 región.'),
    ).toBeInTheDocument();
  });

  it('usa "regiones" en plural cuando regiones > 1', () => {
    render(<RiskGauge nivel="bajo" regiones={5} />);
    expect(
      screen.getByText('El riesgo hídrico es bajo en 5 regiones.'),
    ).toBeInTheDocument();
  });

  it('fallback a "alto" cuando nivel es desconocido', () => {
    render(<RiskGauge nivel="desconocido" regiones={0} />);
    expect(screen.getByText('Alto')).toBeInTheDocument();
  });

  it('renderiza el SVG con aria-label apropiado', () => {
    render(<RiskGauge nivel="medio" />);
    expect(screen.getByLabelText('Riesgo medio')).toBeInTheDocument();
  });

  it('aria-label del SVG refleja el nivel recibido', () => {
    render(<RiskGauge nivel="bajo" />);
    expect(screen.getByLabelText('Riesgo bajo')).toBeInTheDocument();
  });

  it('renderiza con 0 regiones sin romper', () => {
    render(<RiskGauge nivel="bajo" regiones={0} />);
    expect(screen.getByText('Bajo')).toBeInTheDocument();
    expect(
      screen.getByText('El riesgo hídrico es bajo en 0 regiones.'),
    ).toBeInTheDocument();
  });
});
