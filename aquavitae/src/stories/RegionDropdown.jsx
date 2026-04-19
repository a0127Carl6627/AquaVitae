import React from 'react';
import './RegionDropdown.css';

export default function RegionDropdown() {
  return (
    <div className="region-dropdown">
      <select className="region-dropdown__select" defaultValue="all">
        <option value="all">Todas las regiones</option>
        <option value="north">Región Norte</option>
        <option value="center">Región Centro</option>
        <option value="south">Región Sur</option>
      </select>

      <span className="region-dropdown__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          className="region-dropdown__svg"
        >
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