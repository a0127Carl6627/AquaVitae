import SimulacionKpiCard from './SimulacionKpiCard';

export default {
  title: 'SimulacionHidrica/SimulacionKpiCard',
  component: SimulacionKpiCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const IndiceHidrico = {
  args: {
    label: 'Índice hídrico actual',
    value: '85%',
    sublabel: 'Nivel de estrés crítico',
    color: 'red',
  },
};

export const DiasUmbral = {
  args: {
    label: 'Días al umbral crítico',
    value: '42',
    sublabel: 'Días estimados',
    color: 'amber',
  },
};

export const Probabilidad = {
  args: {
    label: 'Probabilidad evento crítico',
    value: '78%',
    sublabel: 'Basado en modelos climáticos',
    color: 'amber',
  },
};

export const PerdidaEconomica = {
  args: {
    label: 'Pérdida económica proy.',
    value: '$4.8 M',
    sublabel: 'Sin intervención',
    color: 'red',
  },
};
