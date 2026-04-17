import ButtonEliminar from './ButtonEliminar';

export default {
  title: 'HU05/ButtonEliminar',
  component: ButtonEliminar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
    itemName: { control: 'text' },
    itemDescription: { control: 'text' },
    confirmLabel: { control: 'text' },
    showLabel: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    onConfirm: { action: 'eliminado' },
  },
};

export const IconoSolo = {
  args: {
    size: 'small',
    itemName: 'usuario',
    itemDescription: 'Estás a punto de eliminar a Ana García. Esta acción es irreversible.',
    showLabel: false,
    onConfirm: () => alert('Usuario eliminado'),
  },
};

export const ConLabel = {
  args: {
    size: 'medium',
    itemName: 'usuario',
    itemDescription: 'Estás a punto de eliminar a Rogelio Estrada. Esta acción es irreversible.',
    confirmLabel: 'Eliminar Usuario',
    showLabel: true,
    onConfirm: () => alert('Usuario eliminado'),
  },
};

export const EliminarAlerta = {
  args: {
    size: 'medium',
    itemName: 'alerta',
    itemDescription: 'Esta alerta será eliminada de forma permanente. No podrás recuperarla después.',
    confirmLabel: 'Eliminar Alerta',
    showLabel: true,
    onConfirm: () => alert('Alerta eliminada'),
  },
};

export const Pequeno = {
  args: {
    size: 'small',
    itemName: 'registro',
    showLabel: false,
    onConfirm: () => alert('Registro eliminado'),
  },
};

export const Grande = {
  args: {
    size: 'large',
    itemName: 'proyecto',
    itemDescription: 'Se eliminará el proyecto y todos sus datos asociados.',
    confirmLabel: 'Eliminar Proyecto',
    showLabel: true,
    onConfirm: () => alert('Proyecto eliminado'),
  },
};

export const ConCarga = {
  args: {
    size: 'medium',
    itemName: 'usuario',
    itemDescription: 'Estás a punto de eliminar a Ana García.',
    confirmLabel: 'Eliminar Usuario',
    showLabel: true,
    isLoading: true,
    onConfirm: () => alert('Eliminando usuario...'),
  },
};

