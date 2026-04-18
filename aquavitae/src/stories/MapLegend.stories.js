import React from 'react';
import MapLegend from './MapLegend';

export default {
  title: 'Base Components/MapLegend',
  component: MapLegend,
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' },
  },
};

const Template = (args) => <MapLegend {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Estrés hídrico (alto / medio / bajo)';
Default.args = {};

export const Severity = Template.bind({});
Severity.storyName = 'Severidad de alertas';
Severity.args = {
  title: 'Nivel de alerta',
  items: [
    { key: 'critico',     label: 'Crítico',     color: '#ff7b72' },
    { key: 'advertencia', label: 'Advertencia', color: '#f59e0b' },
    { key: 'informativo', label: 'Informativo', color: '#94a3b8' },
  ],
};

