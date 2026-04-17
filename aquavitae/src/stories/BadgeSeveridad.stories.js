import BadgeSeveridad from './BadgeSeveridad';

export default {
  title: 'HU03/BadgeSeveridad',
  component: BadgeSeveridad,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['critico', 'advertencia', 'informativo', 'ok'],
    },
  },
};

export const Critico     = { args: { level: 'critico' } };
export const Advertencia = { args: { level: 'advertencia' } };
export const Informativo = { args: { level: 'informativo' } };
export const Ok          = { args: { level: 'ok' } };
