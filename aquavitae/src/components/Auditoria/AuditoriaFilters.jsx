import './AuditoriaFilters.css';

function AuditoriaFilters({
  filters,
  onChange,
  onSearch,
}) {
  function handleInputChange(e) {
    onChange?.({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="auditoria-filters">
      <input
        type="text"
        name="accion"
        placeholder="Acción"
        value={filters.accion || ''}
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="modulo"
        placeholder="Módulo"
        value={filters.modulo || ''}
        onChange={handleInputChange}
      />

      <select
        name="severidad"
        value={filters.severidad || ''}
        onChange={handleInputChange}
      >
        <option value="">Todas</option>
        <option value="INFO">INFO</option>
        <option value="MEDIA">MEDIA</option>
        <option value="ALTA">ALTA</option>
      </select>

      <button onClick={onSearch}>
        Buscar
      </button>
    </div>
  );
}

export default AuditoriaFilters;