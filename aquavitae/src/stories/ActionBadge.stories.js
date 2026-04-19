import ActionBadge from './ActionBadge';

export default {
  title: 'HU10/ActionBadge',
  component: ActionBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['critical', 'warning', 'safe'],
    },
  },
};

export const Critico    = { args: { label: 'Reubicar producción',         type: 'critical' } };
export const Preventivo = { args: { label: 'Reducción de consumo preventiva', type: 'warning'  } };
export const Estable    = { args: { label: 'Operación estable',           type: 'safe'     } };
