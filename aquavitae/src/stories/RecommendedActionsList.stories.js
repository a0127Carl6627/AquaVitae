import RecommendedActionsList from './RecommendedActionsList';

export default {
  title: 'HU03/RecommendedActionsList',
  component: RecommendedActionsList,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const UnaAccion = {
  args: {
    actions: [
      'Activar el protocolo de contingencia hídrica Nivel 2 en el Sector B.',
    ],
  },
};

export const MultipleAcciones = {
  args: {
    actions: [
      'Activar el protocolo de contingencia hídrica Nivel 2 en el Sector B.',
      'Redirigir flujo del Tanque A para compensar el déficit inmediato.',
      'Emitir comunicado informativo a los centros de producción.',
    ],
  },
};
