import CreateProfileModal from './CreateProfileModal';

export default {
  title: 'HU07/CreateProfileModal',
  component: CreateProfileModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Vacio = {
  args: { isOpen: true },
};

export const ConDatos = {
  args: {
    isOpen: true,
    initialData: {
      nombre: 'Supervisor Regional',
      descripcion: 'Gestión de plantas y alertas en zonas asignadas.',
    },
  },
};
