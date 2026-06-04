import React, { useState, useMemo } from 'react';
import clsx from 'clsx';

const AVATAR_PALETTE = [
  'bg-[#dbeafe] text-[#1d4ed8]', // azul
  'bg-[#dcfce7] text-[#15803d]', // verde
  'bg-[#fce7f3] text-[#be185d]', // rosa
  'bg-[#ffedd5] text-[#c2410c]', // naranja
  'bg-[#ede9fe] text-[#6d28d9]', // violeta
  'bg-[#fef9c3] text-[#a16207]', // amarillo
  'bg-[#fee2e2] text-[#b91c1c]', // rojo
  'bg-[#ccfbf1] text-[#0f766e]', // teal
];

function getAvatarClass(nombre = '') {
  const code = nombre.charCodeAt(0) || 65;
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

function getInitials(nombre = '') {
  return nombre.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

const ROL_CLASS = {
  'Administrador':     'bg-[#ede9fe] text-[#6d28d9] border-[#ddd6fe]',
  'Director':          'bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]',
  'Gerente de Planta': 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]',
  'Analista':          'bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]',
  'Operador':          'bg-[#fce7f3] text-[#be185d] border-[#fbcfe8]',
};

function RolBadge({ rol }) {
  const cls = ROL_CLASS[rol] || 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
  return (
    <span className={`inline-block min-w-[130px] whitespace-nowrap rounded-[20px] border px-2.5 py-[3px] text-center text-xs font-medium ${cls}`}>
      {rol}
    </span>
  );
}

const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i);
  const pages = [0, 1, 2];
  if (current > 3) pages.push('…');
  if (current > 2 && current < total - 2) pages.push(current);
  if (current < total - 3) pages.push('…end');
  pages.push(total - 1);
  return [...new Set(pages)];
}

export default function UsersTable({
  usuarios = { items: [], total: 0, page: 0, size: 5, totalPages: 1 },
  onPageChange,
  onEdit,
  onDelete,
  onAgregar,
  loading = false,
}) {
  const [search, setSearch] = useState('');

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return usuarios.items ?? [];
    return (usuarios.items ?? []).filter(u =>
      u.nombreCompleto?.toLowerCase().includes(q) ||
      u.correo?.toLowerCase().includes(q) ||
      u.nombreRol?.toLowerCase().includes(q) ||
      u.nombreRegion?.toLowerCase().includes(q)
    );
  }, [search, usuarios.items]);

  const { page = 0, totalPages = 1, total = 0, size = 5 } = usuarios;
  const pages = buildPages(page, totalPages);

  const from = total === 0 ? 0 : page * size + 1;
  const to   = Math.min((page + 1) * size, total);

  return (
    <div className="[font-family:'Inter',system-ui,sans-serif]">

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex w-[280px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar usuario por nombre, correo o rol..."
              className="flex-1 border-none bg-transparent text-[13px] text-gray-700 outline-none [font-family:inherit]"
            />
          </div>

        </div>

        <button
          onClick={onAgregar}
          className="flex items-center gap-1.5 rounded-lg border-none bg-[#1d4ed8] px-[18px] py-[9px] text-[13px] font-semibold text-white [font-family:inherit]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar usuario
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-gray-100">
              {['Usuario','Correo electrónico','Rol','Región','Estado','Último acceso','Acciones'].map(h => (
                <th key={h} className="whitespace-nowrap px-3.5 py-2.5 text-left text-[13px] font-medium text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-gray-400">
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"
                      className="animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Cargando usuarios…
                  </span>
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-[13px] text-gray-400">
                  {search ? `Sin resultados para "${search}"` : 'No hay usuarios registrados'}
                </td>
              </tr>
            ) : items.map(u => (
              <tr key={u.id} className="border-b border-gray-100 transition-colors hover:bg-gray-50">

                <td className="px-3.5 py-[13px]">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarClass(u.nombreCompleto)}`}>
                      {getInitials(u.nombreCompleto)}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {u.nombreCompleto}
                    </span>
                  </div>
                </td>

                <td className="px-3.5 py-[13px] text-gray-500">
                  {u.correo}
                </td>

                <td className="px-3.5 py-[13px]">
                  <RolBadge rol={u.nombreRol || '—'} />
                </td>

                <td className="px-3.5 py-[13px] text-gray-700">
                  {u.nombreRegion || '—'}
                </td>

                <td className="px-3.5 py-[13px]">
                  <div className="flex items-center gap-1.5">
                    <span className={clsx('h-[7px] w-[7px] shrink-0 rounded-full', u.activo ? 'bg-[#22c55e]' : 'bg-gray-400')} />
                    <span className={u.activo ? 'text-gray-700' : 'text-gray-400'}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3.5 py-[13px] text-gray-500">
                  {u.ultimoAcceso || '—'}
                </td>

                <td className="px-3.5 py-[13px]">
                  <div className="flex gap-1.5">
                    <ActionBtn onClick={() => onEdit?.(u)} title="Editar">
                      <EditIcon />
                    </ActionBtn>
                    <ActionBtn onClick={() => onDelete?.(u)} title="Eliminar" danger>
                      <DeleteIcon />
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-xs text-gray-500">
          {total === 0
            ? 'Sin usuarios'
            : `Mostrando ${from} a ${to} de ${total} usuarios`}
        </span>

        <div className="flex items-center gap-1">
          <PageBtn onClick={() => onPageChange?.(page - 1)} disabled={page === 0}>
            ‹
          </PageBtn>

          {pages.map((p, i) =>
            typeof p === 'string' ? (
              <span key={p + i} className="px-1.5 text-[13px] text-gray-400">…</span>
            ) : (
              <PageBtn key={p} active={p === page} onClick={() => onPageChange?.(p)}>
                {p + 1}
              </PageBtn>
            )
          )}

          <PageBtn onClick={() => onPageChange?.(page + 1)} disabled={page >= totalPages - 1}>
            ›
          </PageBtn>

          <select
            defaultValue={size}
            className="ml-2 cursor-pointer rounded-md border border-gray-200 px-2.5 py-[5px] text-xs text-gray-700 outline-none [font-family:inherit]">
            {[5, 10, 20].map(n => (
              <option key={n} value={n}>{n} por página</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ children, onClick, title, danger = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        'flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md border transition-colors',
        danger
          ? 'border-[#fecaca] bg-[#fff5f5] text-[#ef4444] hover:bg-[#fee2e2] hover:text-[#dc2626]'
          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700',
      )}>
      {children}
    </button>
  );
}

function PageBtn({ children, onClick, disabled = false, active = false }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={clsx(
        'flex h-[30px] min-w-[30px] items-center justify-center rounded-md px-1.5 text-[13px] transition-colors [font-family:inherit]',
        active
          ? 'border-none bg-[#1d4ed8] font-semibold text-white'
          : disabled
            ? 'cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-300'
            : 'cursor-pointer border border-gray-200 bg-white text-gray-700',
      )}>
      {children}
    </button>
  );
}
