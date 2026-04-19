import React from 'react';
import './BaseDropdown.css';

export default function BaseDropdown({
  value = '',
  onChange,
  options = [],
  placeholder = 'Selecciona una opción',
  id = 'base-dropdown',
  name = 'base-dropdown',
}) {
  return (
    <div className="base-dropdown">
      <select
        id={id}
        name={name}
        className="base-dropdown__select"
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

      <span className="base-dropdown__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="base-dropdown__arrow-svg">
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