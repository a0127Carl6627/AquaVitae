// SCRUM-234 · Pruebas unitarias (front) — TablaCostosUbicacion
import React from 'react';
import { render, screen } from '@testing-library/react';
import TablaCostosUbicacion from '../../../components/simulacion/TablaCostosUbicacion';

describe('TablaCostosUbicacion — unitarias', () => {
  const alternativas = [
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
  ];

  it('renderiza los encabezados de la tabla', () => {
    render(<TablaCostosUbicacion alternativas={alternativas} />);
    expect(screen.getByText('Ubicación')).toBeInTheDocument();
    expect(screen.getByText('Costo TOTAL')).toBeInTheDocument();
  });

  it('renderiza la fila con el nombre y el costo total de la alternativa', () => {
    render(<TablaCostosUbicacion alternativas={alternativas} />);
    // La celda muestra "{nombre}, {estado}" en un mismo nodo -> matcher flexible
    expect(screen.getByText(/Planta Saltillo/)).toBeInTheDocument();
    expect(screen.getByText('$130,000')).toBeInTheDocument();
  });
});
