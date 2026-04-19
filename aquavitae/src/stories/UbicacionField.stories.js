import UbicacionField from './UbicacionField';

export default {
  title: 'HU17/UbicacionField',
  component: UbicacionField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    location: { control: 'text' },
  },
};

export const Default = {
  args: {
    location: 'Edo. Mex, MX',
  },
};

export const CustomLocation = {
  args: {
    label: 'UBICACIÓN',
    location: 'Jalisco, MX',
  },
};

export const DifferentLabel = {
  args: {
    label: 'REGIÓN',
    location: 'Norte, MX',
  },
};

export const LongLocation = {
  args: {
    location: 'Nuevo León, Coahuila, Tamaulipas, MX',
  },
};