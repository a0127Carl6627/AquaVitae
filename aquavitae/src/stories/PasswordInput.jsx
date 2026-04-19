import React, { useState } from 'react';
import './PasswordInput.css';

export default function PasswordInput({
  placeholder = '••••••••••••',
  disabled = false,
  id = 'password',
  name = 'password',
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((previousValue) => !previousValue);
  };

  return (
    <div className={`password-input-wrapper ${disabled ? 'is-disabled' : ''}`}>
      <input
        className="password-input"
        type={showPassword ? 'text' : 'password'}
        id={id}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />

      <button
        type="button"
        className="password-toggle-button"
        onClick={togglePasswordVisibility}
        disabled={disabled}
        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {showPassword ? (
          <svg
            viewBox="0 0 24 24"
            className="password-toggle-icon"
            aria-hidden="true"
          >
            <path
              d="M3 3l18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10.6 10.7a2 2 0 0 0 2.7 2.7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9.4 5.5A10.7 10.7 0 0 1 12 5c5 0 8.3 4 9.3 5.5a.9.9 0 0 1 0 1C20.9 12.1 19.4 14 17 15.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.1 14.1A3 3 0 0 1 9.9 9.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M6.7 6.8C4.8 8 3.5 9.7 2.7 10.5a.9.9 0 0 0 0 1C3.7 13 7 17 12 17c1.5 0 2.9-.3 4.1-.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="password-toggle-icon"
            aria-hidden="true"
          >
            <path
              d="M2.7 12.5a.9.9 0 0 1 0-1C3.7 10 7 6 12 6s8.3 4 9.3 5.5a.9.9 0 0 1 0 1C20.3 14 17 18 12 18s-8.3-4-9.3-5.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>
    </div>
  );
}