import React from 'react';
import StatsGrid from './StatsGrid';

export default {
  title: 'UsuarioYRoles/StatsGrid',
  component: StatsGrid,
};

const mockStats = [
  { title: 'Usuarios activos', value: '48', subtitle: 'De 60 registrados', icon: 'users' },
  { title: 'Roles definidos', value: '7', subtitle: 'Perfiles configurados', icon: 'roles' },
  { title: 'Permisos asignados', value: '126', subtitle: 'A módulos y datos', icon: 'permissions' },
  { title: 'Actividad reciente', value: '23', subtitle: 'Cambios en los últimos 7 días', icon: 'activity' },
];

export const Default = () => <StatsGrid stats={mockStats} />;