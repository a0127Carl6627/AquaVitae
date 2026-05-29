import React from 'react';
import SimulacionKpiCard from './SimulacionKpiCard';

const WaterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/>
    <path d="M12 9v4M12 17h.01"/>
  </svg>
);
const MoneyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export default {
  title: 'SimulacionHidrica/SimulacionKpiCard',
  component: SimulacionKpiCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    color: {
      control: 'select',
      options: ['red', 'amber', 'green', 'blue', 'gray'],
    },
  },
};

export const IndiceHidrico = {
  name: 'Índice hídrico (rojo)',
  render: (args) => <SimulacionKpiCard {...args} icon={<WaterIcon />} />,
  args: {
    label: 'Índice hídrico actual',
    value: '85%',
    sublabel: 'Nivel de estrés crítico',
    color: 'red',
  },
};

export const DiasUmbral = {
  name: 'Días al umbral (amber)',
  render: (args) => <SimulacionKpiCard {...args} icon={<ClockIcon />} />,
  args: {
    label: 'Días al umbral crítico',
    value: '42',
    sublabel: 'Sin intervención',
    color: 'amber',
  },
};

export const Probabilidad = {
  name: 'Probabilidad evento crítico (amber)',
  render: (args) => <SimulacionKpiCard {...args} icon={<AlertIcon />} />,
  args: {
    label: 'Probabilidad evento crítico',
    value: '78%',
    sublabel: 'Próximos 90 días',
    color: 'amber',
  },
};

export const PerdidaEconomica = {
  name: 'Pérdida económica (azul)',
  render: (args) => <SimulacionKpiCard {...args} icon={<MoneyIcon />} />,
  args: {
    label: 'Pérdida económica proy.',
    value: '$4.8 M',
    sublabel: 'Estimado 90 días MXN',
    color: 'blue',
  },
};

export const SinRiesgo = {
  name: 'Sin riesgo (verde)',
  render: (args) => <SimulacionKpiCard {...args} icon={<WaterIcon />} />,
  args: {
    label: 'Índice hídrico actual',
    value: '22%',
    sublabel: 'Condición normal',
    color: 'green',
  },
};

export const SinIcono = {
  name: 'Sin ícono',
  args: {
    label: 'Métrica genérica',
    value: '64%',
    sublabel: 'Descripción adicional',
    color: 'gray',
  },
};
