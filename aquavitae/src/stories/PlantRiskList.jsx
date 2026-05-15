import React, { useState, useEffect } from 'react';
import ActionBadge from './ActionBadge';

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
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: 'transform 0.2s ease',
      }}
    >
      {tendencia === 'BAJANDO' && <polyline points="18 15 12 9 6 15" />}
      {tendencia === 'SUBIENDO' && <polyline points="18 9 12 15 6 9" />}
      {tendencia === 'ESTABLE' && <line x1="5" y1="12" x2="19" y2="12" />}
    </svg>
  );
}

export default function PlantRiskList({ plants = [] }) {
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

  // Sugerencias para el datalist
  const matchingSuggestions = allPlantNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (plants.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-family, "Inter", sans-serif)' }}>
        No hay datos de plantas.
      </p>
    );
  }

  return (
    <div style={{ fontFamily: 'var(--font-family, "Inter", sans-serif)' }}>
      {/* Controles de filtro y búsqueda */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: 0 }}>
          Plantas por nivel de riesgo
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              fontSize: 13,
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="TODOS">Todos los niveles</option>
            <option value="ALTO">Alto riesgo</option>
            <option value="MEDIO">Medio riesgo</option>
            <option value="BAJO">Bajo riesgo</option>
          </select>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              list="plant-names"
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                fontSize: 13,
                width: '200px'
              }}
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
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: '1px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px 8px' }}>Planta</th>
              <th style={{ padding: '12px 8px' }}>Ubicación</th>
              <th style={{ padding: '12px 8px' }}>Nivel de riesgo</th>
              <th style={{ padding: '12px 8px' }}>Tendencia</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlants.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>
                  No se encontraron plantas con los criterios seleccionados.
                </td>
              </tr>
            ) : (
              paginatedPlants.map((plant) => {
                let badgeType = 'safe';
                if (plant.nivelRiesgo === 'ALTO') badgeType = 'critical';
                else if (plant.nivelRiesgo === 'MEDIO') badgeType = 'warning';

                const tendencia = plant.tendencia || 'ESTABLE';

                return (
                  <tr key={plant.idPlanta} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 500 }}>
                      {plant.nombrePlanta}
                    </td>
                    <td style={{ padding: '12px 8px', color: '#4b5563' }}>
                      {plant.ubicacionNombre || '—'}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <ActionBadge label={plant.nivelRiesgo} type={badgeType} />
                    </td>
                    <td style={{ padding: '12px 8px', fontWeight: 500, color: '#1f2937' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          marginTop: 20,
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Anterior
          </button>
          <span style={{ fontSize: 13, color: '#6b7280' }}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #e5e7eb',
              background: 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}