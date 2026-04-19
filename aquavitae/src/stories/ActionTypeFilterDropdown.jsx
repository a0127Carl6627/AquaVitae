import React from 'react';
import './ActionTypeFilterDropdown.css';

export default function ActionTypeFilterDropdown({
  value = '',
  onChange,
  options = [
    { value: 'all', label: 'Tipo de Acción' },
    { value: 'preventive', label: 'Preventiva' },
    { value: 'corrective', label: 'Correctiva' },
    { value: 'urgent', label: 'Urgente' },
  ],
  name = 'action-type-filter',
  id = 'action-type-filter',
}) {
  return (
    <div className="action-type-filter-dropdown">
      <span className="action-type-filter-dropdown__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="action-type-filter-dropdown__svg">
          <path
            d="M13 2L6 13h5l-1 9 8-12h-5l0-8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <select
        id={id}
        name={name}
        className="action-type-filter-dropdown__select"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="action-type-filter-dropdown__arrow" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          className="action-type-filter-dropdown__arrow-svg"
        >
          <path
            d="M7 10l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}