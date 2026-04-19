import CreateProfileButton from './CreateProfileButton';

export default {
  title: 'HU07/CreateProfileButton',
  component: CreateProfileButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const ConIcono = {
  args: { showIcon: true, label: 'Crear nuevo perfil' },
};

export const SinIcono = {
  args: { showIcon: false, label: 'Crear nuevo perfil' },
};
