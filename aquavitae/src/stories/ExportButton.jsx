import React from 'react';
import './ExportButton.css';

export default function ExportButton({
  label = 'Exportar CSV',
  onClick,
  disabled = false,
  type = 'button',
}) {
  return (
    <button
      type={type}
      className="export-button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="export-button__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="export-button__svg">
          <path
            d="M12 4v10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8.5 10.5L12 14l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 18h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <span className="export-button__label">{label}</span>
    </button>
  );
}