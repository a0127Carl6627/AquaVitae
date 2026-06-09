import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsersTable from '../../../components/admin/UsersTable';

const mockUsuarios = {
  items: [
    {
      id: 1,
      nombreCompleto: 'Juan Pérez',
      correo: 'juan@test.com',
      nombreRol: 'Director',
      nombreRegion: 'Norte',
      activo: true,
      ultimoAcceso: '1 jun 2026, 2:00 p.m.',
    },
    {
      id: 2,
      nombreCompleto: 'Ana López',
      correo: 'ana@test.com',
      nombreRol: 'Analista',
      nombreRegion: null,
      activo: false,
      ultimoAcceso: null,
    },
  ],
  total: 2,
  page: 0,
  size: 5,
  totalPages: 1,
};

describe('UsersTable', () => {
  it('renders all user rows', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Ana López')).toBeInTheDocument();
    expect(screen.getByText('juan@test.com')).toBeInTheDocument();
    expect(screen.getByText('ana@test.com')).toBeInTheDocument();
  });

  it('renders role badges', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Analista')).toBeInTheDocument();
  });

  it('shows active and inactive status', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
    expect(screen.getByText('Inactivo')).toBeInTheDocument();
  });

  it('shows "—" for null ultimoAcceso and null nombreRegion', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThan(0);
  });

  it('shows loading spinner when loading=true', () => {
    render(<UsersTable usuarios={mockUsuarios} loading={true} />);
    expect(screen.getByText('Cargando usuarios…')).toBeInTheDocument();
  });

  it('shows empty state when no users', () => {
    const empty = { ...mockUsuarios, items: [], total: 0 };
    render(<UsersTable usuarios={empty} />);
    expect(screen.getByText('No hay usuarios registrados')).toBeInTheDocument();
  });

  it('shows "Sin resultados" when search returns no matches', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar usuario/), {
      target: { value: 'zzznomatch' },
    });
    expect(screen.getByText(/Sin resultados para "zzznomatch"/)).toBeInTheDocument();
  });

  it('filters users by name with search', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar usuario/), {
      target: { value: 'Juan' },
    });
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.queryByText('Ana López')).not.toBeInTheDocument();
  });

  it('filters users by email with search', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    fireEvent.change(screen.getByPlaceholderText(/Buscar usuario/), {
      target: { value: 'ana@' },
    });
    expect(screen.getByText('Ana López')).toBeInTheDocument();
    expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument();
  });

  it('calls onAgregar when clicking the Agregar button', () => {
    const onAgregar = jest.fn();
    render(<UsersTable usuarios={mockUsuarios} onAgregar={onAgregar} />);
    fireEvent.click(screen.getByText('Agregar usuario'));
    expect(onAgregar).toHaveBeenCalledTimes(1);
  });

  it('calls onEdit with the correct user when clicking Editar', () => {
    const onEdit = jest.fn();
    render(<UsersTable usuarios={mockUsuarios} onEdit={onEdit} />);
    fireEvent.click(screen.getAllByTitle('Editar')[0]);
    expect(onEdit).toHaveBeenCalledWith(mockUsuarios.items[0]);
  });

  it('calls onDelete with the correct user when clicking Eliminar', () => {
    const onDelete = jest.fn();
    render(<UsersTable usuarios={mockUsuarios} onDelete={onDelete} />);
    fireEvent.click(screen.getAllByTitle('Eliminar')[1]);
    expect(onDelete).toHaveBeenCalledWith(mockUsuarios.items[1]);
  });

  it('calls onPageChange with next page when clicking ›', () => {
    const multiPage = { ...mockUsuarios, total: 10, totalPages: 2 };
    const onPageChange = jest.fn();
    render(<UsersTable usuarios={multiPage} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('›'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('does not call onPageChange when prev is disabled (page 0)', () => {
    const onPageChange = jest.fn();
    render(<UsersTable usuarios={mockUsuarios} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('‹'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('calls onPageChange with prev page when clicking ‹', () => {
    const onPageChange = jest.fn();
    const page1 = { ...mockUsuarios, page: 1, totalPages: 2, total: 10 };
    render(<UsersTable usuarios={page1} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('‹'));
    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('shows total count in pagination footer', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    expect(screen.getByText(/Mostrando 1 a 2 de 2 usuarios/)).toBeInTheDocument();
  });

  it('shows "Sin usuarios" when total is 0', () => {
    const empty = { ...mockUsuarios, items: [], total: 0 };
    render(<UsersTable usuarios={empty} />);
    expect(screen.getByText('Sin usuarios')).toBeInTheDocument();
  });

  it('renders initials avatar from user name', () => {
    render(<UsersTable usuarios={mockUsuarios} />);
    expect(screen.getByText('JP')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });
});
