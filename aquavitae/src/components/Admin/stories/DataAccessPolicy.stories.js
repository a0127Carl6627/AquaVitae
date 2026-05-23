// Stories/DataAccessPolicy.stories.jsx
import React from 'react';
import DataAccessPolicy from './DataAccessPolicy';

export default {
  title: 'UsuarioYRoles/DataAccessPolicy',
  component: DataAccessPolicy,
};

const mockPoliticas = [
  { rol:  'Director', acceso: 'Todas las regiones y plantas' },
  { rol: 'Gerente de Planta', acceso: 'Solo su planta asignada' },
  { rol: 'Analista', acceso: 'Solo su región asignada' },
  { rol: 'Operador', acceso: 'Solo su planta asignada' },
];

export const Default = () => <DataAccessPolicy politicas={mockPoliticas} />;