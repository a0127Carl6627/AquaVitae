import NewUserModal from './NewUserModal';

const meta = {
  title: 'SCRUM-29/NewUserModal',
  component: NewUserModal,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    idEmpresa: { control: 'number' },
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
};

export default meta;

const rolesEjemplo = [
  { id: 1, nombre: 'Administrador', descripcion: 'Acceso completo a todos los módulos y configuraciones.', permisos: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Simulaciones: true, Reportes: true, Configuración: true } },
  { id: 2, nombre: 'Analista', descripcion: 'Puede consultar datos y generar reportes sin modificar configuraciones.', permisos: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Simulaciones: true, Reportes: true, Configuración: false } },
  { id: 3, nombre: 'Operador', descripcion: 'Acceso operativo limitado a su planta asignada.', permisos: { Resumen: true, Plantas: true, 'Fuentes de agua': false, Riesgos: false, Simulaciones: false, Reportes: false, Configuración: false } },
];

const plantasEjemplo = [
  { id: 1, nombre: 'Planta Norte' },
  { id: 2, nombre: 'Planta Sur' },
  { id: 3, nombre: 'Planta Centro' },
];

export const Default = {
  args: {
    isOpen: true,
    roles: rolesEjemplo,
    plantas: plantasEjemplo,
    idEmpresa: 1,
  },
};

export const SinRoles = {
  args: {
    isOpen: true,
    roles: [],
    plantas: [],
    idEmpresa: 1,
  },
};

export const Cerrado = {
  args: {
    isOpen: false,
    roles: rolesEjemplo,
    plantas: plantasEjemplo,
    idEmpresa: 1,
  },
};
