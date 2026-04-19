import SpecificPermissionsPanel from './SpecificPermissionsPanel';

export default {
  title: 'HU07/SpecificPermissionsPanel',
  component: SpecificPermissionsPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const director = [
  {
    module: 'Dashboard',
    items: [
      { name: 'Solo lectura',      description: 'Ver paneles sin modificar',         enabled: false },
      { name: 'Edición',           description: 'Modificar configuración de paneles', enabled: true  },
      { name: 'Exportar',          description: 'Descargar reportes y gráficas',      enabled: true  },
    ],
  },
  {
    module: 'Alertas',
    items: [
      { name: 'Crear alertas',     description: 'Generar nuevas alertas manuales',    enabled: true  },
      { name: 'Eliminar alertas',  description: 'Borrar alertas del sistema',         enabled: true  },
    ],
  },
];

const operador = [
  {
    module: 'Dashboard',
    items: [
      { name: 'Solo lectura',      description: 'Ver paneles sin modificar',         enabled: true  },
      { name: 'Edición',           description: 'Modificar configuración de paneles', enabled: false },
      { name: 'Exportar',          description: 'Descargar reportes y gráficas',      enabled: false },
    ],
  },
  {
    module: 'Alertas',
    items: [
      { name: 'Crear alertas',     description: 'Generar nuevas alertas manuales',    enabled: false },
      { name: 'Eliminar alertas',  description: 'Borrar alertas del sistema',         enabled: false },
    ],
  },
];

export const Director = { args: { permissions: director } };
export const Operador  = { args: { permissions: operador  } };
