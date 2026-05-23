// Stories/RolesHighlight.stories.jsx
import React from 'react';
import RolesHighlight from './RolesHighlight';

export default {
  title: 'UsuarioYRoles/RolesHighlight',
  component: RolesHighlight,
};

const mockRoles = [
  { id: 1,  nombre: 'Director', descripcion: 'Acceso a reportes, alertas y simulaciones', cantidadPermisos: 24 },
  { id: 3, nombre: 'Gerente de Planta', descripcion: 'Acceso a módulos operativos de su planta', cantidadPermisos: 18 },
  { id: 4, nombre: 'Analista', descripcion: 'Acceso a reportes y análisis de su región', cantidadPermisos: 16 },
  { id: 5, nombre: 'Operador', descripcion: 'Acceso limitado a operación de planta', cantidadPermisos: 8 },
];

export const Default = () => <RolesHighlight roles={mockRoles} />;