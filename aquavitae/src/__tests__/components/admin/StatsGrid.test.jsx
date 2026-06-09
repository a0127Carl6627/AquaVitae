import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsGrid from '../../../components/admin/StatsGrid';

const mockStats = [
  { title: 'Usuarios activos', value: 10, subtitle: 'De 12 registrados', icon: 'users' },
  { title: 'Roles definidos', value: 4, subtitle: 'Perfiles configurados', icon: 'roles' },
  { title: 'Permisos asignados', value: 25, subtitle: 'A módulos y datos', icon: 'permissions' },
  { title: 'Actividad reciente', value: 3, subtitle: 'Cambios en últimos 7 días', icon: 'activity' },
];

describe('StatsGrid', () => {
  it('renders the correct number of metric cards', () => {
    render(<StatsGrid stats={mockStats} />);
    expect(screen.getByText('Usuarios activos')).toBeInTheDocument();
    expect(screen.getByText('Roles definidos')).toBeInTheDocument();
    expect(screen.getByText('Permisos asignados')).toBeInTheDocument();
    expect(screen.getByText('Actividad reciente')).toBeInTheDocument();
  });

  it('renders the value of each card', () => {
    render(<StatsGrid stats={mockStats} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders the subtitle of each card', () => {
    render(<StatsGrid stats={mockStats} />);
    expect(screen.getByText('De 12 registrados')).toBeInTheDocument();
    expect(screen.getByText('Perfiles configurados')).toBeInTheDocument();
    expect(screen.getByText('A módulos y datos')).toBeInTheDocument();
    expect(screen.getByText('Cambios en últimos 7 días')).toBeInTheDocument();
  });

  it('renders an empty grid when stats is empty', () => {
    render(<StatsGrid stats={[]} />);
    expect(screen.queryByText('Usuarios activos')).not.toBeInTheDocument();
  });

  it('renders a single stat correctly', () => {
    render(<StatsGrid stats={[{ title: 'Solo', value: 99, subtitle: 'Sub', icon: 'users' }]} />);
    expect(screen.getByText('Solo')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });
});
