import React from 'react';
import './ForgotPasswordLink.css';

export default function ForgotPasswordLink({
  onClick,
  href = '#',
}) {
  return (
    <p className="forgot-password-text">
      ¿Olvidaste tu contraseña?{' '}
      
      <a
        href={href}
        className="forgot-password-link"
        onClick={onClick}
      >
        Haz click aquí
      </a>
    </p>
  );
}