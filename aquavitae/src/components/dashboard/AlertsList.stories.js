import AlertsList from './AlertsList';

export default {
  title: 'Dashboard/AlertsList',
  component: AlertsList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

const mockAlerts = [
  {
    id: 1,
    tipo: 'CRÍTICO',
    titulo: 'Nivel crítico en Presa Valle Bravo',
    descripcion: 'El nivel actual (38%) está por debajo del umbral (40%).',
    hora: '10:20 a.m.',
  },
  {
    id: 2,
    tipo: 'CRÍTICO',
    titulo: 'Acuífero Cuautitlán en nivel crítico',
    descripcion: 'El nivel actual (28%) está por debajo del umbral (30%).',
    hora: '10:15 a.m.',
  },
  {
    id: 3,
    tipo: 'ADVERTENCIA',
    titulo: 'Sequía moderada pronosticada',
    descripcion:
      'Se prevén condiciones más secas de lo normal en los próximos 3 meses en la región Noreste.',
    hora: '09:45 a.m.',
  },
];

export const ConAlertas = {
  args: { alerts: mockAlerts },
};

export const SoloAdvertencias = {
  args: {
    alerts: mockAlerts.filter((a) => a.tipo === 'ADVERTENCIA'),
  },
};

export const SinAlertas = {
  args: { alerts: [] },
};

export const Informativo = {
  args: {
    alerts: [
      {
        id: 4,
        tipo: 'INFORMATIVO',
        titulo: 'Mantenimiento programado en planta Norte',
        descripcion: 'Se realizará revisión de sensores el 25 de mayo de 8:00 a 12:00 hrs.',
        hora: '08:00 a.m.',
      },
    ],
  },
};