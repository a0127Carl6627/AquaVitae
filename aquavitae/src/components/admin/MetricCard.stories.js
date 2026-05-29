// Stories/MetricCard.stories.jsx
import React from 'react';
import MetricCard from './MetricCard';

export default {
  title: 'UsuarioYRoles/MetricCard',
  component: MetricCard,
  argTypes: {
    icon: {
      control: { type: 'select', options: ['users', 'roles', 'permissions', 'activity'] },
    },
    value: { control: 'text' },
    subtitle: { control: 'text' },
    title: { control: 'text' },
  },
};

const Template = (args) => <MetricCard {...args} />;

export const UsuariosActivos = Template.bind({});
UsuariosActivos.args = {
  title: 'Usuarios activos',
  value: '48',
  subtitle: 'De 60 registrados',
  icon: 'users',
};

export const RolesDefinidos = Template.bind({});
RolesDefinidos.args = {
  title: 'Roles definidos',
  value: '7',
  subtitle: 'Perfiles configurados',
  icon: 'roles',
};

export const PermisosAsignados = Template.bind({});
PermisosAsignados.args = {
  title: 'Permisos asignados',
  value: '126',
  subtitle: 'A módulos y datos',
  icon: 'permissions',
};

export const ActividadReciente = Template.bind({});
ActividadReciente.args = {
  title: 'Actividad reciente',
  value: '23',
  subtitle: 'Cambios en los últimos 7 días',
  icon: 'activity',
};