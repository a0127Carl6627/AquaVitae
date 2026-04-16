import RiesgoPromedioBadge from './RiesgoPromedioBadge';

export default {
  title: 'HU17/RiesgoPromedioBadge',
  component: RiesgoPromedioBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    nivel: {
      control: { type: 'select', options: ['bajo', 'medio', 'alto'] },
    },
    trend: {
      control: { type: 'select', options: ['up', 'down', 'stable'] },
    },
    label: { control: 'text' },
  },
};

export const MedioUp = {
  args: {
    nivel: 'medio',
    trend: 'up',
  },
};

export const BajoDown = {
  args: {
    nivel: 'bajo',
    trend: 'down',
  },
};

export const AltoUp = {
  args: {
    nivel: 'alto',
    trend: 'up',
  },
};

