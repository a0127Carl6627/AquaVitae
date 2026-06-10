import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ActionBadge from '../ui/ActionBadge';

// Mapeo de tendencia a dirección y color
const TENDENCIA_CONFIG = {
  BAJANDO: { direction: 'down', color: '#22c55e', rotate: 180, label: '↓' },
  ESTABLE: { direction: 'right', color: '#f97316', rotate: 0, label: '→' },
  SUBIENDO: { direction: 'up', color: '#ef4444', rotate: 0, label: '↑' },
};

// Componente de flecha SVG
function TrendArrow({ tendencia }) {
  const config = TENDENCIA_CONFIG[tendencia] ?? TENDENCIA_CONFIG.ESTABLE;
  const { color, rotate } = config;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('transition-transform duration-200 ease', rotate === 180 && 'rotate-180')}
    >
      {tendencia === 'BAJANDO' && <polyline points="18 15 12 9 6 15" />}
      {tendencia === 'SUBIENDO' && <polyline points="18 9 12 15 6 9" />}
      {tendencia === 'ESTABLE' && <line x1="5" y1="12" x2="19" y2="12" />}
    </svg>
  );
}

export default function PlantRiskList({ plants = [], selectedId = null, onSelectPlanta }) {
  // Estados para filtros y paginación
  const [riskFilter, setRiskFilter] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Obtener lista única de nombres de plantas para autocompletado
  const allPlantNames = [...new Set(plants.map(p => p.nombrePlanta))].sort();

  // Filtrar plantas por nivel de riesgo y búsqueda
  const filteredPlants = plants.filter(plant => {
    const matchesRisk = riskFilter === 'TODOS' || plant.nivelRiesgo === riskFilter;
    const matchesSearch = searchTerm === '' ||
      plant.nombrePlanta.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  // Paginación
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlants = filteredPlants.slice(startIndex, startIndex + itemsPerPage);

  // Resetear página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [riskFilter, searchTerm]);

  // Saltar a la página donde está la planta seleccionada (ej. al elegirla en el mapa)
  useEffect(() => {
    if (selectedId == null) return;
    const idx = filteredPlants.findIndex(p => p.idPlanta === selectedId);
    if (idx >= 0) {
      setCurrentPage(Math.floor(idx / itemsPerPage) + 1);
    }
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sugerencias para el datalist
  const matchingSuggestions = allPlantNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (plants.length === 0) {
    return (
      <p className="font-sans">
        No hay datos de plantas.
      </p>
    );
  }

  return (
    <div className="font-sans">
      {/* Controles de filtro y búsqueda */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 text-[15px] font-medium text-gray-900">
          Plantas por nivel de riesgo
        </h3>
        <div className="flex flex-wrap gap-3">
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="cursor-pointer rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[13px]"
          >
            <option value="TODOS">Todos los niveles</option>
            <option value="ALTO">Alto riesgo</option>
            <option value="MEDIO">Medio riesgo</option>
            <option value="BAJO">Bajo riesgo</option>
          </select>

          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              list="plant-names"
              className="w-[200px] rounded-md border border-gray-200 px-3 py-1.5 text-[13px]"
            />
            <datalist id="plant-names">
              {matchingSuggestions.map(name => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>

          {(riskFilter !== 'TODOS' || searchTerm !== '') && (
            <button
              onClick={() => {
                setRiskFilter('TODOS');
                setSearchTerm('');
              }}
              className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-[13px]"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="px-2 py-3">Planta</th>
              <th className="px-2 py-3">Ubicación</th>
              <th className="px-2 py-3">Nivel de riesgo</th>
              <th className="px-2 py-3">Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlants.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-[30px] text-center text-gray-400">
                  No se encontraron plantas con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              paginatedPlants.map((plant) => {
                let badgeType = 'safe';
                if (plant.nivelRiesgo === 'ALTO') badgeType = 'critical';
                else if (plant.nivelRiesgo === 'MEDIO') badgeType = 'warning';

                const tendencia = plant.tendencia || 'ESTABLE';

                const isSelected = plant.idPlanta === selectedId;
                return (
                  <tr
                    key={plant.idPlanta}
                    onClick={() => onSelectPlanta?.(plant)}
                    className={clsx(
                      'cursor-pointer border-b border-l-[3px] border-gray-200',
                      isSelected ? 'border-l-[#2563eb] bg-[#eaf1fe]' : 'border-l-transparent bg-transparent',
                    )}
                  >
                    <td className="px-2 py-3 font-medium">
                      {plant.nombrePlanta}
                    </td>
                    <td className="px-2 py-3 text-gray-600">
                      {plant.ubicacionNombre || '—'}
                    </td>
                    <td className="px-2 py-3">
                      <ActionBadge label={plant.nivelRiesgo} type={badgeType} />
                    </td>
                    <td className="px-2 py-3 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <TrendArrow tendencia={tendencia} />
                        <span>{Math.round(plant.indiceHidrico * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredPlants.length > itemsPerPage && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={clsx(
              'rounded-md border border-gray-200 bg-white px-3 py-1.5',
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100',
            )}
          >
            Anterior
          </button>
          <span className="text-[13px] text-gray-500">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={clsx(
              'rounded-md border border-gray-200 bg-white px-3 py-1.5',
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100',
            )}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
