import PermissionsTogglePanel from './PermissionsTogglePanel';

export default {
  title: 'HU07/PermissionsTogglePanel',
  component: PermissionsTogglePanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const todosActivos = [
  { name: 'Dashboard',  description: 'Visualización de paneles generales',     enabled: true  },
  { name: 'Alertas',    description: 'Gestión y notificación de riesgos',       enabled: true  },
  { name: 'Simulación', description: 'Modelos predictivos de estrés hídrico',   enabled: true  },
  { name: 'Auditoría',  description: 'Registro histórico de cambios',           enabled: true  },
  { name: 'API Keys',   description: 'Integración con sistemas externos',       enabled: true  },
];

const mixto = [
  { name: 'Dashboard',  description: 'Visualización de paneles generales',     enabled: true  },
  { name: 'Alertas',    description: 'Gestión y notificación de riesgos',       enabled: true  },
  { name: 'Simulación', description: 'Modelos predictivos de estrés hídrico',   enabled: true  },
  { name: 'Auditoría',  description: 'Registro histórico de cambios',           enabled: false },
  { name: 'API Keys',   description: 'Integración con sistemas externos',       enabled: false },
];

const todosInactivos = [
  { name: 'Dashboard',  description: 'Visualización de paneles generales',     enabled: false },
  { name: 'Alertas',    description: 'Gestión y notificación de riesgos',       enabled: false },
  { name: 'Simulación', description: 'Modelos predictivos de estrés hídrico',   enabled: false },
  { name: 'Auditoría',  description: 'Registro histórico de cambios',           enabled: false },
  { name: 'API Keys',   description: 'Integración con sistemas externos',       enabled: false },
];

export const TodosActivos   = { args: { permissions: todosActivos   } };
export const Mixto          = { args: { permissions: mixto          } };
export const TodosInactivos = { args: { permissions: todosInactivos } };
