import React from 'react';
import './InlineError.css';

export default function InlineError({
  message = 'Credenciales Incorrectas',
}) {
  if (!message) return null;

  return (
    <p className="inline-error">
      {message}
    </p>
  );
}