import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCards from '../../../components/dashboard/StatCards';

describe('StatCards', () => {
  it('renderiza las 4 etiquetas de tarjeta con props por defecto', () => {
    render(<StatCards />);
    expect(screen.getByText('Crisis activas')).toBeInTheDocument();
    expect(screen.getByText('Plantas en riesgo alto')).toBeInTheDocument();
    expect(screen.getByText('Plantas en riesgo medio')).toBeInTheDocument();
    expect(screen.getByText('Plantas en riesgo bajo')).toBeInTheDocument();
  });

  it('muestra los sublabels estáticos correctos', () => {
    render(<StatCards />);
    expect(screen.getByText('Requieren atención inmediata')).toBeInTheDocument();
    expect(screen.getByText('Requieren seguimiento')).toBeInTheDocument();
    expect(screen.getByText('Condiciones normales')).toBeInTheDocument();
  });

  it('muestra "De N plantas totales" con el totalPlantas recibido', () => {
    render(<StatCards totalPlantas={20} />);
    expect(screen.getByText('De 20 plantas totales')).toBeInTheDocument();
  });

  it('muestra el valor de crisisActivas proporcionado', () => {
    render(<StatCards crisisActivas={7} plantasAltoRiesgo={0} plantasMedioRiesgo={0} plantasBajoRiesgo={0} />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('muestra valores individuales por tarjeta', () => {
    render(
      <StatCards
        crisisActivas={1}
        plantasAltoRiesgo={2}
        plantasMedioRiesgo={3}
        plantasBajoRiesgo={4}
        totalPlantas={9}
      />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renderiza correctamente cuando todos los valores son 0', () => {
    render(
      <StatCards
        crisisActivas={0}
        plantasAltoRiesgo={0}
        plantasMedioRiesgo={0}
        plantasBajoRiesgo={0}
        totalPlantas={0}
      />,
    );
    // Cuatro tarjetas deben mostrar el número 0
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(4);
    expect(screen.getByText('De 0 plantas totales')).toBeInTheDocument();
  });

});
