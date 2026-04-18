import ApiKpiCard from './ApiKpiCard';

const meta = {
  title: 'SCRUM-40-41-42/ApiKpiCard',
  component: ApiKpiCard,
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    trend: { control: 'text' },
    trendType: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    footer: { control: 'text' },
  },
};

export default meta;

export const UpTrend = {
  args: {
    title: 'Error 404',
    value: '1,284',
    trend: '+4%',
    trendType: 'up',
  },
};

export const DownTrend = {
  args: {
    title: 'Error 401',
    value: '842',
    trend: '-12%',
    trendType: 'down',
  },
};

export const NeutralTrend = {
  args: {
    title: 'Total requests',
    value: '18,320',
    trend: 'Stable',
    trendType: 'neutral',
  },
};

export const WithFooter = {
  args: {
    title: 'Integraciones activas',
    value: '24',
    trend: '+2',
    trendType: 'up',
    footer: 'Última actualización hace 5 min',
  },
};