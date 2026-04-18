import React from 'react';
import './ApiErrorBadge.css';

export default function ApiErrorBadge({
  label = 'Error 404',
  subtitle = 'Not Found',
  tone = 'warning',
}) {
  return (
    <div className={`api-error-badge api-error-badge--${tone}`}>
      <span className="api-error-badge__dot" />
      <span className="api-error-badge__label">{label}</span>
      <span className="api-error-badge__subtitle">{subtitle}</span>
    </div>
  );
}