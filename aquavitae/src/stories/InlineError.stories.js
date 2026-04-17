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
    message: 'Credenciales incorrectas',
  },
};

export const PasswordError = {
  args: {
    message: 'Credenciales incorrectas',
  },
};

export const Empty = {
  args: {
    message: '',
  },
};