import PlantasOperativasCounter from './PlantasOperativasCounter';

export default {
  title: 'HU17/PlantasOperativasCounter',
  component: PlantasOperativasCounter,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    count: { control: { type: 'number', min: 0, step: 1 } },
    label: { control: 'text' },
  },
};

export const Default = {
  args: {
    count: 3,
  },
};

export const ZeroPlants = {
  args: {
    count: 0,
  },
};

export const HighNumber = {
  args: {
    count: 12,
  },
};

export const CustomLabel = {
  args: {
    count: 5,
    label: "INSTALACIONES ACTIVAS",
  },
};