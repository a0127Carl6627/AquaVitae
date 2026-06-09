import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import NewUserModal from '../../../components/admin/NewUserModal';
import { crearUsuario, generarContrasena } from '../../../services/aquavitaeApi';

jest.mock('../../../services/aquavitaeApi', () => ({
  crearUsuario: jest.fn(),
  generarContrasena: jest.fn(),
}));

const roles = [
  { id: 1, nombre: 'Administrador', descripcion: 'Acceso total al sistema', cantidadPermisos: 8, permisos: [] },
  { id: 2, nombre: 'Director', descripcion: 'Acceso completo sin configuración', cantidadPermisos: 7, permisos: [] },
  { id: 3, nombre: 'Operador', descripcion: 'Acceso mínimo de operación', cantidadPermisos: 2, permisos: [] },
];
const plantas = [{ id: 1, nombre: 'Planta Monterrey' }];

const defaultProps = {
  isOpen: true,
  roles,
  plantas,
  idEmpresa: 1,
  onClose: jest.fn(),
  onSave: jest.fn(),
};

function fillValidForm() {
  fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
    target: { value: 'Juan Pérez' },
  });
  fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
    target: { value: 'juan@test.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('••••••••'), {
    target: { value: 'password123' },
  });
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
}

describe('NewUserModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    generarContrasena.mockResolvedValue('MockPass123!');
  });

  describe('Visibility', () => {
    it('returns null when isOpen=false', () => {
      const { container } = render(<NewUserModal {...defaultProps} isOpen={false} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders the modal when isOpen=true', () => {
      render(<NewUserModal {...defaultProps} />);
      expect(screen.getByText('Agregar nuevo usuario')).toBeInTheDocument();
    });
  });

  describe('Roles and permissions', () => {
    it('renders all roles in the select dropdown', () => {
      render(<NewUserModal {...defaultProps} />);
      expect(screen.getByText('Administrador')).toBeInTheDocument();
      expect(screen.getByText('Director')).toBeInTheDocument();
      expect(screen.getByText('Operador')).toBeInTheDocument();
    });

    it('shows role description when a role is selected', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
      expect(screen.getByText('Acceso completo sin configuración')).toBeInTheDocument();
    });

    it('checks all 8 permissions when Administrador is selected', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(8);
      checkboxes.forEach(cb => expect(cb).toBeChecked());
    });

    it('checks only 2 permissions when Operador is selected', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });
      const checked = screen.getAllByRole('checkbox', { checked: true });
      expect(checked).toHaveLength(2);
    });

    it('toggles a permission checkbox', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
      const firstCheckbox = screen.getAllByRole('checkbox')[0];
      expect(firstCheckbox).toBeChecked();
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).not.toBeChecked();
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox).toBeChecked();
    });

    it('resets permissions when role changes', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } }); // Administrador
      fireEvent.click(screen.getAllByRole('checkbox')[0]); // uncheck first
      expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked();
      // Switch to a different role so React detects the state change and resets permissions
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } }); // Director
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } }); // back to Administrador
      expect(screen.getAllByRole('checkbox')[0]).toBeChecked();
    });
  });

  describe('Password', () => {
    it('toggles password visibility', () => {
      render(<NewUserModal {...defaultProps} />);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      expect(passwordInput).toHaveAttribute('type', 'password');
      fireEvent.click(screen.getByTitle('Ver contraseña'));
      expect(passwordInput).toHaveAttribute('type', 'text');
      fireEvent.click(screen.getByTitle('Ocultar contraseña'));
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('generates a password and fills the input', async () => {
      generarContrasena.mockResolvedValue('AutoPass1!');
      render(<NewUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Generar contraseña'));
      await screen.findByDisplayValue('AutoPass1!');
      // Wait for setGenerando(false) in finally to flush all pending state updates
      await waitFor(() =>
        expect(screen.queryByText('Generando...')).not.toBeInTheDocument()
      );
    });

    it('shows error when password generation fails', async () => {
      generarContrasena.mockRejectedValue(new Error('Error de red'));
      render(<NewUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Generar contraseña'));
      await screen.findByText('Error de red');
      // Wait for setGenerando(false) in finally to flush all pending state updates
      await waitFor(() =>
        expect(screen.queryByText('Generando...')).not.toBeInTheDocument()
      );
    });

    it('disables generate button while generating', async () => {
      let resolveGenerate;
      generarContrasena.mockImplementation(
        () => new Promise(resolve => { resolveGenerate = resolve; })
      );
      render(<NewUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Generar contraseña'));
      expect(screen.getByText('Generando...')).toBeDisabled();
      act(() => resolveGenerate('pass'));
    });
  });

  describe('Validations', () => {
    it('shows error when nombre is empty', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(screen.getByText('El nombre completo es requerido.')).toBeInTheDocument();
    });

    it('shows error when correo is empty', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Juan' },
      });
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(screen.getByText('El correo electrónico es requerido.')).toBeInTheDocument();
    });

    it('shows error when password is empty', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Juan' },
      });
      fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
        target: { value: 'juan@test.com' },
      });
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(screen.getByText('La contraseña temporal es requerida.')).toBeInTheDocument();
    });

    it('shows error when password is shorter than 8 characters', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Juan' },
      });
      fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
        target: { value: 'juan@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: '123' },
      });
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(
        screen.getByText('La contraseña debe tener al menos 8 caracteres.')
      ).toBeInTheDocument();
    });

    it('shows error when no role is selected', () => {
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Juan' },
      });
      fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
        target: { value: 'juan@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: 'password123' },
      });
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(screen.getByText('Debe seleccionar un rol.')).toBeInTheDocument();
    });
  });

  describe('Submission', () => {
    it('calls crearUsuario with correct DTO and then onSave', async () => {
      crearUsuario.mockResolvedValue({});
      const onSave = jest.fn();
      render(<NewUserModal {...defaultProps} onSave={onSave} />);
      fillValidForm();
      fireEvent.click(screen.getByText('Guardar usuario'));

      await waitFor(() =>
        expect(crearUsuario).toHaveBeenCalledWith(
          expect.objectContaining({
            nombre: 'Juan',
            apellido: 'Pérez',
            correo: 'juan@test.com',
            idRol: 2,
            idEmpresa: 1,
            contrasenaTemp: 'password123',
            modulos: expect.arrayContaining(['Resumen', 'Plantas']),
          })
        )
      );
      await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    });

    it('splits single-word name as nombre with apellido "-"', async () => {
      crearUsuario.mockResolvedValue({});
      render(<NewUserModal {...defaultProps} />);
      fireEvent.change(screen.getByPlaceholderText('Ej. María Fernanda López'), {
        target: { value: 'Monónimo' },
      });
      fireEvent.change(screen.getByPlaceholderText('usuario@empresa.com'), {
        target: { value: 'mono@test.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('••••••••'), {
        target: { value: 'password123' },
      });
      fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
      fireEvent.click(screen.getByText('Guardar usuario'));

      await waitFor(() =>
        expect(crearUsuario).toHaveBeenCalledWith(
          expect.objectContaining({ nombre: 'Monónimo', apellido: '-' })
        )
      );
    });

    it('shows error message when crearUsuario fails', async () => {
      crearUsuario.mockRejectedValue(new Error('Error del servidor'));
      render(<NewUserModal {...defaultProps} />);
      fillValidForm();
      fireEvent.click(screen.getByText('Guardar usuario'));
      expect(await screen.findByText('Error del servidor')).toBeInTheDocument();
    });

    it('shows "Guardando..." and disables buttons while saving', async () => {
      let resolveCreate;
      crearUsuario.mockImplementation(
        () => new Promise(resolve => { resolveCreate = resolve; })
      );
      render(<NewUserModal {...defaultProps} />);
      fillValidForm();
      fireEvent.click(screen.getByText('Guardar usuario'));

      expect(await screen.findByText('Guardando...')).toBeInTheDocument();
      expect(await screen.findByText('Cancelar')).toBeDisabled();
      act(() => resolveCreate({}));
    });
  });

  describe('Close', () => {
    it('calls onClose when clicking Cancelar', () => {
      const onClose = jest.fn();
      render(<NewUserModal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByText('Cancelar'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking the back arrow', () => {
      const onClose = jest.fn();
      render(<NewUserModal {...defaultProps} onClose={onClose} />);
      fireEvent.click(screen.getByText('← Volver a usuarios'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
