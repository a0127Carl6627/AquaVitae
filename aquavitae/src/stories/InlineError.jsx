import React from 'react';
import './InlineError.css';

export default function InlineError({
  message = 'Correo no registrado',
}) {
  if (!message) return null;

  return (
    <p className="inline-error">
      {message}
    </p>
  );
}