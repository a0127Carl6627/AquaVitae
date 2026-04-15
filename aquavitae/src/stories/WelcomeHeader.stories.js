import WelcomeHeader from './WelcomeHeader';

const meta = {
  title: 'HU12/WelcomeHeader',
  component: WelcomeHeader,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;

export const Default = {
  args: {},
};

export const CustomTitle = {
  args: {
    title: 'Hola de nuevo',
  },
};

export const CustomSubtitle = {
  args: {
    subtitle: 'Revisa el estado hídrico actualizado de todas las regiones.',
  },
};

export const BothCustom = {
  args: {
    title: 'Bienvenido administrador',
    subtitle: 'Aquí encontrarás el resumen ejecutivo de la disponibilidad hídrica nacional.',
  },
};