import React from 'react';
import WaterAvailabilityMetric from './WaterAvailabilityMetric';

export default {
  title: 'HU18/WaterAvailabilityMetric',
  component: WaterAvailabilityMetric,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Positivo = {
  args: { value: 850000, variation: 5 },
};

export const Negativo = {
  args: { value: 420000, variation: -12 },
};

export const GranDecremento = {
  args: { value: 180000, variation: -28 },
};

export const Estable = {
  args: { value: 320000, variation: 0, label: 'Disponibilidad (5 años)' },
};

export const TamanoSm = {
  args: { value: 850000, variation: 5, size: 'sm' },
};

export const TamanoLg = {
  args: { value: 850000, variation: 5, size: 'lg' },
};

export const TresUbicaciones = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, fontFamily: 'sans-serif', padding: 24, background: '#f8fafc', borderRadius: 12 }}>
      <WaterAvailabilityMetric value={850000} variation={5}   label="Planta Querétaro" />
      <WaterAvailabilityMetric value={420000} variation={-12} label="Valle de México" />
      <WaterAvailabilityMetric value={180000} variation={-28} label="Planta Monterrey" />
    </div>
  ),
};
