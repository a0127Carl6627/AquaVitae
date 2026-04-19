import React from 'react';
import './DatePicker.css';

export default function DatePicker({
  value,
  onChange,
}) {
  return (
    <div className="date-picker">
      <span className="date-picker__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="date-picker__svg">
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            ry="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="8"
            y1="3"
            x2="8"
            y2="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="3"
            x2="16"
            y2="7"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </span>

      <input
        type="date"
        className="date-picker__input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}