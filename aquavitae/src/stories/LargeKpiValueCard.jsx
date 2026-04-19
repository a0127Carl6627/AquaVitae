import React from 'react';
import './LargeKpiValueCard.css';

export default function LargeKpiValueCard({
  label = 'Índice de estrés hídrico',
  value = '4.65',
  trend = '+8.1%',
  trendType = 'up',
}) {
  return (
    <div className="large-kpi-card">
      <span className="large-kpi-card__label">{label}</span>

      <div className="large-kpi-card__row">
        <span className="large-kpi-card__value">{value}</span>
        <span className={`large-kpi-card__trend large-kpi-card__trend--${trendType}`}>
          {trend}
        </span>
      </div>
    </div>
  );
}