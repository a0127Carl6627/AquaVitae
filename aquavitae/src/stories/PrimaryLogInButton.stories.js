import PrimaryLogInButton from './PrimaryLogInButton';

const meta = {
  title: 'SCRUM-25/PrimaryLogInButton',
  component: PrimaryLogInButton,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Iniciar sesión',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Iniciar sesión',
    disabled: true,
  },
};

export const CustomText = {
  args: {
    label: 'Entrar',
  },
};