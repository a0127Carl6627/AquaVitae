import ProjectionTooltip from './ProjectionTooltip';

export default {
  title: 'HU10/ProjectionTooltip',
  component: ProjectionTooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Ascendente = {
  args: {
    value: '72.4%',
    label: 'Proyectado (Día 60)',
    trend: 'up',
  },
};

export const Descendente = {
  args: {
    value: '45.2%',
    label: 'Proyectado (Día 30)',
    trend: 'down',
  },
};
