import React from 'react';
import ActionBadge from './ActionBadge';

export default function PlantRiskList({ plants = [] }) {
  if (plants.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-family, "Inter", sans-serif)' }}>
        No hay datos de plantas.
      </p>
    );
  }

  return (
    <div style={{
      fontFamily: 'var(--font-family, "Inter", sans-serif)',
      overflowX: 'auto',
    }}>
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
          {plants.map((plant) => {
            // Mapea el nivel a los tipos que acepta ActionBadge
            let badgeType = 'safe';
            if (plant.nivelRiesgo === 'ALTO') badgeType = 'critical';
            else if (plant.nivelRiesgo === 'MEDIO') badgeType = 'warning';

            const trendPercent = Math.round(plant.indiceHidrico * 100);

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
                  {trendPercent}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}