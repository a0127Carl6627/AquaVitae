import EditUserModal from './EditUserModal';

const rolesDemo = [
  {
    id: 1,
    nombre: 'Administrador',
    descripcion: 'Acceso completo a todos los módulos y configuraciones.',
    permisos: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Simulaciones: true, Reportes: true, Configuración: true },
  },
  {
    id: 2,
    nombre: 'Gerente de Planta',
    descripcion: 'Puede gestionar información de su planta, visualizar reportes y generar simulaciones dentro de su ámbito.',
    permisos: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Simulaciones: true, Reportes: true, Configuración: false },
  },
  {
    id: 3,
    nombre: 'Analista',
    descripcion: 'Puede consultar datos y generar reportes. No puede modificar configuraciones.',
    permisos: { Resumen: true, Plantas: false, 'Fuentes de agua': false, Riesgos: true, Simulaciones: true, Reportes: true, Configuración: false },
  },
];

const plantasDemo = [
  { id: 1, nombre: 'Planta Monterrey' },
  { id: 2, nombre: 'Planta Guadalajara' },
  { id: 3, nombre: 'Planta CDMX' },
];

export default {
  title: 'HU06/EditUserModal',
  component: EditUserModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const ConDatos = {
  args: {
    isOpen: true,
    usuario: {
      id: 7,
      nombre: 'María Fernanda',
      apellido: 'Gómez',
      nombreUsuario: 'maria.gomez',
      correo: 'maria.gomez@aquavitae.com',
      telefono: '+52 81 2345 6789',
      activo: true,
      idRol: 2,
      alcanceDatos: 'PLANTA',
      idPlantaAsignada: 1,
    },
    roles: rolesDemo,
    plantas: plantasDemo,
    onClose: () => {},
    onSave: () => {},
  },
};

export const Vacio = {
  args: {
    isOpen: true,
    usuario: {
      id: 1,
      nombre: '',
      apellido: '',
      nombreUsuario: '',
      correo: '',
      telefono: '',
      activo: true,
      idRol: null,
      alcanceDatos: 'GLOBAL',
      idPlantaAsignada: null,
    },
    roles: rolesDemo,
    plantas: plantasDemo,
    onClose: () => {},
    onSave: () => {},
  },
};
