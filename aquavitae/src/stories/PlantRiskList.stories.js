import PlantRiskList from './PlantRiskList';

export default {
  title: 'Dashboard/PlantRiskList',
  component: PlantRiskList,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    selectedId: { control: 'number' },
    onSelectPlanta: { action: 'planta seleccionada' },
  },
};

const plantMock = [
  { idPlanta: 1, nombrePlanta: 'Planta Norte',     ubicacionNombre: 'Monterrey, NL',     nivelRiesgo: 'ALTO',  indiceHidrico: 0.78, tendencia: 'SUBIENDO' },
  { idPlanta: 2, nombrePlanta: 'Planta Centro',    ubicacionNombre: 'Querétaro, QRO',    nivelRiesgo: 'ALTO',  indiceHidrico: 0.72, tendencia: 'ESTABLE'  },
  { idPlanta: 3, nombrePlanta: 'Planta Bajío',     ubicacionNombre: 'Irapuato, GTO',     nivelRiesgo: 'MEDIO', indiceHidrico: 0.54, tendencia: 'BAJANDO'  },
  { idPlanta: 4, nombrePlanta: 'Planta Pacífico',  ubicacionNombre: 'Culiacán, SIN',     nivelRiesgo: 'MEDIO', indiceHidrico: 0.46, tendencia: 'ESTABLE'  },
  { idPlanta: 5, nombrePlanta: 'Planta Sureste',   ubicacionNombre: 'Villahermosa, TAB', nivelRiesgo: 'MEDIO', indiceHidrico: 0.43, tendencia: 'BAJANDO'  },
  { idPlanta: 6, nombrePlanta: 'Planta Noroeste',  ubicacionNombre: 'Mexicali, BC',      nivelRiesgo: 'BAJO',  indiceHidrico: 0.38, tendencia: 'BAJANDO'  },
  { idPlanta: 7, nombrePlanta: 'Planta Occidente', ubicacionNombre: 'Guadalajara, JAL',  nivelRiesgo: 'BAJO',  indiceHidrico: 0.32, tendencia: 'ESTABLE'  },
  { idPlanta: 8, nombrePlanta: 'Planta Golfo',     ubicacionNombre: 'Tampico, TAM',      nivelRiesgo: 'BAJO',  indiceHidrico: 0.30, tendencia: 'BAJANDO'  },
];

export const ConDatos = {
  name: 'Sin selección',
  args: {
    plants: plantMock,
    selectedId: null,
  },
};

export const ConPlantaSeleccionada = {
  name: 'Con planta seleccionada',
  args: {
    plants: plantMock,
    selectedId: 1,
  },
};

export const SoloAltoRiesgo = {
  name: 'Solo riesgo alto',
  args: {
    plants: plantMock.filter(p => p.nivelRiesgo === 'ALTO'),
    selectedId: null,
  },
};

export const ListaVacia = {
  name: 'Lista vacía',
  args: {
    plants: [],
  },
};
