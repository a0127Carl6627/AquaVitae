import IncidentSummary from './IncidentSummary';

export default {
  title: 'HU03/IncidentSummary',
  component: IncidentSummary,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Corto = {
  args: {
    title: 'Resumen de la situación',
    description: 'Se ha detectado una caída por debajo del umbral de seguridad operativa del 25% en el Acuífero Valle de México.',
  },
};

export const Largo = {
  args: {
    title: 'Resumen de la situación',
    description: 'Se ha detectado una reducción anómala en los niveles de extracción del Acuífero Valle de México. El sensor de la zona norte reporta una caída por debajo del umbral de seguridad operativa del 25%, lo cual compromete el suministro para los distritos industriales colindantes en las próximas 48 horas. Se recomienda activar el protocolo de contingencia hídrica Nivel 2 de forma inmediata para evitar afectaciones mayores.',
  },
};
