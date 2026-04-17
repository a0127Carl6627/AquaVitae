import MiniMapLocation from './MiniMapLocation';

export default {
  title: 'HU03/MiniMapLocation',
  component: MiniMapLocation,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Critico = {
  args: {
    coordinates: { lat: 19.4326, lng: -99.1332 },
    locationName: 'Acuífero Valle de México',
    riskLevel: 'critico',
    riskValue: '15%',
    radius: 12.5,
  },
};

export const Advertencia = {
  args: {
    coordinates: { lat: 20.6597, lng: -103.3496 },
    locationName: 'Región Bajío - Zona Norte',
    riskLevel: 'advertencia',
    riskValue: '32%',
    radius: 8.2,
  },
};

export const Ok = {
  args: {
    coordinates: { lat: 25.6866, lng: -100.3161 },
    locationName: 'Planta Industrial Querétaro',
    riskLevel: 'ok',
    riskValue: '70%',
    radius: 5.0,
  },
};
