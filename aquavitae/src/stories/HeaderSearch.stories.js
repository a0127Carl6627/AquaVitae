import HeaderSearch from './HeaderSearch';

const meta = {
  title: 'SCRUM-44/HeaderSearch',
  component: HeaderSearch,
  argTypes: {
    title: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

export const Default = {
  args: {
    title: 'Índice de Estrés Hídrico',
    placeholder: 'Buscar región o estado...',
  },
};

export const CustomTitle = {
  args: {
    title: 'Dashboard de Agua',
    placeholder: 'Buscar...',
  },
};