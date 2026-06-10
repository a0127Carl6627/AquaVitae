import DonutChart from './DonutChart';

export default {
  title: 'Dashboard/DonutChart',
  component: DonutChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    alto:  { control: { type: 'number', min: 0 } },
    medio: { control: { type: 'number', min: 0 } },
    bajo:  { control: { type: 'number', min: 0 } },
  },
};

export const Default = {
  args: { alto: 2, medio: 4, bajo: 6 },
};

export const SoloAlto = {
  args: { alto: 12, medio: 0, bajo: 0 },
};

export const Equilibrado = {
  args: { alto: 4, medio: 4, bajo: 4 },
};

export const SinDatos = {
  args: { alto: 0, medio: 0, bajo: 0 },
};