import React, { useState } from 'react';
import PlantAlertFilterToggle from './PlantAlertFilterToggle';
import ButtonAplicarFiltros from './ButtonAplicarFiltros';

const styles = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  select: {
    appearance: 'none',
    background: '#ffffff',
    border: '0.5px solid #d0e8f0',
    borderRadius: 8,
    padding: '7px 28px 7px 10px',
    fontSize: 13,
    fontFamily: 'sans-serif',
    color: '#1a2b4a',
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 9px center',
    minWidth: 140,
  },
  searchWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 9,
    width: 14,
    height: 14,
    stroke: '#94a3b8',
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round',
  },
  searchInput: {
    border: '0.5px solid #d0e8f0',
    borderRadius: 8,
    padding: '7px 10px 7px 28px',
    fontSize: 13,
    fontFamily: 'sans-serif',
    color: '#1a2b4a',
    outline: 'none',
    minWidth: 180,
    background: '#ffffff',
  },
  toggleWrap: {
    display: 'flex',
    border: '0.5px solid #d0e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    background: '#ffffff',
  },
  toggleBtn: {
    padding: '7px 14px',
    fontSize: 13,
    fontFamily: 'sans-serif',
    border: 'none',
    cursor: 'pointer',
    background: 'transparent',
    color: '#64748b',
  },
  toggleBtnActive: {
    background: '#e8f4ff',
    color: '#2F9EF3',
    fontWeight: 500,
  },
};

export default function FilterBar({
  // Opciones de los selects
  dateRangeOptions  = ['Últimos 7 días', 'Últimos 30 días', 'Este mes', 'Personalizado'],
  userOptions       = ['Todos los usuarios', 'admin_user', 'j_perez', 'm_garcia'],
  actionTypeOptions = ['Todos los tipos', 'UPDATE', 'CREATE', 'DELETE', 'LOGIN'],
  moduleOptions     = ['Todos los módulos', 'Configuración', 'Usuarios', 'Seguridad'],
  statusOptions     = ['TODOS', 'NO LEÍDOS'],

  // Flags para mostrar/ocultar secciones
  showSearch          = false,
  showStatus          = false,
  showApply           = true,
  showPlantAlertToggle = false,

  onApply,
  onChange,
}) {
  const [dateRange,    setDateRange]    = useState(dateRangeOptions[0]);
  const [user,         setUser]         = useState(userOptions[0]);
  const [actionType,   setActionType]   = useState(actionTypeOptions[0]);
  const [module,       setModule]       = useState(moduleOptions[0]);
  const [activeStatus, setActiveStatus] = useState(statusOptions[0]);
  const [search,       setSearch]       = useState('');

  function emit(patch) {
    onChange?.({ dateRange, user, actionType, module, activeStatus, search, ...patch });
  }

  return (
    <div style={styles.bar}>

      {showPlantAlertToggle && <PlantAlertFilterToggle />}

      <select
        style={styles.select}
        value={dateRange}
        onChange={(e) => { setDateRange(e.target.value); emit({ dateRange: e.target.value }); }}
      >
        {dateRangeOptions.map((o) => <option key={o}>{o}</option>)}
      </select>

      <select
        style={styles.select}
        value={user}
        onChange={(e) => { setUser(e.target.value); emit({ user: e.target.value }); }}
      >
        {userOptions.map((o) => <option key={o}>{o}</option>)}
      </select>

      <select
        style={styles.select}
        value={actionType}
        onChange={(e) => { setActionType(e.target.value); emit({ actionType: e.target.value }); }}
      >
        {actionTypeOptions.map((o) => <option key={o}>{o}</option>)}
      </select>

      <select
        style={styles.select}
        value={module}
        onChange={(e) => { setModule(e.target.value); emit({ module: e.target.value }); }}
      >
        {moduleOptions.map((o) => <option key={o}>{o}</option>)}
      </select>

      {showStatus && (
        <div style={styles.toggleWrap}>
          {statusOptions.map((s) => (
            <button
              key={s}
              style={{
                ...styles.toggleBtn,
                ...(activeStatus === s ? styles.toggleBtnActive : {}),
              }}
              onClick={() => { setActiveStatus(s); emit({ activeStatus: s }); }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Búsqueda */}
      {showSearch && (
        <div style={styles.searchWrap}>
          <svg style={styles.searchIcon} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            style={styles.searchInput}
            placeholder="Buscar registros..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); emit({ search: e.target.value }); }}
          />
        </div>
      )}

      {showApply && (
        <ButtonAplicarFiltros onClick={onApply} />
      )}

    </div>
  );
}