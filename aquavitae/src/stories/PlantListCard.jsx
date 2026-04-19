import React from 'react';
import './PlantListCard.css';

const plants = [
  {
    id: 1,
    name: 'Planta Monterrey 1',
    region: 'Norte',
    risk: 'high',
    action: 'take-action',
  },
  {
    id: 2,
    name: 'Planta Guadalajara',
    region: 'Bajío',
    risk: 'medium',
    action: 'view',
  },
  {
    id: 3,
    name: 'Planta Toluca',
    region: 'Centro',
    risk: 'low',
    action: 'view',
  },
  {
    id: 4,
    name: 'Planta Querétaro',
    region: 'Bajío',
    risk: 'high',
    action: 'take-action',
  },
];

export default function PlantListCard() {
  return (
    <div className="plant-list-card">
      <div className="plant-list-card__header">
        <h2 className="plant-list-card__title">Listado de Plantas (12)</h2>

        <button type="button" className="plant-list-card__filter-button" aria-label="Filtrar">
          <svg viewBox="0 0 24 24" className="plant-list-card__filter-icon">
            <path
              d="M4 7h16M7 12h10M10 17h4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="plant-list-card__columns">
        <span className="plant-list-card__column-label">NOMBRE / REGIÓN</span>
        <span className="plant-list-card__column-label">NIVEL RIESGO</span>
        <span className="plant-list-card__column-label plant-list-card__column-label--empty" />
      </div>

      <div className="plant-list-card__rows">
        {plants.map((plant) => (
          <PlantRow key={plant.id} plant={plant} />
        ))}
      </div>

      <div className="plant-list-card__summary">
        <PlantSummaryItem number="04" label="CRÍTICO" tone="critical" />
        <PlantSummaryItem number="05" label="ALERTA" tone="alert" />
        <PlantSummaryItem number="03" label="NORMAL" tone="normal" />
      </div>
    </div>
  );
}

function PlantRow({ plant }) {
  return (
    <div className="plant-row">
      <div className="plant-row__info">
        <h3 className="plant-row__name">{plant.name}</h3>
        <p className="plant-row__region">{plant.region}</p>
      </div>

      <div className="plant-row__risk">
        <RiskBadge level={plant.risk} />
      </div>

      <div className="plant-row__action">
        <PlantActionButton variant={plant.action} />
      </div>
    </div>
  );
}

function RiskBadge({ level }) {
  const config = {
    high: { label: 'ALTO', className: 'risk-badge--high' },
    medium: { label: 'MEDIO', className: 'risk-badge--medium' },
    low: { label: 'BAJO', className: 'risk-badge--low' },
  };

  const current = config[level];

  return (
    <span className={`risk-badge ${current.className}`}>
      <span className="risk-badge__dot" />
      {current.label}
    </span>
  );
}

function PlantActionButton({ variant }) {
  if (variant === 'take-action') {
    return (
      <button type="button" className="plant-action-button plant-action-button--primary">
        TOMAR
        <br />
        ACCIÓN
      </button>
    );
  }

  return (
    <button type="button" className="plant-action-button plant-action-button--secondary">
      VER
    </button>
  );
}

function PlantSummaryItem({ number, label, tone }) {
  return (
    <div className="plant-summary-item">
      <span className={`plant-summary-item__number plant-summary-item__number--${tone}`}>
        {number}
      </span>
      <span className="plant-summary-item__label">{label}</span>
    </div>
  );
}