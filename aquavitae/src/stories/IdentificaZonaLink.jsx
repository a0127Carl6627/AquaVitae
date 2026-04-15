import React from 'react';

export default function IdentificaZonaLink({ 
  text = "Identifica tu zona", 
  onClick, 
  href = "#" 
}) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#3b82f6',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '4px 0',
        borderBottom: '1px dashed #3b82f6',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#2563eb';
        e.currentTarget.style.borderBottomColor = '#2563eb';
        e.currentTarget.style.gap = '12px';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#3b82f6';
        e.currentTarget.style.borderBottomColor = '#3b82f6';
        e.currentTarget.style.gap = '8px';
      }}
    >
      <span>{text}</span>
      <span style={{ fontSize: '16px', transition: 'transform 0.2s' }}>→</span>
    </a>
  );
}