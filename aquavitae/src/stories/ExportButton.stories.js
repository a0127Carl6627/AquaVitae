import ExportButton from './ExportButton';

const meta = {
  title: 'SCRUM-53/ExportButton',
  component: ExportButton,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Exportar CSV',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Exportar CSV',
    disabled: true,
  },
};

export const Excel = {
  args: {
    label: 'Exportar Excel',
    disabled: false,
  },
};