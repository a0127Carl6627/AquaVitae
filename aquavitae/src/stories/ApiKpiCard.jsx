import React from 'react';
import './ApiKpiCard.css';

export default function ApiKpiCard({
  title = 'API 1',
  value = '1,284',
  trend = '+4%',
  trendType = 'up',
  footer = null,
}) {
  return (
    <div className="api-kpi-card">
      <span className="api-kpi-card__title">{title}</span>

      <div className="api-kpi-card__value-row">
        <span className="api-kpi-card__value">{value}</span>

        {trend && (
          <span className={`api-kpi-card__trend api-kpi-card__trend--${trendType}`}>
            {trend}
          </span>
        )}
      </div>

      {footer && <div className="api-kpi-card__footer">{footer}</div>}

      <div className="api-kpi-card__sparkline" />
    </div>
  );
}