import AlertaBannerHidrico from './AlertaBannerHidrico';

export default {
  title: 'AlternativasUbicacion/AlertaBannerHidrico',
  component: AlertaBannerHidrico,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Monterrey = {
  args: {
    plantaNombre: 'Planta Monterrey',
    estresActual: 85,
    cierreRecomendadoDias: 60,
    costoApertura: '$2.4 M',
    costoOperacion: '$3.1 M',
    diasApertura: '45–60',
  },
};

export const Hermosillo = {
  args: {
    plantaNombre: 'Planta Hermosillo',
    estresActual: 79,
    cierreRecomendadoDias: 45,
    costoApertura: '$1.8 M',
    costoOperacion: '$2.6 M',
    diasApertura: '30–50',
  },
};

export const Tijuana = {
  args: {
    plantaNombre: 'Planta Tijuana',
    estresActual: 91,
    cierreRecomendadoDias: 30,
    costoApertura: '$3.0 M',
    costoOperacion: '$4.2 M',
    diasApertura: '60–75',
  },
};
