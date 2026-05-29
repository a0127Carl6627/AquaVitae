import RiskEvolutionChart from './RiskEvolutionChart';

export default {
  title: 'Dashboard/RiskEvolutionChart',
  component: RiskEvolutionChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

const mockData = [
  { fecha: '14 May', valorPromedio: 75 },
  { fecha: '15 May', valorPromedio: 85 },
  { fecha: '16 May', valorPromedio: 80 },
  { fecha: '17 May', valorPromedio: 65 },
  { fecha: '18 May', valorPromedio: 52 },
  { fecha: '19 May', valorPromedio: 55 },
  { fecha: '20 May', valorPromedio: 60 },
];

export const Ultimos7Dias = {
  args: {
    data: mockData,
  },
};

export const RiesgoAlto = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 74 }, // 74%
      { fecha: '15 May', valorPromedio: 74 },
      { fecha: '16 May', valorPromedio: 68 },
      { fecha: '17 May', valorPromedio: 76 },
    ],
  },
};

export const RiesgoMedio = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 40 },
      { fecha: '15 May', valorPromedio: 50 },
      { fecha: '16 May', valorPromedio: 45 },
      { fecha: '17 May', valorPromedio: 55 },
    ],
  },
};

export const RiesgoBajo = {
  args: {
    data: [
      { fecha: '14 May', valorPromedio: 23 },
      { fecha: '15 May', valorPromedio: 25 },
      { fecha: '16 May', valorPromedio: 18 },
      { fecha: '17 May', valorPromedio: 24 },
    ],
  },
};