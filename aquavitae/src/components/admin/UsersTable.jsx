import React, { useState, useMemo } from 'react';

const AVATAR_PALETTE = [
  { bg: '#dbeafe', text: '#1d4ed8' }, // azul
  { bg: '#dcfce7', text: '#15803d' }, // verde
  { bg: '#fce7f3', text: '#be185d' }, // rosa
  { bg: '#ffedd5', text: '#c2410c' }, // naranja
  { bg: '#ede9fe', text: '#6d28d9' }, // violeta
  { bg: '#fef9c3', text: '#a16207' }, // amarillo
  { bg: '#fee2e2', text: '#b91c1c' }, // rojo
  { bg: '#ccfbf1', text: '#0f766e' }, // teal
];

function getAvatarColors(nombre = '') {
  const code = nombre.charCodeAt(0) || 65;
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

function getInitials(nombre = '') {
  return nombre.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

const ROL_COLORS = {
  'Administrador':     { bg: '#ede9fe', text: '#6d28d9', border: '#ddd6fe' },
  'Director':          { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' },
  'Gerente de Planta': { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
  'Analista':          { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
  'Operador':          { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' },
};

function RolBadge({ rol }) {
  const c = ROL_COLORS[rol] ?? { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 500,
      background: c.bg,
      color: c.text,
      border: `1px solid ${c.border}`,
      whiteSpace: 'nowrap',
      minWidth: '130px',      
      textAlign: 'center',    
    }}>
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
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16, gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid #e5e7eb', borderRadius: 8,
            padding: '8px 14px', background: '#fff',
            width: 280,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#9ca3af" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar usuario por nombre, correo o rol..."
              style={{
                border: 'none', outline: 'none', fontSize: 13,
                color: '#374151', flex: 1, background: 'transparent',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: '1px solid #e5e7eb', borderRadius: 8,
            padding: '8px 14px', background: '#fff',
            fontSize: 13, color: '#374151', cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#6b7280" strokeWidth="2" strokeLinecap="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtros
          </button>
        </div>

        <button
          onClick={onAgregar}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            border: 'none', borderRadius: 8,
            padding: '9px 18px', background: '#1d4ed8',
            fontSize: 13, fontWeight: 600, color: '#fff',
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Agregar usuario
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Usuario','Correo electrónico','Rol','Región','Estado','Último acceso','Acciones'].map(h => (
                <th key={h} style={{
                  padding: '10px 14px', textAlign: 'left',
                  fontWeight: 500, color: '#6b7280', whiteSpace: 'nowrap',
                  fontSize: 13,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"
                      style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Cargando usuarios…
                  </span>
                  <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
                  {search ? `Sin resultados para "${search}"` : 'No hay usuarios registrados'}
                </td>
              </tr>
            ) : items.map(u => {
              const av = getAvatarColors(u.nombreCompleto);
              return (
                <tr key={u.id}
                  style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                  <td style={{ padding: '13px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: av.bg, color: av.text,
                        fontSize: 12, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {getInitials(u.nombreCompleto)}
                      </div>
                      <span style={{ fontWeight: 600, color: '#111827' }}>
                        {u.nombreCompleto}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '13px 14px', color: '#6b7280' }}>
                    {u.correo}
                  </td>

                  <td style={{ padding: '13px 14px' }}>
                    <RolBadge rol={u.nombreRol || '—'} />
                  </td>

                  <td style={{ padding: '13px 14px', color: '#374151' }}>
                    {u.nombreRegion || '—'}
                  </td>

                  <td style={{ padding: '13px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                        background: u.activo ? '#22c55e' : '#9ca3af',
                      }} />
                      <span style={{ color: u.activo ? '#374151' : '#9ca3af' }}>
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '13px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {u.ultimoAcceso || '—'}
                  </td>

                  <td style={{ padding: '13px 14px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <ActionBtn onClick={() => onEdit?.(u)} title="Editar">
                        <EditIcon />
                      </ActionBtn>
                      <ActionBtn onClick={() => onDelete?.(u)} title="Eliminar" danger>
                        <DeleteIcon />
                      </ActionBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16, flexWrap: 'wrap', gap: 10,
      }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>
          {total === 0
            ? 'Sin usuarios'
            : `Mostrando ${from} a ${to} de ${total} usuarios`}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <PageBtn onClick={() => onPageChange?.(page - 1)} disabled={page === 0}>
            ‹
          </PageBtn>

          {pages.map((p, i) =>
            typeof p === 'string' ? (
              <span key={p + i} style={{ padding: '0 6px', color: '#9ca3af', fontSize: 13 }}>…</span>
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
            style={{
              marginLeft: 8, border: '1px solid #e5e7eb', borderRadius: 6,
              padding: '5px 10px', fontSize: 12, color: '#374151',
              cursor: 'pointer', fontFamily: 'inherit', outline: 'none',
            }}>
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
      style={{
        width: 30, height: 30, borderRadius: 6,
        border: `1px solid ${danger ? '#fecaca' : '#e5e7eb'}`,
        background: danger ? '#fff5f5' : '#fff',
        color: danger ? '#ef4444' : '#6b7280',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = danger ? '#fee2e2' : '#f3f4f6';
        e.currentTarget.style.color = danger ? '#dc2626' : '#374151';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = danger ? '#fff5f5' : '#fff';
        e.currentTarget.style.color = danger ? '#ef4444' : '#6b7280';
      }}>
      {children}
    </button>
  );
}

function PageBtn({ children, onClick, disabled = false, active = false }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        minWidth: 30, height: 30, borderRadius: 6, padding: '0 6px',
        border: active ? 'none' : '1px solid #e5e7eb',
        background: active ? '#1d4ed8' : disabled ? '#f9fafb' : '#fff',
        color: active ? '#fff' : disabled ? '#d1d5db' : '#374151',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: 13, fontWeight: active ? 600 : 400,
        fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}>
      {children}
    </button>
  );
}