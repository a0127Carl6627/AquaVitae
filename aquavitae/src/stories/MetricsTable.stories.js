import MetricsTable from './MetricsTable';

export default {
  title: 'HU03/MetricsTable',
  component: MetricsTable,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Critico = {
  args: {
    metrics: [
      { label: 'Nivel Actual',    value: '15%',                       status: 'critico' },
      { label: 'Umbral Crítico',  value: '25%',                       status: 'normal'  },
      { label: 'Tendencia',       value: 'Descendente (-2% semanal)', status: 'critico', trend: 'descendente' },
    ],
  },
};

export const Normal = {
  args: {
    metrics: [
      { label: 'Nivel Actual',    value: '68%',                       status: 'normal-ok' },
      { label: 'Umbral Crítico',  value: '25%',                       status: 'normal'    },
      { label: 'Tendencia',       value: 'Ascendente (+3% semanal)',  status: 'normal-ok', trend: 'ascendente' },
    ],
  },
};
