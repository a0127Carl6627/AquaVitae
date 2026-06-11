// SCRUM-234 · Pruebas unitarias (front) — FactoresClave
import React from 'react';
import { render, screen } from '@testing-library/react';
import FactoresClave from '../../../components/ui/FactoresClave';

describe('FactoresClave — unitarias', () => {
  const factores = [
    { nombre: 'Disponibilidad de agua', icon: 'water', puntos: 4, color: '#2ea36b' },
    { nombre: 'Costo operativo', icon: 'money', puntos: 3, color: '#e89923' },
  ];

  it('renderiza el título recibido', () => {
    render(<FactoresClave titulo="Para Planta Monterrey" factores={factores} />);
    expect(screen.getByText('Para Planta Monterrey')).toBeInTheDocument();
  });

  it('renderiza el nombre de cada factor', () => {
    render(<FactoresClave factores={factores} />);
    expect(screen.getByText('Disponibilidad de agua')).toBeInTheDocument();
    expect(screen.getByText('Costo operativo')).toBeInTheDocument();
  });

  it('usa el título por defecto y no rompe con lista vacía', () => {
    render(<FactoresClave factores={[]} />);
    expect(screen.getByText('Para la ubicación seleccionada')).toBeInTheDocument();
  });
});
