import LargeKpiValueCard from './LargeKpiValueCard';

const meta = {
  title: 'SCRUM-46/LargeKpiValueCard',
  component: LargeKpiValueCard,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    trend: { control: 'text' },
    trendType: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;

export const Default = {};