import DataScopeChips from './DataScopeChips';

export default {
  title: 'HU07/DataScopeChips',
  component: DataScopeChips,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Vacio = {
  args: { regions: [] },
};

export const MultipleChips = {
  args: {
    regions: ['América Latina', 'Europa Occidental', 'Asia Pacífico'],
    onRemoveRegion: (region) => console.log('Eliminar:', region),
  },
};
