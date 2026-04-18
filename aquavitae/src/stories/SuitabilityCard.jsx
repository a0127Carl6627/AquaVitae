import React from 'react';
import './SuitabilityCard.css';

export default function SuitabilityCard({
  title = 'Evaluación',
  status = 'No idóneo',
  tone = 'negative',
  description = 'La región presenta un índice alto de estrés hídrico y proyección desfavorable.',
}) {
  return (
    <div className="suitability-card">
      <span className="suitability-card__title">{title}</span>

      <span className={`suitability-card__status suitability-card__status--${tone}`}>
        {status}
      </span>

      <p className="suitability-card__description">{description}</p>
    </div>
  );
}