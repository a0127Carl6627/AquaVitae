import React from 'react';
import './Avatar.css';

export default function Avatar({ size = 80 }) {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#18B8F2" />
            <stop offset="100%" stopColor="#4A46F6" />
          </linearGradient>
        </defs>

        {/* Fondo */}
        <circle cx="50" cy="50" r="48" fill="url(#avatarGradient)" />

        {/* Cabeza */}
        <circle
          cx="50"
          cy="35"
          r="15"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
        />

        {/* Cuerpo */}
        <path
          d="M20 86c3.5-15.5 15.5-27 30-27s26.5 11.5 30 27"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}