import PasswordInput from './PasswordInput';

const meta = {
  title: 'SCRUM-24/PasswordInput',
  component: PasswordInput,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    placeholder: '••••••••••••',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    placeholder: '••••••••••••',
    disabled: true,
  },
};