import AuditoriaFilters from './AuditoriaFilters';

export default {
  title: 'Auditoria/AuditoriaFilters',
  component: AuditoriaFilters,
};

export const Default = () => (
  <AuditoriaFilters
    filters={{
      accion: '',
      modulo: '',
      severidad: '',
    }}
    onChange={(filters) => console.log(filters)}
    onSearch={() => console.log('Buscar')}
  />
);