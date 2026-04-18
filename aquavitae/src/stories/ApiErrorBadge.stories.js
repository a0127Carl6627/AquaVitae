import ApiErrorBadge from './ApiErrorBadge';

const meta = {
  title: 'SCRUM-43/ApiErrorBadge',
  component: ApiErrorBadge,
  argTypes: {
    label: { control: 'text' },
    subtitle: { control: 'text' },
    tone: {
      control: 'select',
      options: ['warning', 'danger'],
    },
  },
};

export default meta;

export const Warning = {
  args: {
    label: 'Error 404',
    subtitle: 'Not Found',
    tone: 'warning',
  },
};

export const Danger = {
  args: {
    label: 'Error 401',
    subtitle: 'Unauthorized',
    tone: 'danger',
  },
};