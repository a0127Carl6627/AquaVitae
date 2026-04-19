import GenerateFeasibilityReportButton from './GenerateFeasibilityReportButton';

const meta = {
  title: 'SCRUM-49/GenerateFeasibilityReportButton',
  component: GenerateFeasibilityReportButton,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Generar Reporte de Factibilidad',
    disabled: false,
  },
};

export const Disabled = {
  args: {
    label: 'Generar Reporte de Factibilidad',
    disabled: true,
  },
};