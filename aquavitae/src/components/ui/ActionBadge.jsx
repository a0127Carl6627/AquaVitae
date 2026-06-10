import React from 'react';
import clsx from 'clsx';

// Cada tipo mapea a un set COMPLETO de clases (no interpoladas) para que
// el JIT de Tailwind las detecte. Este es el patron para estilos dinamicos.
const tipos = {
  critical: {
    classes: 'bg-red-50 text-red-500 border-red-500',
    icono: '❗',
  },
  warning: {
    classes: 'bg-amber-50 text-amber-500 border-amber-500',
    icono: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L1 21h22L12 2z"/>
        <text x="12" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">!</text>
      </svg>
    ),
  },
  safe: {
    classes: 'bg-green-50 text-green-500 border-green-500',
    icono: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
};

export default function ActionBadge({ label = '', type = 'safe' }) {
  const config = tipos[type] || tipos.safe;

  return (
    <span
      className={clsx(
        'inline-flex w-fit items-center gap-[5px] whitespace-nowrap rounded-full border px-2.5 py-[3px] font-sans text-xs font-semibold',
        config.classes,
      )}
    >
      {typeof config.icono === 'string'
        ? <span className="text-xs">{config.icono}</span>
        : config.icono
      }
      {label}
    </span>
  );
}
