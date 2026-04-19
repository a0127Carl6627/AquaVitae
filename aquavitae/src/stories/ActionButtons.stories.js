import ActionButtons from './ActionButtons';

export default {
  title: 'HU03/ActionButtons',
  component: ActionButtons,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    disabled: false,
  },
};

export const Deshabilitado = {
  args: {
    disabled: true,
  },
};
