import StatCards from './StatCards';

export default {
  title: 'Dashboard/StatCards',
  component: StatCards,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};

export const Default = {
  args: {
    crisisActivas: 3,
    plantasAltoRiesgo: 2,
    plantasMedioRiesgo: 4,
    plantasBajoRiesgo: 6,
    totalPlantas: 12,
  },
};

export const SinCrisis = {
  args: {
    crisisActivas: 0,
    plantasAltoRiesgo: 0,
    plantasMedioRiesgo: 3,
    plantasBajoRiesgo: 9,
    totalPlantas: 12,
  },
};

export const CrisisTotal = {
  args: {
    crisisActivas: 12,
    plantasAltoRiesgo: 12,
    plantasMedioRiesgo: 0,
    plantasBajoRiesgo: 0,
    totalPlantas: 12,
  },
};