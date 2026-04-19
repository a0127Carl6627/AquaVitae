import React from 'react';
import './FilterDropdown.css';

export default function FilterDropdown({
  value = '',
  onChange,
  options = [],
  placeholder = 'Selecciona una opción',
  name = 'filter',
  id = 'filter',
}) {
  return (
    <div className="filter-dropdown">
      <select
        id={id}
        name={name}
        className="filter-dropdown__select"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="filter-dropdown__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="filter-dropdown__svg">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}