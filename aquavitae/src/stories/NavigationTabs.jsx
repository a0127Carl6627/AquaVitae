import React from 'react';
import './NavigationTabs.css';

export default function NavigationTabs({
  tabs = [
    { value: 'agregar', label: 'Agregar' },
    { value: 'eliminar', label: 'Eliminar' },
    { value: 'modificar', label: 'Modificar' },
    { value: 'permisos', label: 'Permisos' },
  ],
  activeTab = 'agregar',
  onChange,
}) {
  return (
    <div className="navigation-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={`navigation-tabs__item ${activeTab === tab.value ? 'is-active' : ''}`}
          onClick={() => onChange?.(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}