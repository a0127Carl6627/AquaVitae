import React from 'react';
import 'leaflet/dist/leaflet.css';
import MexicoRiskMap from './MexicoRiskMap';

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
    height: { control: { type: 'range', min: 200, max: 600, step: 20 } },
    selectedEstado: { control: 'text' },
    onSelectPlanta: { action: 'planta seleccionada' },
  },
};

const mockPlantas = [
  { idPlanta: 1,  nombre: 'Planta Norte',     nombrePlanta: 'Planta Norte',     ubicacionNombre: 'Monterrey, Nuevo León',      estado: 'Nuevo León',      latitud: 25.67, longitud: -100.31, nivelRiesgo: 'ALTO',  riesgo: 'alta',  riesgoLabel: 'Alto'  },
  { idPlanta: 2,  nombre: 'Planta Centro',    nombrePlanta: 'Planta Centro',    ubicacionNombre: 'Querétaro, Querétaro',      estado: 'Querétaro',      latitud: 20.59, longitud: -100.38, nivelRiesgo: 'ALTO',  riesgo: 'alta',  riesgoLabel: 'Alto'  },
  { idPlanta: 3,  nombre: 'Planta Bajío',     nombrePlanta: 'Planta Bajío',     ubicacionNombre: 'Irapuato, Guanajuato',      estado: 'Guanajuato',     latitud: 20.67, longitud: -101.35, nivelRiesgo: 'MEDIO', riesgo: 'medio', riesgoLabel: 'Medio' },
  { idPlanta: 4,  nombre: 'Planta Pacífico',  nombrePlanta: 'Planta Pacífico',  ubicacionNombre: 'Culiacán, Sinaloa',         estado: 'Sinaloa',        latitud: 24.80, longitud: -107.39, nivelRiesgo: 'MEDIO', riesgo: 'medio', riesgoLabel: 'Medio' },
  { idPlanta: 5,  nombre: 'Planta Sureste',   nombrePlanta: 'Planta Sureste',   ubicacionNombre: 'Villahermosa, Tabasco',     estado: 'Tabasco',        latitud: 17.99, longitud: -92.92,  nivelRiesgo: 'MEDIO', riesgo: 'medio', riesgoLabel: 'Medio' },
  { idPlanta: 6,  nombre: 'Planta Noroeste',  nombrePlanta: 'Planta Noroeste',  ubicacionNombre: 'Mexicali, Baja California', estado: 'Baja California', latitud: 32.62, longitud: -115.45, nivelRiesgo: 'BAJO',  riesgo: 'bajo',  riesgoLabel: 'Bajo'  },
  { idPlanta: 7,  nombre: 'Planta Occidente', nombrePlanta: 'Planta Occidente', ubicacionNombre: 'Guadalajara, Jalisco',      estado: 'Jalisco',        latitud: 20.65, longitud: -103.34, nivelRiesgo: 'BAJO',  riesgo: 'bajo',  riesgoLabel: 'Bajo'  },
  { idPlanta: 8,  nombre: 'Planta Golfo',     nombrePlanta: 'Planta Golfo',     ubicacionNombre: 'Tampico, Tamaulipas',       estado: 'Tamaulipas',     latitud: 22.26, longitud: -97.86,  nivelRiesgo: 'BAJO',  riesgo: 'bajo',  riesgoLabel: 'Bajo'  },
];

export const Default = {
  name: 'Sin selección',
  args: {
    plantas: mockPlantas,
    height: 360,
    selectedEstado: null,
  },
};

export const ConEstadoSeleccionado = {
  name: 'Con estado seleccionado',
  args: {
    plantas: mockPlantas,
    height: 360,
    selectedEstado: 'Nuevo León',
  },
};

export const SoloRiesgoAlto = {
  name: 'Solo riesgo alto',
  args: {
    plantas: mockPlantas.map(p => ({ ...p, nivelRiesgo: 'ALTO', riesgo: 'alta', riesgoLabel: 'Alto' })),
    height: 360,
    selectedEstado: null,
  },
};

export const SinPlantas = {
  name: 'Sin plantas (mapa vacío)',
  args: {
    plantas: [],
    height: 360,
  },
};

export const MapaGrande = {
  name: 'Mapa grande',
  args: {
    plantas: mockPlantas,
    height: 500,
    selectedEstado: null,
  },
};
