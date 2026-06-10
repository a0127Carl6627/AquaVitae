import React from 'react';
import { render, screen } from '@testing-library/react';
import AlertsList from '../../../components/dashboard/AlertsList';

const alerta1 = {
  id: 1,
  tipo: 'CRÍTICO',
  titulo: 'Nivel crítico detectado',
  descripcion: 'La planta supera el umbral crítico.',
  hora: '10:00 a.m.',
  fecha: '2024-01-15T10:00:00Z',
};

const alerta2 = {
  id: 2,
  tipo: 'ADVERTENCIA',
  titulo: 'Seguimiento requerido',
  descripcion: 'Planta en nivel medio de riesgo.',
  hora: '08:00 a.m.',
  fecha: '2024-01-14T08:00:00Z',
};

const alerta3 = {
  id: 3,
  tipo: 'INFORMATIVO',
  titulo: 'Estado normal reportado',
  descripcion: 'Sin novedades en planta Guadalajara.',
  hora: '06:00 a.m.',
  fecha: '2024-01-13T06:00:00Z',
};

const alerta4 = {
  id: 4,
  tipo: 'CRÍTICO',
  titulo: 'Alerta que no debe aparecer',
  descripcion: 'Esta es la cuarta alerta; no debe renderizarse.',
  hora: '04:00 a.m.',
  fecha: '2024-01-12T04:00:00Z',
};

describe('AlertsList', () => {
  it('muestra "No hay alertas recientes." cuando alerts es []', () => {
    render(<AlertsList alerts={[]} />);
    expect(screen.getByText('No hay alertas recientes.')).toBeInTheDocument();
  });

  it('muestra "No hay alertas recientes." cuando alerts no se proporciona', () => {
    render(<AlertsList />);
    expect(screen.getByText('No hay alertas recientes.')).toBeInTheDocument();
  });

  it('renderiza el encabezado "Alertas recientes" cuando hay datos', () => {
    render(<AlertsList alerts={[alerta1]} />);
    expect(screen.getByText('Alertas recientes')).toBeInTheDocument();
  });

  it('muestra el título de la alerta', () => {
    render(<AlertsList alerts={[alerta1]} />);
    expect(screen.getByText('Nivel crítico detectado')).toBeInTheDocument();
  });

  it('muestra la descripción de la alerta', () => {
    render(<AlertsList alerts={[alerta1]} />);
    expect(screen.getByText('La planta supera el umbral crítico.')).toBeInTheDocument();
  });

  it('muestra la hora formateada de la alerta', () => {
    render(<AlertsList alerts={[alerta1]} />);
    expect(screen.getByText('10:00 a.m.')).toBeInTheDocument();
  });

  it('muestra como máximo 3 alertas aunque se proporcionen más', () => {
    render(<AlertsList alerts={[alerta1, alerta2, alerta3, alerta4]} />);
    expect(screen.queryByText('Alerta que no debe aparecer')).not.toBeInTheDocument();
    expect(screen.getByText('Nivel crítico detectado')).toBeInTheDocument();
    expect(screen.getByText('Seguimiento requerido')).toBeInTheDocument();
    expect(screen.getByText('Estado normal reportado')).toBeInTheDocument();
  });

  it('ordena las alertas de más reciente a más antigua', () => {
    // Proporcionar en orden inverso para verificar el sort
    const invertidas = [alerta3, alerta2, alerta1];
    render(<AlertsList alerts={invertidas} />);

    const items = screen.getAllByText(/detectado|requerido|reportado/);
    // La más reciente (alerta1, Jan 15) debe aparecer primero en el DOM
    expect(items[0].textContent).toMatch(/detectado/);
    expect(items[1].textContent).toMatch(/requerido/);
    expect(items[2].textContent).toMatch(/reportado/);
  });

  it('renderiza una sola alerta correctamente', () => {
    render(<AlertsList alerts={[alerta2]} />);
    expect(screen.getByText('Seguimiento requerido')).toBeInTheDocument();
    expect(screen.queryByText('No hay alertas recientes.')).not.toBeInTheDocument();
  });

  it('renderiza hasta 3 alertas de tipos distintos (CRÍTICO, ADVERTENCIA, INFORMATIVO)', () => {
    render(<AlertsList alerts={[alerta1, alerta2, alerta3]} />);
    expect(screen.getByText('Nivel crítico detectado')).toBeInTheDocument();
    expect(screen.getByText('Seguimiento requerido')).toBeInTheDocument();
    expect(screen.getByText('Estado normal reportado')).toBeInTheDocument();
  });
});
