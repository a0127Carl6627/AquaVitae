import React from 'react';
import LocationComparisonCard from './LocationComparisonCard';

export default {
  title: 'HU18/LocationComparisonCard',
  component: LocationComparisonCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const meses = ['Enero','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Diciembre'];

const queretaro = {
  name: 'Planta Querétaro',
  region: 'Región Centro-Bajío',
  status: 'favorable',
  availabilityM3: 850000,
  trendPct: 5,
  barData: [
    { year: '2019', value: 720000 },
    { year: '2020', value: 760000 },
    { year: '2021', value: 790000 },
    { year: '2022', value: 810000 },
    { year: '2023', value: 850000 },
  ],
  lineData: meses.map((month, i) => ({ month, value: 30 + Math.sin(i / 2) * 10 + i * 1.5 })),
  stressLabel: 'Estrés hídrico bajo',
};

const valleMexico = {
  name: 'Valle de México',
  region: 'Acuífero Metropolitano',
  status: 'riesgo',
  availabilityM3: 420000,
  trendPct: -12,
  barData: [
    { year: '2019', value: 520000 },
    { year: '2020', value: 490000 },
    { year: '2021', value: 470000 },
    { year: '2022', value: 450000 },
    { year: '2023', value: 420000 },
  ],
  lineData: meses.map((month, i) => ({ month, value: 50 + Math.sin(i / 1.5) * 15 + i * 2 })),
  stressLabel: 'Estrés hídrico medio',
};

const monterrey = {
  name: 'Planta Monterrey',
  region: 'Región Noreste',
  status: 'critico',
  availabilityM3: 180000,
  trendPct: -28,
  barData: [
    { year: '2019', value: 350000 },
    { year: '2020', value: 300000 },
    { year: '2021', value: 260000 },
    { year: '2022', value: 210000 },
    { year: '2023', value: 180000 },
  ],
  lineData: meses.map((month, i) => ({ month, value: 65 + i * 3.5 + Math.sin(i) * 8 })),
  stressLabel: 'Estrés hídrico alto',
};

export const Favorable = {
  args: { locationData: queretaro },
};

export const EnRiesgo = {
  args: { locationData: valleMexico },
};

export const Critico = {
  args: { locationData: monterrey },
};

export const TresCardsComparadas = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 24, background: '#f0f7ff', borderRadius: 16 }}>
      {[queretaro, valleMexico, monterrey].map(loc => (
        <LocationComparisonCard key={loc.name} locationData={loc} />
      ))}
    </div>
  ),
};
