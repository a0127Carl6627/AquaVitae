import EditUserModal from './EditUserModal';

export default {
  title: 'HU06/EditUserModal',
  component: EditUserModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Vacio = {
  args: {
    isOpen: true,
    user: {},
  },
};

export const ConDatos = {
  args: {
    isOpen: true,
    user: {
      nombre: 'Juan Pérez',
      correo: 'juan@empresa.com',
      empresa: 'Empresa A',
      isAdmin: false,
    },
  },
};

export const Admin = {
  args: {
    isOpen: true,
    user: {
      nombre: 'María López',
      correo: 'maria@empresa.com',
      empresa: 'Empresa B',
      isAdmin: true,
    },
  },
};
