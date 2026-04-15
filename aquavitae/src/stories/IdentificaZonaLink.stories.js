import IdentificaZonaLink from './IdentificaZonaLink';

export default {
  title: 'HU12/IdentificaZonaLink',
  component: IdentificaZonaLink,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
    onClick: { action: 'clicked' },
  },
};

export const Default = {
  args: {},
};

export const CustomText = {
  args: {
    text: 'Ver mi región',
  },
};

export const WithCustomHref = {
  args: {
    href: '/zonas',
  },
};

export const InteractiveWithAlert = {
  args: {
    onClick: () => alert('Abriendo selector de zona...'),
  },
};