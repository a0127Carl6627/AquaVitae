import BarChartHistorico from './BarChartHistorico';

export default {
  title: 'HU18/BarChartHistorico',
  component: BarChartHistorico,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const dataNormal = [
  { year: 2019, value: 720000 },
  { year: 2020, value: 540000 },
  { year: 2021, value: 810000 },
  { year: 2022, value: 690000 },
  { year: 2023, value: 950000 },
];

const dataRiesgo = [
  { year: 2019, value: 600000 },
  { year: 2020, value: 480000 },
  { year: 2021, value: 420000 },
  { year: 2022, value: 390000 },
  { year: 2023, value: 420000 },
];

const dataBaja = [
  { year: 2019, value: 300000 },
  { year: 2020, value: 260000 },
  { year: 2021, value: 220000 },
  { year: 2022, value: 190000 },
  { year: 2023, value: 180000 },
];

export const Favorable = { args: { data: dataNormal } };
export const EnRiesgo  = { args: { data: dataRiesgo } };
export const Critico   = { args: { data: dataBaja } };
