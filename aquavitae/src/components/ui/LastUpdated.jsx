import React from 'react';
import clsx from 'clsx';

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date)) return '—';

  const day = date.getDate();
  const month = date.toLocaleString('es-MX', { month: 'short' });
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1).replace('.', '');
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  hours = hours % 12 || 12;

  return `${day} ${monthCap} ${year}, ${hours}:${minutes} ${ampm}`;
}

export default function LastUpdated({ fechaActualizacion, onRefresh, loading = false }) {
  return (
    <div className="flex items-start gap-2 [font-family:Inter,sans-serif]">
      <div>
        <p className="m-0 text-xs leading-normal text-gray-500">
          Última actualización:
        </p>
        <p className="m-0 text-xs leading-normal text-gray-500">
          {formatDate(fechaActualizacion)}
        </p>
      </div>
      <button
        onClick={onRefresh}
        aria-label="Actualizar datos"
        disabled={loading}
        className={clsx(
          'mt-0.5 flex items-center rounded border-none bg-transparent p-1 text-gray-500',
          loading ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100',
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={clsx(loading && 'animate-spin')}
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
      </button>
    </div>
  );
}
