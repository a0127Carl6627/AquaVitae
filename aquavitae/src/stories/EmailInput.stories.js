import EmailInput from './EmailInput';

export default {
  title: 'SCRUM-23/EmailInput',
  component: EmailInput,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    placeholder: 'yourmail@example.com',
    disabled: false,
  },
};

export const Empty = {
  args: {
    placeholder: 'Correo electrónico',
  },
};

export const Disabled = {
  args: {
    placeholder: 'irmaalfonso@hotmail.com',
    disabled: true,
  },
};