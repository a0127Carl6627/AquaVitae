import React from 'react';
import ApiBadge from './ApiBadge';

export default {
  title: 'HU11/ApiBadge',
  component: ApiBadge,
  argTypes: {
    status: { control: { type: 'select', options: ['active', 'inactive', 'error'] } },
    label:  { control: 'text' },
  },
};

const Template = (args) => <ApiBadge {...args} />;

export const Active = Template.bind({});
Active.storyName = 'Activo (verde)';
Active.args = { status: 'active' };

export const Inactive = Template.bind({});
Inactive.storyName = 'Inactivo (gris)';
Inactive.args = { status: 'inactive' };

export const Error = Template.bind({});
Error.storyName = 'Error (rojo)';
Error.args = { status: 'error' };

