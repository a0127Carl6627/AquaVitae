import RecommendationCard from './RecommendationCard';

export default {
  title: 'HU17/RecommendationCard',
  component: RecommendationCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    riskLevel: {
      control: { type: 'select', options: ['bajo', 'medio', 'alto'] },
    },
    customMessage: { control: 'text' },
  },
};

export const RiesgoMedio = {
  args: {
    riskLevel: 'medio',
  },
};

export const RiesgoAlto = {
  args: {
    riskLevel: 'alto',
  },
};

export const RiesgoBajo = {
  args: {
    riskLevel: 'bajo',
  },
};
