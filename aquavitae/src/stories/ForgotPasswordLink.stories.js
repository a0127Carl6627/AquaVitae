import ForgotPasswordLink from './ForgotPasswordLink';

const meta = {
  title: 'SCRUM-26/ForgotPasswordLink',
  component: ForgotPasswordLink,
};

export default meta;

export const Default = {
  args: {},
};

export const CustomClick = {
  args: {
    onClick: () => alert('Ir a recuperar contraseña'),
  },
};