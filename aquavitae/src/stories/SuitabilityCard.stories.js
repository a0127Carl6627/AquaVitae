import SuitabilityCard from './SuitabilityCard';

const meta = {
  title: 'SCRUM-48/SuitabilityCard',
  component: SuitabilityCard,
  argTypes: {
    title: { control: 'text' },
    status: { control: 'text' },
    tone: {
      control: 'select',
      options: ['positive', 'negative'],
    },
    description: { control: 'text' },
  },
};

export default meta;

export const Negative = {
  args: {
    title: 'Evaluación',
    status: 'No idóneo',
    tone: 'negative',
    description:
      'La región presenta un índice alto de estrés hídrico y proyección desfavorable.',
  },
};

export const Positive = {
  args: {
    title: 'Evaluación',
    status: 'Adecuado',
    tone: 'positive',
    description:
      'La región muestra condiciones estables y una proyección de riesgo controlada.',
  },
};