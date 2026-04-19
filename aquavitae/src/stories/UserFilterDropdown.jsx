import React from 'react';
import './UserFilterDropdown.css';

export default function UserFilterDropdown({
  value = '',
  onChange,
  options = [
    { value: 'all', label: 'Usuario' },
    { value: 'admin', label: 'Administrador' },
    { value: 'director', label: 'Director' },
  ],
  name = 'user-filter',
  id = 'user-filter',
}) {
  return (
    <div className="user-filter-dropdown">
      <span className="user-filter-dropdown__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="user-filter-dropdown__svg">
          <circle
            cx="12"
            cy="8"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M6.5 18c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>

      <select
        id={id}
        name={name}
        className="user-filter-dropdown__select"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="user-filter-dropdown__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="user-filter-dropdown__arrow-svg">
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