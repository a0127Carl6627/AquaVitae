import PlantRiskList from './PlantRiskList';

export default {
  title: 'Dashboard/PlantRiskList',
  component: PlantRiskList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

const plantMock = [
  {
    idPlanta: 1,
    nombrePlanta: 'Planta Norte',
    ubicacionNombre: 'Monterrey, NL',
    nivelRiesgo: 'ALTO',
    indiceHidrico: 0.78,
  },
  {
    idPlanta: 2,
    nombrePlanta: 'Planta Centro',
    ubicacionNombre: 'Querétaro, QRO',
    nivelRiesgo: 'ALTO',
    indiceHidrico: 0.72,
  },
  {
    idPlanta: 3,
    nombrePlanta: 'Planta Bajío',
    ubicacionNombre: 'Irapuato, GTO',
    nivelRiesgo: 'MEDIO',
    indiceHidrico: 0.54,
  },
  {
    idPlanta: 4,
    nombrePlanta: 'Planta Pacífico',
    ubicacionNombre: 'Culiacán, SIN',
    nivelRiesgo: 'MEDIO',
    indiceHidrico: 0.46,
  },
  {
    idPlanta: 5,
    nombrePlanta: 'Planta Sureste',
    ubicacionNombre: 'Villahermosa, TAB',
    nivelRiesgo: 'MEDIO',
    indiceHidrico: 0.43,
  },
  {
    idPlanta: 6,
    nombrePlanta: 'Planta Noroeste',
    ubicacionNombre: 'Mexicali, BC',
    nivelRiesgo: 'BAJO',
    indiceHidrico: 0.38,
  },
  {
    idPlanta: 7,
    nombrePlanta: 'Planta Occidente',
    ubicacionNombre: 'Guadalajara, JAL',
    nivelRiesgo: 'BAJO',
    indiceHidrico: 0.32,
  },
  {
    idPlanta: 8,
    nombrePlanta: 'Planta Golfo',
    ubicacionNombre: 'Tampico, TAM',
    nivelRiesgo: 'BAJO',
    indiceHidrico: 0.30,
  },
];

export const ConDatos = {
  args: {
    plants: plantMock,
  },
};

export const ListaVacia = {
  args: {
    plants: [],
  },
};