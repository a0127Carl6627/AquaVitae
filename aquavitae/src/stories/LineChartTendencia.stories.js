import LineChartTendencia from './LineChartTendencia';

export default {
  title: 'HU18/LineChartTendencia',
  component: LineChartTendencia,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const dataFavorable = [
  { month: 'Ene', value: 20 },
  { month: 'Feb', value: 22 },
  { month: 'Mar', value: 25 },
  { month: 'Abr', value: 30 },
  { month: 'May', value: 45 },
  { month: 'Jun', value: 55 },
  { month: 'Jul', value: 58 },
  { month: 'Ago', value: 54 },
  { month: 'Sep', value: 50 },
  { month: 'Oct', value: 52 },
  { month: 'Nov', value: 55 },
  { month: 'Dic', value: 58 },
];

const dataRiesgo = [
  { month: 'Ene', value: 50 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 58 },
  { month: 'Abr', value: 65 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 78 },
  { month: 'Jul', value: 75 },
  { month: 'Ago', value: 70 },
  { month: 'Sep', value: 68 },
  { month: 'Oct', value: 72 },
  { month: 'Nov', value: 75 },
  { month: 'Dic', value: 80 },
];

const dataCritico = [
  { month: 'Ene', value: 75 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 82 },
  { month: 'Abr', value: 85 },
  { month: 'May', value: 88 },
  { month: 'Jun', value: 90 },
  { month: 'Jul', value: 88 },
  { month: 'Ago', value: 85 },
  { month: 'Sep', value: 87 },
  { month: 'Oct', value: 90 },
  { month: 'Nov', value: 92 },
  { month: 'Dic', value: 95 },
];

export const Favorable = { args: { data: dataFavorable, nivel: 'favorable' } };
export const EnRiesgo  = { args: { data: dataRiesgo,    nivel: 'riesgo'    } };
export const Critico   = { args: { data: dataCritico,   nivel: 'critico'   } };
