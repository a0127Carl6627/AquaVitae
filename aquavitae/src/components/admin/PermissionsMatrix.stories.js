import PermissionsMatrix, {
  MODULES_DEFAULT,
  ROLES_DEFAULT,
  PERMISSIONS_DEFAULT,
} from './PermissionsMatrix';

export default {
  title: 'UsuarioYRoles/PermissionsMatrix',
  component: PermissionsMatrix,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const Default = {
  args: {
    modules:     MODULES_DEFAULT,
    roles:       ROLES_DEFAULT,
    permissions: PERMISSIONS_DEFAULT,
  },
};

export const TodosActivos = {
  args: {
    modules: MODULES_DEFAULT,
    roles:   ROLES_DEFAULT,
    permissions: Object.fromEntries(
      ROLES_DEFAULT.map(r => [r, Object.fromEntries(MODULES_DEFAULT.map(m => [m, true]))])
    ),
  },
};

export const TodosInactivos = {
  args: {
    modules: MODULES_DEFAULT,
    roles:   ROLES_DEFAULT,
    permissions: Object.fromEntries(
      ROLES_DEFAULT.map(r => [r, Object.fromEntries(MODULES_DEFAULT.map(m => [m, false]))])
    ),
  },
};

export const DosRoles = {
  args: {
    modules: MODULES_DEFAULT,
    roles:   ['Director', 'Operador'],
    permissions: {
      'Director': PERMISSIONS_DEFAULT['Director'],
      'Operador': PERMISSIONS_DEFAULT['Operador'],
    },
  },
};

export const ConAdminFiltrado = {
  name: 'Administrador filtrado automáticamente',
  args: {
    modules: MODULES_DEFAULT,
    roles:   ['Administrador', ...ROLES_DEFAULT], // viene incluido
    permissions: {
      'Administrador': Object.fromEntries(MODULES_DEFAULT.map(m => [m, true])),
      ...PERMISSIONS_DEFAULT,
    },
  },
};

export const ModulosReducidos = {
  args: {
    modules: ['Resumen', 'Alertas', 'Reportes'],
    roles:   ROLES_DEFAULT,
    permissions: PERMISSIONS_DEFAULT,
  },
};