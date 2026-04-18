import React from 'react';
import './GenerateFeasibilityReportButton.css';

export default function GenerateFeasibilityReportButton({
  label = 'Generar Reporte de Factibilidad',
  onClick,
  disabled = false,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className="generate-feasibility-report-button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}