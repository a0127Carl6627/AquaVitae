import MapaRiesgoHidrico from './MapaRiesgoHidrico';

export default {
  title: 'SimulacionHidrica/MapaRiesgoHidrico',
  component: MapaRiesgoHidrico,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const plantasAlta = [
  { estado: 'Nuevo León', nombre: 'Monterrey', riesgo: 'alta', riesgoLabel: 'Alto', indice: 88 },
  { estado: 'Sonora', nombre: 'Hermosillo', riesgo: 'alta', riesgoLabel: 'Alto', indice: 82 },
  { estado: 'Baja California', nombre: 'Mexicali', riesgo: 'media', riesgoLabel: 'Medio', indice: 61 },
  { estado: 'Chihuahua', nombre: 'Chihuahua Norte', riesgo: 'media', riesgoLabel: 'Medio', indice: 57 },
  { estado: 'Jalisco', nombre: 'Guadalajara', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 28 },
  { estado: 'Veracruz', nombre: 'Veracruz Puerto', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 19 },
];

const plantasMedia = [
  { estado: 'Nuevo León', nombre: 'Monterrey', riesgo: 'media', riesgoLabel: 'Medio', indice: 62 },
  { estado: 'Sonora', nombre: 'Hermosillo', riesgo: 'media', riesgoLabel: 'Medio', indice: 55 },
  { estado: 'Jalisco', nombre: 'Guadalajara', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 31 },
  { estado: 'Veracruz', nombre: 'Veracruz Puerto', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 22 },
];

const plantasBaja = [
  { estado: 'Nuevo León', nombre: 'Monterrey', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 24 },
  { estado: 'Jalisco', nombre: 'Guadalajara', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 18 },
  { estado: 'Veracruz', nombre: 'Veracruz Puerto', riesgo: 'bajo', riesgoLabel: 'Bajo', indice: 12 },
];

export const RiesgoAlto = {
  args: {
    plantas: plantasAlta,
    onSelectPlanta: planta => console.log('Planta seleccionada:', planta),
  },
};

export const RiesgoMedio = {
  args: {
    plantas: plantasMedia,
    onSelectPlanta: planta => console.log('Planta seleccionada:', planta),
  },
};

export const RiesgoBajo = {
  args: {
    plantas: plantasBaja,
    onSelectPlanta: planta => console.log('Planta seleccionada:', planta),
  },
};

export const SinDatos = {
  args: {
    plantas: [],
    onSelectPlanta: planta => console.log('Planta seleccionada:', planta),
  },
};
