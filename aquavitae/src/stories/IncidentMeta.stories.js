import IncidentMeta from './IncidentMeta';

export default {
  title: 'HU03/IncidentMeta',
  component: IncidentMeta,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const ahora = new Date();
const haceDoce   = new Date(ahora - 12 * 60 * 60 * 1000).toISOString();
const haceVeintiseis = new Date(ahora - 26 * 60 * 60 * 1000).toISOString();
const haceTresDias   = new Date(ahora - 72 * 60 * 60 * 1000).toISOString();

export const HaceHoras = {
  args: {
    ubicacion: 'Acuífero Valle de México',
    timestamp: haceDoce,
  },
};

export const Ayer = {
  args: {
    ubicacion: 'Región Bajío - Zona Norte',
    timestamp: haceVeintiseis,
  },
};

export const ConFecha = {
  args: {
    ubicacion: 'Planta Industrial Querétaro',
    timestamp: haceTresDias,
  },
};
