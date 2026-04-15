import Avatar from './Avatar';

export default {
  title: 'Example/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: { type: 'number', min: 24, max: 200 },
    },
  },
};

export const Default = {
  args: {
    size: 80,
  },
};

export const Small = {
  args: {
    size: 40,
  },
};

export const Large = {
  args: {
    size: 120,
  },
};