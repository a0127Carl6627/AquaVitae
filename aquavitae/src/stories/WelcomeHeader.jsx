import React from 'react';

export default function WelcomeHeader({ 
  title = "Bienvenido de vuelta", 
  subtitle = "Monitorea en tiempo real el estado hídrico de las operaciones en todo el territorio nacional."
}) {
  return (
    <div style={{
      marginBottom: '24px',
      textAlign: 'left',
    }}>
      <h1 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#004B93',
        margin: '0 0 8px 0',
        letterSpacing: '-0.02em',
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#475569',
        margin: 0,
        maxWidth: '600px',
      }}>
        {subtitle}
      </p>
    </div>
  );
}