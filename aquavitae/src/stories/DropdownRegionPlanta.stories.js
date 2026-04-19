import DropdownRegionPlanta from './DropdownRegionPlanta';

export default {
  title: 'HU10/DropdownRegionPlanta',
  component: DropdownRegionPlanta,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    valor: {
      control: 'select',
      options: ['Zona Norte', 'Bajío', 'Centro'],
    },
  },
};

export const ZonaNorte = { args: { valor: 'Zona Norte' } };
export const Bajio     = { args: { valor: 'Bajío' } };
export const Centro    = { args: { valor: 'Centro' } };
