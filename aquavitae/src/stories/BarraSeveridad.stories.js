import BarraSeveridad from './BarraSeveridad';

export default {
  title: 'HU10/BarraSeveridad',
  component: BarraSeveridad,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    porcentaje: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export const Verde  = { args: { porcentaje: 20 } };
export const Naranja = { args: { porcentaje: 50 } };
export const Rojo   = { args: { porcentaje: 88 } };
