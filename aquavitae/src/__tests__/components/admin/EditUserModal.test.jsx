import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import EditUserModal from '../../../components/admin/EditUserModal';
import { editarUsuario } from '../../../services/aquavitaeApi';

jest.mock('../../../services/aquavitaeApi', () => ({
  editarUsuario: jest.fn(),
}));

const roles = [
  { id: 1, nombre: 'Administrador', descripcion: 'Acceso total', cantidadPermisos: 8, permisos: [] },
  { id: 2, nombre: 'Director', descripcion: 'Acceso director', cantidadPermisos: 7, permisos: [] },
  { id: 3, nombre: 'Operador', descripcion: 'Acceso mínimo', cantidadPermisos: 2, permisos: [] },
];

const mockUsuario = {
  id: 10,
  nombre: 'María',
  apellido: 'González',
  correo: 'maria@test.com',
  telefono: '8180001234',
  activo: true,
  idRol: 2,
  modulosEfectivos: ['Resumen', 'Plantas', 'Riesgos'],
};

const defaultProps = {
  isOpen: true,
  usuario: mockUsuario,
  roles,
  plantas: [],
  onClose: jest.fn(),
  onSave: jest.fn(),
};

describe('EditUserModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Visibility', () => {
    it('returns null when isOpen=false', () => {
      const { container } = render(<EditUserModal {...defaultProps} isOpen={false} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('returns null when usuario is null', () => {
      const { container } = render(<EditUserModal {...defaultProps} usuario={null} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders the modal when isOpen=true and usuario is provided', () => {
      render(<EditUserModal {...defaultProps} />);
      expect(screen.getByRole('heading', { name: 'Editar usuario' })).toBeInTheDocument();
    });
  });

  describe('Initial data', () => {
    it('pre-fills form with usuario data', () => {
      render(<EditUserModal {...defaultProps} />);
      expect(screen.getByDisplayValue('María González')).toBeInTheDocument();
      expect(screen.getByDisplayValue('maria@test.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('8180001234')).toBeInTheDocument();
    });

    it('pre-selects modulosEfectivos as active permissions', () => {
      render(<EditUserModal {...defaultProps} />);
      const checked = screen.getAllByRole('checkbox', { checked: true });
      expect(checked).toHaveLength(3); // Resumen, Plantas, Riesgos
    });

    it('uses PERMISOS_DEFAULT_POR_ROL when modulosEfectivos is empty', () => {
      const u = { ...mockUsuario, modulosEfectivos: [], idRol: 3 };
      render(<EditUserModal {...defaultProps} usuario={u} />);
      const checked = screen.getAllByRole('checkbox', { checked: true });
      expect(checked).toHaveLength(2); // Operador: Resumen + Plantas
    });

    it('shows current role selected in dropdown', () => {
      render(<EditUserModal {...defaultProps} />);
      // getAllByRole('combobox')[1] because index 0 is the Estado select
      expect(screen.getAllByRole('combobox')[1]).toHaveValue('2');
    });
  });

  describe('Permissions', () => {
    it('updates permissions when role changes', () => {
      render(<EditUserModal {...defaultProps} />);
      fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: '3' } });
      const checked = screen.getAllByRole('checkbox', { checked: true });
      expect(checked).toHaveLength(2); // Operador: Resumen + Plantas
    });

    it('sets all 8 permissions for Administrador', () => {
      render(<EditUserModal {...defaultProps} />);
      fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: '1' } });
      screen.getAllByRole('checkbox').forEach(cb => expect(cb).toBeChecked());
    });

    it('toggles a permission checkbox on and off', () => {
      render(<EditUserModal {...defaultProps} />);
      const firstChecked = screen.getAllByRole('checkbox', { checked: true })[0];
      fireEvent.click(firstChecked);
      expect(firstChecked).not.toBeChecked();
      fireEvent.click(firstChecked);
      expect(firstChecked).toBeChecked();
    });
  });

  describe('Password change', () => {
    it('shows password input when clicking Cambiar contraseña', () => {
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Cambiar contraseña'));
      expect(screen.getByPlaceholderText('Nueva contraseña')).toBeInTheDocument();
    });

    it('hides password input when clicking the toggle Cancelar', () => {
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Cambiar contraseña'));
      fireEvent.click(screen.getAllByText('Cancelar')[0]);
      expect(screen.queryByPlaceholderText('Nueva contraseña')).not.toBeInTheDocument();
    });

    it('includes nuevaContrasena in DTO when password is changed', async () => {
      editarUsuario.mockResolvedValue({});
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Cambiar contraseña'));
      fireEvent.change(screen.getByPlaceholderText('Nueva contraseña'), {
        target: { value: 'newpass123' },
      });
      fireEvent.click(screen.getByText(/Guardar cambios/));
      await waitFor(() =>
        expect(editarUsuario).toHaveBeenCalledWith(
          10,
          expect.objectContaining({ nuevaContrasena: 'newpass123' })
        )
      );
    });

    it('does not include nuevaContrasena when password toggle is hidden', async () => {
      editarUsuario.mockResolvedValue({});
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText(/Guardar cambios/));
      await waitFor(() => {
        const dto = editarUsuario.mock.calls[0][1];
        expect(dto.nuevaContrasena).toBeUndefined();
      });
    });
  });

  describe('Submission', () => {
    it('calls editarUsuario with correct DTO and then onSave', async () => {
      editarUsuario.mockResolvedValue({});
      const onSave = jest.fn();
      render(<EditUserModal {...defaultProps} onSave={onSave} />);
      fireEvent.click(screen.getByText(/Guardar cambios/));

      await waitFor(() =>
        expect(editarUsuario).toHaveBeenCalledWith(
          10,
          expect.objectContaining({
            nombre: 'María',
            apellido: 'González',
            correo: 'maria@test.com',
            activo: true,
            idRol: 2,
            modulos: expect.arrayContaining(['Resumen', 'Plantas', 'Riesgos']),
          })
        )
      );
      await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    });

    it('shows error message when editarUsuario fails', async () => {
      editarUsuario.mockRejectedValue(new Error('Error al guardar'));
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText(/Guardar cambios/));
      expect(await screen.findByText('Error al guardar')).toBeInTheDocument();
    });

    it('shows "Guardando..." while saving', async () => {
      let resolveEdit;
      editarUsuario.mockImplementation(
        () => new Promise(resolve => { resolveEdit = resolve; })
      );
      render(<EditUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText(/Guardar cambios/));

      expect(await screen.findByText('Guardando...')).toBeInTheDocument();
      act(() => resolveEdit({}));
    });
  });

  describe('Close', () => {
    it('calls onClose when clicking Cancelar (form button)', () => {
      const onClose = jest.fn();
      render(<EditUserModal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByText('Cancelar'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking the back arrow', () => {
      const onClose = jest.fn();
      render(<EditUserModal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByText('← Volver a usuarios'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
