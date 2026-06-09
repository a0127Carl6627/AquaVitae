import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GestionUsuariosPage from '../../pages/GestionUsuariosPage';
import {
  useResumenUsuarios,
  useUsuarios,
  useRoles,
  usePlantas,
  useCrearUsuario,
  useEditarUsuario,
  useEliminarUsuario,
} from '../../hooks/useAquavitaeQueries';
import { crearUsuario, generarContrasena } from '../../services/aquavitaeApi';

jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useResumenUsuarios: jest.fn(),
  useUsuarios: jest.fn(),
  useRoles: jest.fn(),
  usePlantas: jest.fn(),
  useCrearUsuario: jest.fn(),
  useEditarUsuario: jest.fn(),
  useEliminarUsuario: jest.fn(),
}));

jest.mock('../../services/aquavitaeApi', () => ({
  crearUsuario: jest.fn(),
  editarUsuario: jest.fn(),
  eliminarUsuario: jest.fn(),
  generarContrasena: jest.fn().mockResolvedValue('MockPass123!'),
}));


const mockResumen = {
  usuariosActivos: 3,
  totalUsuarios: 4,
  rolesDefinidos: 5,
  permisosAsignados: 20,
  actividadReciente: 2,
};

const mockUsuariosData = {
  items: [
    { id: 1, nombreCompleto: 'Juan Pérez', correo: 'juan@test.com', nombreRol: 'Director', activo: true, ultimoAcceso: null },
    { id: 2, nombreCompleto: 'Ana López', correo: 'ana@test.com', nombreRol: 'Analista', activo: true, ultimoAcceso: null },
  ],
  total: 2,
  page: 0,
  size: 5,
  totalPages: 1,
};

const mockRoles = [
  { id: 1, nombre: 'Administrador', descripcion: 'Admin', cantidadPermisos: 8, permisos: [] },
  { id: 2, nombre: 'Director', descripcion: 'Dir', cantidadPermisos: 7, permisos: [] },
];

const mockPlantas = [{ id: 1, nombre: 'Planta A' }];

function setupMocks({ loading = false } = {}) {
  const refetch = jest.fn();
  const mutateAsync = jest.fn().mockResolvedValue({});

  useResumenUsuarios.mockReturnValue({ data: loading ? undefined : mockResumen, isLoading: loading, error: null });
  useUsuarios.mockReturnValue({ data: loading ? undefined : mockUsuariosData, isLoading: loading, refetch });
  useRoles.mockReturnValue({ data: loading ? undefined : mockRoles, isLoading: loading });
  usePlantas.mockReturnValue({ data: mockPlantas });
  useCrearUsuario.mockReturnValue({ mutateAsync });
  useEditarUsuario.mockReturnValue({ mutateAsync });
  useEliminarUsuario.mockReturnValue({ mutateAsync });

  return { refetch, mutateAsync };
}

