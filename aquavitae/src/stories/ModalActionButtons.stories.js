import ModalActionButtons from './ModalActionButtons';

export default {
  title: 'HU06/ModalActionButtons',
  component: ModalActionButtons,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Default = {
  args: { disabled: false, loading: false },
};

export const Deshabilitado = {
  args: { disabled: true, loading: false },
};

export const Cargando = {
  args: { disabled: false, loading: true },
};
