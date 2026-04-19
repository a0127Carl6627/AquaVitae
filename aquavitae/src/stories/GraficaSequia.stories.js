import GraficaSequia from './GraficaSequia';

export default {
  title: 'HU10/GraficaSequia',
  component: GraficaSequia,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    nivel: {
      control: 'select',
      options: ['bajo', 'medio', 'alto'],
    },
  },
};

export const Bajo  = { args: { nivel: 'bajo' } };
export const Medio = { args: { nivel: 'medio' } };
export const Alto  = { args: { nivel: 'alto' } };
