import React from 'react';
import './HeaderSearch.css';

export default function HeaderSearch({
  title = 'Índice de Estrés Hídrico',
  placeholder = 'Buscar por Inversión...',
  onSearch,
}) {
  return (
    <div className="header-search">
      <h1 className="header-search__title">{title}</h1>

      <div className="header-search__input-container">
        <svg
          className="header-search__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="20"
            y1="20"
            x2="16.5"
            y2="16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          className="header-search__input"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}