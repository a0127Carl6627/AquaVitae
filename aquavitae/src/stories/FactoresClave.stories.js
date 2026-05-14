import FactoresClave from './FactoresClave';

export default {
  title: 'AlternativasUbicacion/FactoresClave',
  component: FactoresClave,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const factoresRecomendada = [
  { nombre: 'Disponibilidad hídrica',  icon: 'water',  puntos: 4, color: '#2563eb' },
  { nombre: 'Costos operativos',       icon: 'money',  puntos: 5, color: '#2ea36b' },
  { nombre: 'Tiempo de reactivación',  icon: 'clock',  puntos: 3, color: '#e89923' },
  { nombre: 'Regulación ambiental',    icon: 'shield', puntos: 4, color: '#7c3aed' },
  { nombre: 'Distancia logística',     icon: 'truck',  puntos: 2, color: '#d97706' },
];

const factoresRiesgoAlto = [
  { nombre: 'Disponibilidad hídrica',  icon: 'water',  puntos: 2, color: '#2563eb' },
  { nombre: 'Costos operativos',       icon: 'money',  puntos: 2, color: '#2ea36b' },
  { nombre: 'Tiempo de reactivación',  icon: 'clock',  puntos: 1, color: '#e89923' },
  { nombre: 'Regulación ambiental',    icon: 'shield', puntos: 3, color: '#7c3aed' },
  { nombre: 'Distancia logística',     icon: 'truck',  puntos: 4, color: '#d97706' },
];

export const UbicacionRecomendada = {
  args: {
    titulo: 'Aguascalientes · Recomendada',
    factores: factoresRecomendada,
  },
};

export const UbicacionRiesgoAlto = {
  args: {
    titulo: 'Guadalajara · Riesgo medio',
    factores: factoresRiesgoAlto,
  },
};
