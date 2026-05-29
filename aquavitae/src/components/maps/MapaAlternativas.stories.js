import MapaAlternativas from './MapaAlternativas';

export default {
  title: 'AlternativasUbicacion/MapaAlternativas',
  component: MapaAlternativas,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const plantaActual = { estado: 'Nuevo León', nombre: 'Monterrey' };

const alternativas = [
  {
    nombre: 'Aguascalientes', estado: 'Aguascalientes',
    riesgo: 'green', riesgoLabel: 'Bajo',
    costoTotal: '$2.2 M', recommended: true,
  },
  {
    nombre: 'San Luis Potosí', estado: 'San Luis Potosí',
    riesgo: 'green', riesgoLabel: 'Bajo',
    costoTotal: '$2.0 M',
  },
  {
    nombre: 'San Luis Potosí N.', estado: 'San Luis Potosí',
    riesgo: 'amber', riesgoLabel: 'Bajo-Medio',
    costoTotal: '$1.8 M',
  },
  {
    nombre: 'Guadalajara', estado: 'Jalisco',
    riesgo: 'red', riesgoLabel: 'Medio',
    costoTotal: '$2.4 M',
  },
];

export const ConAlternativas = {
  args: {
    plantaActual,
    alternativas,
    onSelectAlternativa: alt => console.log('Alternativa:', alt),
  },
};

export const SoloRecomendadas = {
  args: {
    plantaActual,
    alternativas: alternativas.filter(a => a.riesgo === 'green'),
    onSelectAlternativa: alt => console.log('Alternativa:', alt),
  },
};

export const SinAlternativas = {
  args: {
    plantaActual,
    alternativas: [],
  },
};
