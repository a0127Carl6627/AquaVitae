import React, { useState } from 'react';
import clsx from 'clsx';

// Clases base reutilizables (antes objeto `styles`)
const NAV_BASE = 'flex h-10 w-full shrink-0 cursor-pointer items-center gap-3 whitespace-nowrap rounded-[10px] border-none px-2.5 text-sm font-medium transition-all duration-150';
const ICON_CLASS = 'h-5 w-5 shrink-0';
const LABEL_CLASS = 'whitespace-nowrap text-sm font-medium';
const DIVIDER_CLASS = 'my-2 h-px shrink-0 bg-[#e6eaf0]';

const NAVIGATION_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    roles: ['Director'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },

  {
    key: 'alternativas',
    label: 'Alternativas',
    roles: ['Director'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },

  {
    key: 'simulacion',
    label: 'Simulación',
    roles: ['Director'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17l5-5 4 4 8-9" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },

  {
    key: 'gestion-usuarios',
    label: 'Gestión Usuarios',
    roles: ['Administrador'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },

  {
    key: 'api-alerts',
    label: 'Alertas API',
    roles: ['Administrador'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },

  {
    key: 'auditoria',
    label: 'Auditoría',
    roles: ['Administrador'],
    icon: (size) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
];

export default function ExpandableSidebar({
  userRole,
  activePage = 'dashboard',
  onNavigate,
  onLogout,
  user,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const role = userRole || user?.rol;

  const visibleItems = NAVIGATION_ITEMS.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <aside
      className={clsx(
        'fixed bottom-0 left-0 top-0 z-[1000] box-border flex h-screen shrink-0 flex-col gap-2 overflow-hidden border-r border-[#e6eaf0] bg-white px-3 py-[18px] transition-[width] duration-300 ease-in-out',
        isExpanded ? 'w-[220px]' : 'w-[64px]',
      )}
    >
      <div className="mb-[18px] grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(160deg,#2563eb,#1577a8)] text-sm font-bold text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C12 3 5 11 5 16a7 7 0 0 0 14 0c0-5-7-13-7-13Z"
            fill="#fff"
            opacity=".95"
          />
        </svg>
      </div>

      <button
        className="mb-2 flex h-10 w-full shrink-0 cursor-pointer items-center justify-center rounded-[10px] border-none bg-transparent text-lg text-[#8a93a3] transition-all duration-150"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Contraer' : 'Expandir'}
      >
        {isExpanded ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </button>

      <div className={DIVIDER_CLASS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {visibleItems.map(({ key, label, icon }) => {
          const isActive = activePage === key;

          return (
            <button
              key={key}
              className={clsx(
                NAV_BASE,
                isActive ? 'bg-[#eaf1fe] text-[#1d4ed8]' : 'bg-transparent text-[#8a93a3]',
              )}
              onClick={() => onNavigate(key)}
              title={label}
            >
              <span className={ICON_CLASS}>{icon(20)}</span>

              {isExpanded && (
                <span className={LABEL_CLASS}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex shrink-0 flex-col gap-2">
        <div className={DIVIDER_CLASS} />

        <button
          className={`${NAV_BASE} bg-transparent text-[#8a93a3]`}
          onClick={onLogout}
          title="Salir"
        >
          <span className={ICON_CLASS}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>

          {isExpanded && (
            <span className={LABEL_CLASS}>
              Salir
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
