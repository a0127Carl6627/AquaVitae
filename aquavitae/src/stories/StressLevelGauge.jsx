import React from 'react';
import './StressLevelGauge.css';

export default function StressLevelGauge({
  value = 4.65,
  max = 5,
  label = 'Nivel de estrés',
  level = 'critical',
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="stress-gauge">
      <span className="stress-gauge__label">{label}</span>

      <div className="stress-gauge__track">
        <div
          className={`stress-gauge__fill stress-gauge__fill--${level}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="stress-gauge__footer">
        <span className="stress-gauge__value">{value}</span>
        <span className={`stress-gauge__level stress-gauge__level--${level}`}>
          {level === 'critical' ? 'Crítico' : level === 'high' ? 'Alto' : 'Moderado'}
        </span>
      </div>
    </div>
  );
}