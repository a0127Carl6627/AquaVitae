import AlertCard from './AlertCard';

export default {
  title: 'HU02/AlertCard',
  component: AlertCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    level: {
      control: { type: 'select', options: ['critico', 'advertencia', 'informativo'] },
    },
    description: { control: 'text' },
    location: { control: 'text' },
    timestamp: { control: 'text' },
    onDetailClick: { action: 'clicked' },
  },
};

export const CriticoConMetricas = {
  args: {
    level: 'critico',
    description: 'Nivel crítico de agua detectado',
    location: 'Acuífero Valle de México',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    metrics: [
      { label: 'NIVEL ACTUAL', value: '15%', status: 'critico' },
      { label: 'UMBRAL', value: '25%' },
    ],
    onDetailClick: () => alert('Ver detalle de alerta crítica'),
  },
};

export const AdvertenciaConMetricas = {
  args: {
    level: 'advertencia',
    description: 'Alerta de sequía prolongada',
    location: 'Región Bajío - Zona Norte',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    metrics: [
      { label: 'ÍNDICE HÍDRICO', value: '0.32' },
      { label: 'PROYECCIÓN', value: '-12% mensual' },
    ],
    onDetailClick: () => alert('Ver detalle de advertencia'),
  },
};

export const Informativo = {
  args: {
    level: 'informativo',
    description: 'Mantenimiento de pozos programado',
    location: 'Planta Industrial Querétaro',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    onDetailClick: () => alert('Revisar mantenimiento'),
  },
};

export const InformativoSinMetricas = {
  args: {
    level: 'informativo',
    title: 'Mantenimiento de pozos programado',
    ubicacion: 'Planta Industrial Queretaro',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // ayer
    onVerDetalle: () => alert('Ver detalle informativo'),
  },
};
