import AreaConfidenceBand from './AreaConfidenceBand';

export default {
  title: 'HU10/AreaConfidenceBand',
  component: AreaConfidenceBand,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const data = [
  { label: 'Hoy',      value: 30, upper: 38, lower: 22 },
  { label: '+10 días', value: 35, upper: 45, lower: 25 },
  { label: '+20 días', value: 42, upper: 54, lower: 30 },
  { label: '+30 días', value: 50, upper: 63, lower: 37 },
  { label: '+40 días', value: 55, upper: 70, lower: 40 },
  { label: '+50 días', value: 62, upper: 78, lower: 46 },
  { label: '+60 días', value: 68, upper: 84, lower: 52 },
  { label: '+70 días', value: 72, upper: 88, lower: 56 },
  { label: '+80 días', value: 70, upper: 86, lower: 54 },
  { label: '+90 días', value: 74, upper: 90, lower: 58 },
];

export const ConIntervalo = {
  args: { data, showBand: true },
};

export const SinIntervalo = {
  args: { data, showBand: false },
};
