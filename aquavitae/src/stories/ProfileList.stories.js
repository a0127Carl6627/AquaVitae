import ProfileList from './ProfileList';

export default {
  title: 'HU07/ProfileList',
  component: ProfileList,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const perfiles = [
  { id: 'director',   name: 'Director',           description: 'Acceso total a reportes y configuración' },
  { id: 'supervisor', name: 'Supervisor Regional', description: 'Gestión de plantas y alertas' },
  { id: 'operador',   name: 'Operador',            description: 'Visualización de datos y registros' },
];

export const SinSeleccion = {
  args: {
    profiles: perfiles,
    selectedProfile: null,
  },
};

export const ConSeleccion = {
  args: {
    profiles: perfiles,
    selectedProfile: 'director',
  },
};