describe('GestionUsuariosPage (integración)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    generarContrasena.mockResolvedValue('MockPass123!');
  });

  describe('Estado de carga', () => {
    it('muestra "Cargando datos..." cuando loading=true y no hay items', () => {
      setupMocks({ loading: true });
      render(<GestionUsuariosPage />);
      expect(screen.getByText('Cargando datos...')).toBeInTheDocument();
    });

    it('no muestra el spinner cuando hay datos', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      expect(screen.queryByText('Cargando datos...')).not.toBeInTheDocument();
    });
  });

  describe('Renderizado de datos', () => {
    it('renderiza StatsGrid con los valores del resumen', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      expect(screen.getByText('Usuarios activos')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Roles definidos')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renderiza UsersTable con los usuarios', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
      expect(screen.getByText('Ana López')).toBeInTheDocument();
    });

    it('renderiza PermissionsMatrix', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      expect(screen.getByText('Detalle de permisos por módulo')).toBeInTheDocument();
    });

    it('muestra mensaje de error cuando resumenError existe', () => {
      useResumenUsuarios.mockReturnValue({ data: null, isLoading: false, error: { message: 'Error de red' } });
      useUsuarios.mockReturnValue({ data: mockUsuariosData, isLoading: false, refetch: jest.fn() });
      useRoles.mockReturnValue({ data: mockRoles, isLoading: false });
      usePlantas.mockReturnValue({ data: mockPlantas });
      useCrearUsuario.mockReturnValue({ mutateAsync: jest.fn() });
      useEditarUsuario.mockReturnValue({ mutateAsync: jest.fn() });
      useEliminarUsuario.mockReturnValue({ mutateAsync: jest.fn() });

      render(<GestionUsuariosPage />);
      expect(screen.getByText(/Error: Error de red/)).toBeInTheDocument();
    });
  });

  describe('Modal de agregar usuario', () => {
    it('abre NewUserModal al hacer clic en Agregar', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getByText('Agregar usuario'));
      expect(screen.getByText('Agregar nuevo usuario')).toBeInTheDocument();
    });

    it('cierra NewUserModal al hacer clic en Cancelar', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getByText('Agregar usuario'));
      fireEvent.click(screen.getByText('Cancelar'));
      expect(screen.queryByText('Agregar nuevo usuario')).not.toBeInTheDocument();
    });

    it('cierra el modal y llama a refetch al guardar usuario nuevo', async () => {
      crearUsuario.mockResolvedValue({});
      const { refetch } = setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getByText('Agregar usuario'));

      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: 'password123' },
      });
      // getAllByRole('combobox')[1]: index 0 is the "per page" select in UsersTable
      fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: '1' } });
      fireEvent.click(screen.getByText('Guardar usuario'));

      await waitFor(() => expect(refetch).toHaveBeenCalled());
      await waitFor(() =>
        expect(screen.queryByText('Agregar nuevo usuario')).not.toBeInTheDocument()
      );
    });
  });

  describe('Modal de editar usuario', () => {
    it('abre EditUserModal al hacer clic en Editar', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Editar')[0]);
      // getByRole('heading') targets the h1 specifically, avoiding the breadcrumb <span>
      expect(screen.getByRole('heading', { name: 'Editar usuario' })).toBeInTheDocument();
    });

    it('cierra EditUserModal al hacer clic en Cancelar', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Editar')[0]);
      fireEvent.click(screen.getByText('Cancelar'));
      expect(screen.queryByText('Editar usuario')).not.toBeInTheDocument();
    });
  });

  describe('Modal de eliminar usuario', () => {
    it('abre ModalDeleteUser al hacer clic en Eliminar', () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Eliminar')[0]);
      expect(screen.getByText('¿Eliminar usuario?')).toBeInTheDocument();
    });

    it('llama a mutateAsync con el id del usuario al confirmar eliminación', async () => {
      const { mutateAsync } = setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Eliminar')[0]);
      fireEvent.click(screen.getByText('Eliminar usuario'));

      await waitFor(() => {
        expect(mutateAsync).toHaveBeenCalledWith(1);
      });
    });

    it('cierra el modal después de confirmar eliminación', async () => {
      setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Eliminar')[0]);
      fireEvent.click(screen.getByText('Eliminar usuario'));

      await waitFor(() => {
        expect(screen.queryByText('¿Eliminar usuario?')).not.toBeInTheDocument();
      });
    });

    it('cierra el modal sin eliminar al cancelar', () => {
      const { mutateAsync } = setupMocks();
      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getAllByTitle('Eliminar')[0]);
      fireEvent.click(screen.getByText('Cancelar'));
      expect(screen.queryByText('¿Eliminar usuario?')).not.toBeInTheDocument();
      expect(mutateAsync).not.toHaveBeenCalled();
    });
  });

  describe('Paginación', () => {
    it('llama a useUsuarios con page=1 al hacer clic en siguiente página', () => {
      const multiPage = { ...mockUsuariosData, total: 10, totalPages: 2 };
      useResumenUsuarios.mockReturnValue({ data: mockResumen, isLoading: false, error: null });
      useUsuarios.mockReturnValue({ data: multiPage, isLoading: false, refetch: jest.fn() });
      useRoles.mockReturnValue({ data: mockRoles, isLoading: false });
      usePlantas.mockReturnValue({ data: mockPlantas });
      useCrearUsuario.mockReturnValue({ mutateAsync: jest.fn() });
      useEditarUsuario.mockReturnValue({ mutateAsync: jest.fn() });
      useEliminarUsuario.mockReturnValue({ mutateAsync: jest.fn() });

      render(<GestionUsuariosPage />);
      fireEvent.click(screen.getByText('›'));
      expect(useUsuarios).toHaveBeenCalledWith(1, 5);
    });
  });
});
