import React from 'react';
import { render, screen } from '@testing-library/react';
import PermissionsMatrix, {
  MODULES_DEFAULT,
  ROLES_DEFAULT,
} from '../../../components/admin/PermissionsMatrix';

const modules = ['Resumen', 'Plantas', 'Riesgos'];
const roles = ['Director', 'Analista'];
const permissions = {
  Director: { Resumen: true, Plantas: true, Riesgos: true },
  Analista: { Resumen: true, Plantas: false, Riesgos: true },
};

describe('PermissionsMatrix', () => {
  it('renders the section title', () => {
    render(<PermissionsMatrix modules={modules} roles={roles} permissions={permissions} />);
    expect(screen.getByText('Detalle de permisos por módulo')).toBeInTheDocument();
  });

  it('renders all module names as rows', () => {
    render(<PermissionsMatrix modules={modules} roles={roles} permissions={permissions} />);
    modules.forEach(mod => {
      expect(screen.getByText(mod)).toBeInTheDocument();
    });
  });

  it('renders role names as column headers', () => {
    render(<PermissionsMatrix modules={modules} roles={roles} permissions={permissions} />);
    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Analista')).toBeInTheDocument();
  });

  it('filters out Administrador from column headers', () => {
    render(
      <PermissionsMatrix
        modules={['Resumen']}
        roles={['Administrador', 'Director']}
        permissions={{ Administrador: { Resumen: true }, Director: { Resumen: true } }}
      />
    );
    expect(screen.queryByText('Administrador')).not.toBeInTheDocument();
    expect(screen.getByText('Director')).toBeInTheDocument();
  });

  it('renders check icons for true permissions', () => {
    render(<PermissionsMatrix modules={modules} roles={roles} permissions={permissions} />);
    const checks = screen.getAllByLabelText('Tiene permiso');
    expect(checks.length).toBeGreaterThan(0);
  });

  it('renders dash icons for false permissions', () => {
    render(<PermissionsMatrix modules={modules} roles={roles} permissions={permissions} />);
    const dashes = screen.getAllByLabelText('Sin permiso');
    expect(dashes.length).toBeGreaterThan(0);
  });

  it('renders with default props when none are provided', () => {
    render(<PermissionsMatrix />);
    MODULES_DEFAULT.forEach(mod => {
      expect(screen.getByText(mod)).toBeInTheDocument();
    });
    ROLES_DEFAULT.filter(r => r !== 'Administrador').forEach(rol => {
      expect(screen.getByText(rol)).toBeInTheDocument();
    });
  });

  it('renders empty body when modules array is empty', () => {
    render(<PermissionsMatrix modules={[]} roles={['Director']} permissions={{}} />);
    expect(screen.queryByText('Resumen')).not.toBeInTheDocument();
  });

  it('treats missing permission entry as false (renders dash)', () => {
    render(
      <PermissionsMatrix
        modules={['Resumen']}
        roles={['Operador']}
        permissions={{}}
      />
    );
    expect(screen.getByLabelText('Sin permiso')).toBeInTheDocument();
  });
});
