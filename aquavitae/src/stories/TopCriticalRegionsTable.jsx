import React from 'react';
import './TopCriticalRegionsTable.css';

const defaultRows = [
  {
    id: 1,
    region: 'Guanajuato',
    index: '4.82',
    change: '+12.4%',
    changeType: 'up',
    investment: '$1.2M USD',
    status: 'Crítico',
    statusTone: 'critical',
  },
  {
    id: 2,
    region: 'Querétaro',
    index: '4.65',
    change: '+8.1%',
    changeType: 'up',
    investment: '$0.8M USD',
    status: 'Crítico',
    statusTone: 'critical',
  },
  {
    id: 3,
    region: 'Nuevo León',
    index: '4.31',
    change: '+5.2%',
    changeType: 'warning',
    investment: '$4.5M USD',
    status: 'Alto',
    statusTone: 'high',
  },
  {
    id: 4,
    region: 'Zacatecas',
    index: '4.18',
    change: '-2.1%',
    changeType: 'down',
    investment: '$0.4M USD',
    status: 'Alto',
    statusTone: 'high',
  },
];

export default function TopCriticalRegionsTable({
  title = 'Top 5 Regiones Críticas',
  rows = defaultRows,
}) {
  return (
    <div className="top-critical-table">
      <h2 className="top-critical-table__title">{title}</h2>

      <div className="top-critical-table__header top-critical-table__grid">
        <span>REGIÓN / ESTADO</span>
        <span>ÍNDICE ACTUAL</span>
        <span>CAMBIO PROYECTADO</span>
        <span>INVERSIÓN ACTUAL</span>
        <span>ESTADO</span>
      </div>

      <div className="top-critical-table__body">
        {rows.map((row) => (
          <div key={row.id} className="top-critical-table__row top-critical-table__grid">
            <span className="top-critical-table__region">{row.region}</span>
            <span className="top-critical-table__value">{row.index}</span>
            <span
              className={`top-critical-table__change top-critical-table__change--${row.changeType}`}
            >
              {row.change}
            </span>
            <span className="top-critical-table__value">{row.investment}</span>
            <span>
              <StatusBadge label={row.status} tone={row.statusTone} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ label, tone }) {
  return (
    <span className={`top-critical-table__badge top-critical-table__badge--${tone}`}>
      {label}
    </span>
  );
}