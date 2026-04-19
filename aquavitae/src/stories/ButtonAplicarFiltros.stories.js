import ButtonAplicarFiltros from './ButtonAplicarFiltros';

export default {
  title: 'HU02/ButtonAplicarFiltros',
  component: ButtonAplicarFiltros,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export const Default = {
  args: {
    label: 'Aplicar Filtros',
    disabled: false,
    onClick: () => alert('Filtros aplicados'),
  },
};

export const Disabled = {
  args: {
    label: 'Aplicar Filtros',
    disabled: true,
    onClick: () => alert('El botón está deshabilitado'),
  },
};
