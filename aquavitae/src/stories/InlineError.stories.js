import InlineError from './InlineError';

const meta = {
  title: 'SCRUM-27/InlineError',
  component: InlineError,
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;

export const Default = {
  args: {
    message: 'Correo no registrado',
  },
};

export const PasswordError = {
  args: {
    message: 'Contraseña incorrecta',
  },
};

export const Empty = {
  args: {
    message: '',
  },
};