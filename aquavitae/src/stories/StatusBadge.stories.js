import StatusBadge from './StatusBadge';

const meta = {
  title: 'Base/StatusBadge',
  component: StatusBadge,
  argTypes: {
    status: { control: 'text' },
  },
};

export default meta;

export const Active = {
  args: {
    status: 'activo',
  },
};

export const Inactive = {
  args: {
    status: 'inactivo',
  },
};