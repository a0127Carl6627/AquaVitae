import React from 'react';
import './PrimaryLogInButton.css';

export default function PrimaryLogInButton({
  label = 'Iniciar sesión',
  onClick,
  disabled = false,
  type = 'button',
}) {
  return (
    <button
      className="primary-login-button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}