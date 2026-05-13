import RiskGauge from './RiskGauge';

export default {
  title: 'Dashboard/RiskGauge',
  component: RiskGauge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    nivel: {
      control: { type: 'select' },
      options: ['bajo', 'medio', 'alto'],
    },
    regiones: { control: { type: 'number', min: 1, max: 32 } },
  },
};

export const Alto = {
  args: { nivel: 'alto', regiones: 3 },
};

export const Medio = {
  args: { nivel: 'medio', regiones: 5 },
};

export const Bajo = {
  args: { nivel: 'bajo', regiones: 8 },
};