import React from 'react';
import MapBase from './MapBase';

export default {
  title: 'Base Components/MapBase',
  component: MapBase,
  argTypes: {
    height: { control: { type: 'range', min: 200, max: 600, step: 20 } },
    pins:   { control: 'object' },
  },
};

const Template = (args) => <MapBase {...args} />;

export const Empty = Template.bind({});
Empty.storyName = 'Sin pins';
Empty.args = { height: 320, pins: [] };

export const WithPins = Template.bind({});
WithPins.storyName = 'Con pins de colores';
WithPins.args = {
  height: 320,
  pins: [
    { x: 25, y: 30, severity: 'alto',  label: 'Tijuana' },
    { x: 65, y: 28, severity: 'alto',  label: 'Monterrey' },
    { x: 48, y: 55, severity: 'medio', label: 'CDMX' },
    { x: 80, y: 62, severity: 'bajo',  label: 'Cancún' },
  ],
};

export const OnlyHighRisk = Template.bind({});
OnlyHighRisk.storyName = 'Solo riesgo alto';
OnlyHighRisk.args = {
  height: 320,
  pins: [
    { x: 30, y: 35, severity: 'alto', label: 'Zona Norte' },
    { x: 60, y: 45, severity: 'alto', label: 'Zona Este'  },
  ],
};