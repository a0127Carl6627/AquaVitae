import RiskEvolutionChart from './RiskEvolutionChart';

export default {
  title: 'Dashboard/RiskEvolutionChart',
  component: RiskEvolutionChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

const mockData = [
  { fecha: '14 May', valorPromedio: 0.75 },
  { fecha: '15 May', valorPromedio: 0.85 },
  { fecha: '16 May', valorPromedio: 0.80 },
  { fecha: '17 May', valorPromedio: 0.65 },
  { fecha: '18 May', valorPromedio: 0.52 },
  { fecha: '19 May', valorPromedio: 0.55 },
  { fecha: '20 May', valorPromedio: 0.60 },
];

export const Ultimos7Dias = {
  args: {
    data: mockData,
  },
};

export const RiesgoAlto = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 0.74 }, // 74%
      { fecha: '15 May', valorPromedio: 0.74 },
      { fecha: '16 May', valorPromedio: 0.68 },
      { fecha: '17 May', valorPromedio: 0.76 },
    ],
  },
};

export const RiesgoMedio = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 0.40 },
      { fecha: '15 May', valorPromedio: 0.50 },
      { fecha: '16 May', valorPromedio: 0.45 },
      { fecha: '17 May', valorPromedio: 0.55 },
    ],
  },
};

export const RiesgoBajo = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 0.23 },
      { fecha: '15 May', valorPromedio: 0.25 },
      { fecha: '16 May', valorPromedio: 0.18 },
      { fecha: '17 May', valorPromedio: 0.24 },
    ],
  },
};