import BadgeSeveridad from './BadgeSeveridad';

export default {
  title: 'Base Components/BadgeSeveridad',
  component: BadgeSeveridad,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['critico', 'advertencia', 'informativo', 'ok', 'favorable', 'en_riesgo', 'urgente'],
    },
    label: { control: 'text' },
  },
};

export const Critico     = { args: { level: 'critico'     } };
export const Advertencia = { args: { level: 'advertencia' } };
export const Informativo = { args: { level: 'informativo' } };
export const Ok          = { args: { level: 'ok'          } };
export const Favorable   = { args: { level: 'favorable'   } };
export const EnRiesgo    = { args: { level: 'en_riesgo'   } };
export const Urgente     = { args: { level: 'urgente'     } };

