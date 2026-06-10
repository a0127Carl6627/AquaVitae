import TablaCostosUbicacion from './TablaCostosUbicacion';

export default {
  title: 'AlternativasUbicacion/TablaCostosUbicacion',
  component: TablaCostosUbicacion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const alternativas = [
  {
    nombre: 'Aguascalientes', estado: 'Aguascalientes',
    costoCierre: '$0.8 M', tiempoCierre: '25 días',
    costoApertura: '$1.4 M', tiempoApertura: '30–45 días',
    costoTotal: '$2.2 M', recommended: true,
  },
  {
    nombre: 'San Luis Potosí', estado: 'San Luis Potosí',
    costoCierre: '$0.8 M', tiempoCierre: '20 días',
    costoApertura: '$1.2 M', tiempoApertura: '30–40 días',
    costoTotal: '$2.0 M',
  },
  {
    nombre: 'San Luis Potosí N.', estado: 'San Luis Potosí',
    costoCierre: '$0.7 M', tiempoCierre: '22 días',
    costoApertura: '$1.1 M', tiempoApertura: '35–45 días',
    costoTotal: '$1.8 M',
  },
  {
    nombre: 'Guadalajara', estado: 'Jalisco',
    costoCierre: '$0.9 M', tiempoCierre: '30 días',
    costoApertura: '$1.5 M', tiempoApertura: '40–55 días',
    costoTotal: '$2.4 M',
  },
];

export const CuatroUbicaciones = {
  args: {
    alternativas,
    onSelectAlternativa: alt => console.log('Alternativa seleccionada:', alt),
  },
};

export const DosUbicaciones = {
  args: {
    alternativas: alternativas.slice(0, 2),
    onSelectAlternativa: alt => console.log('Alternativa seleccionada:', alt),
  },
};
