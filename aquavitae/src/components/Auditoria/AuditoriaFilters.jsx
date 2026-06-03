const FIELD = 'h-[42px] min-w-[180px] rounded-[10px] border border-[#dbe4f0] bg-white px-3.5 text-sm text-[#172033] focus:border-[#2563eb] focus:outline-none';

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
    <div className="mb-5 flex items-center gap-3">
      <input
        type="text"
        name="accion"
        placeholder="Acción"
        value={filters.accion || ''}
        onChange={handleInputChange}
        className={FIELD}
      />

      <input
        type="text"
        name="modulo"
        placeholder="Módulo"
        value={filters.modulo || ''}
        onChange={handleInputChange}
        className={FIELD}
      />

      <select
        name="severidad"
        value={filters.severidad || ''}
        onChange={handleInputChange}
        className={FIELD}
      >
        <option value="">Todas</option>
        <option value="INFO">INFO</option>
        <option value="MEDIA">MEDIA</option>
        <option value="ALTA">ALTA</option>
      </select>

      <button
        onClick={onSearch}
        className="h-[42px] cursor-pointer rounded-[10px] border-none bg-[#2563eb] px-[18px] font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
      >
        Buscar
      </button>
    </div>
  );
}

export default AuditoriaFilters;
