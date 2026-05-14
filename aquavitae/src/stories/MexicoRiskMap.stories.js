import React from 'react';
import 'leaflet/dist/leaflet.css';
import MexicoRiskMap from './MexicoRiskMap';

/**
 * El decorador importa el CSS de Leaflet una sola vez para todas las stories.
 * Sin esto el mapa se ve sin estilos en Storybook.
 */
export default {
  title: 'Dashboard/MexicoRiskMap',
  component: MexicoRiskMap,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    altura: { control: 'text' },
  },
};

const mockPlantas = [
  { idPlanta: 1,  nombrePlanta: 'Planta Norte',     ubicacionNombre: 'Monterrey, NL',     latitud: 25.67, longitud: -100.31, nivelRiesgo: 'ALTO'       },
  { idPlanta: 2,  nombrePlanta: 'Planta Centro',    ubicacionNombre: 'Querétaro, QRO',    latitud: 20.59, longitud: -100.38, nivelRiesgo: 'ALTO'       },
  { idPlanta: 3,  nombrePlanta: 'Planta Bajo',      ubicacionNombre: 'Irapuato, GTO',     latitud: 20.67, longitud: -101.35, nivelRiesgo: 'MEDIO'      },
  { idPlanta: 4,  nombrePlanta: 'Planta Pacífico',  ubicacionNombre: 'Culiacán, SIN',     latitud: 24.80, longitud: -107.39, nivelRiesgo: 'MEDIO'      },
  { idPlanta: 5,  nombrePlanta: 'Planta Sureste',   ubicacionNombre: 'Villahermosa, TAB', latitud: 17.99, longitud: -92.92,  nivelRiesgo: 'MEDIO'      },
  { idPlanta: 6,  nombrePlanta: 'Planta Noroeste',  ubicacionNombre: 'Mexicali, BC',      latitud: 32.62, longitud: -115.45, nivelRiesgo: 'BAJO'       },
  { idPlanta: 7,  nombrePlanta: 'Planta Occidente', ubicacionNombre: 'Guadalajara, JAL',  latitud: 20.65, longitud: -103.34, nivelRiesgo: 'BAJO'       },
  { idPlanta: 8,  nombrePlanta: 'Planta Golfo',     ubicacionNombre: 'Tampico, TAM',      latitud: 22.26, longitud: -97.86,  nivelRiesgo: 'SIN_RIESGO' },
  { idPlanta: 9,  nombrePlanta: 'Planta Sur',       ubicacionNombre: 'Oaxaca, OAX',       latitud: 17.07, longitud: -96.72,  nivelRiesgo: 'SIN_RIESGO' },
  { idPlanta: 10, nombrePlanta: 'Planta Bajío',     ubicacionNombre: 'León, GTO',         latitud: 21.12, longitud: -101.68, nivelRiesgo: 'SIN_RIESGO' },
  { idPlanta: 11, nombrePlanta: 'Planta Laguna',    ubicacionNombre: 'Torreón, COAH',     latitud: 25.54, longitud: -103.43, nivelRiesgo: 'MEDIO'      },
  { idPlanta: 12, nombrePlanta: 'Planta Yucatán',   ubicacionNombre: 'Mérida, YUC',       latitud: 20.97, longitud: -89.62,  nivelRiesgo: 'BAJO'       },
];

export const Default = {
  args: {
    plantas: mockPlantas,
    altura: '360px',
  },
};

export const SoloAlto = {
  args: {
    plantas: mockPlantas.map((p) => ({ ...p, nivelRiesgo: 'ALTO' })),
    altura: '360px',
  },
};

export const SinPlantas = {
  args: {
    plantas: [],
    altura: '360px',
  },
};

export const MapaAlto = {
  args: {
    plantas: mockPlantas,
    altura: '500px',
  },
};