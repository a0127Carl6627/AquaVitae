import React, { useState } from 'react';
import './PlantAlertFilterToggle.css';

export default function PlantAlertFilterToggle() {
  const [selectedOption, setSelectedOption] = useState('alert');

  return (
    <div className="plant-alert-toggle">
      <button
        type="button"
        className={`plant-alert-toggle__option ${
          selectedOption === 'alert' ? 'is-active' : ''
        }`}
        onClick={() => setSelectedOption('alert')}
      >
        Solo plantas en alerta
      </button>

      <button
        type="button"
        className={`plant-alert-toggle__option ${
          selectedOption === 'all' ? 'is-active' : ''
        }`}
        onClick={() => setSelectedOption('all')}
      >
        Todas
      </button>
    </div>
  );
}