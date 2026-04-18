import StressLevelGauge from './StressLevelGauge';

const meta = {
  title: 'SCRUM-47/StressLevelGauge',
  component: StressLevelGauge,
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
    label: { control: 'text' },
    level: {
      control: 'select',
      options: ['critical', 'high', 'moderate'],
    },
  },
};

export default meta;

export const Default = {};