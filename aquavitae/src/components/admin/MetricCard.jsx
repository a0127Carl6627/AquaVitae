// Components/MetricCard.jsx
import React from 'react';

// Color principal del ícono (atributo SVG stroke, dinámico por tipo)
const iconColors = {
  users: '#2563eb',      // azul
  roles: '#9333ea',      // morado
  permissions: '#16a34a', // verde
  activity: '#ea580c',    // naranja
};

// Clases de fondo (tonalidad clara) para cada tipo
const bgClass = {
  users: 'bg-[#dbeafe]',
  roles: 'bg-[#f3e8ff]',
  permissions: 'bg-[#d1fae5]',
  activity: 'bg-[#fff3e8]',
};

const getIcon = (type) => {
  const color = iconColors[type] || '#2c3e50';

  switch (type) {
    case 'users':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'roles':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'permissions':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'activity':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    default:
      return null;
  }
};

export default function MetricCard({ title, value, subtitle, icon }) {
  const bg = bgClass[icon] || 'bg-[#f8fafc]';

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[#edf2f7] bg-white px-4 py-5 font-sans shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${bg}`}>
        {getIcon(icon)}
      </div>
      <div className="flex-1">
        <div className="mb-1.5 text-[13px] font-medium tracking-[0.02em] text-[#5b6e8c]">{title}</div>
        <div className="text-[28px] font-bold leading-[1.2] text-[#1a2c3e]">{value}</div>
        {subtitle && <div className="mt-1 text-xs text-[#7e8b9e]">{subtitle}</div>}
      </div>
    </div>
  );
}
