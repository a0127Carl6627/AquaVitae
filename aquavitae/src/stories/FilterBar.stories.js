import React from 'react';
import FilterBar from './FilterBar';

export default {
  title: 'Base Components/FilterBar',
  component: FilterBar,
  argTypes: {
    showSearch: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    showApply:  { control: 'boolean' },
    onApply:    { action: 'applied' },
    onChange:   { action: 'changed' },
  },
};

const Template = (args) => <FilterBar {...args} />;

export const Auditoria = Template.bind({});
Auditoria.storyName = 'Vista auditoría (con búsqueda)';
Auditoria.args = { showSearch: true, showStatus: false, showApply: true };

export const Alertas = Template.bind({});
Alertas.storyName = 'Vista alertas (con toggle estado)';
Alertas.args = {
  showSearch: false,
  showStatus: true,
  showApply:  true,
  dateRangeOptions:  ['Últimos 7 días', 'Últimos 30 días', 'Este mes'],
  userOptions:       ['Todos los usuarios'],
  actionTypeOptions: ['Todos los tipos', 'Crítico', 'Advertencia', 'Informativo'],
  moduleOptions:     ['Todos los módulos'],
};

