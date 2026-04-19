import React, { useState } from 'react';
import ApiBadge from './ApiBadge';

const IconKey = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="M21 2l-9.6 9.6M15.5 7.5l3 3"/>
  </svg>
);

const IconDots = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

function maskKey(key) {
  if (!key) return '••••••••••••••••••••••••••••••••';
  return key.slice(0, 8) + '••••••••••••••••' + key.slice(-4);
}

export default function ApiKeyList({
  keys = [],
  onAction,
  emptyLabel = 'No hay llaves de API registradas.',
}) {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  if (keys.length === 0) {
    return (
      <div style={{
        fontFamily: 'sans-serif',
        background: '#f8fafc',
        border: '1.5px dashed #cbd5e1',
        borderRadius: 12,
        padding: '32px 24px',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 13,
      }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🔑</div>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 0 }}>
      {keys.map((apiKey, i) => {
        const isSelected = selected === apiKey.id;
        const isFirst = i === 0;
        const isLast = i === keys.length - 1;

        return (
          <div
            key={apiKey.id}
            onClick={() => setSelected(isSelected ? null : apiKey.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 18px',
              background: isSelected ? '#eff6ff' : '#ffffff',
              border: '1px solid',
              borderColor: isSelected ? '#bfdbfe' : '#e2e8f0',
              borderRadius: isFirst && isLast ? 12 : isFirst ? '12px 12px 0 0' : isLast ? '0 0 12px 12px' : 0,
              borderTopWidth: i === 0 ? 1 : 0,
              cursor: 'pointer',
              transition: 'background 0.15s',
              position: 'relative',
            }}
          >
            {/* Ícono llave */}
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: apiKey.status === 'active' ? '#eafbee' : apiKey.status === 'error' ? '#fff0ee' : '#f0f1f3',
              color: apiKey.status === 'active' ? '#1a6e30' : apiKey.status === 'error' ? '#a8200d' : '#4a5568',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconKey />
            </div>

            {/* Info principal */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {apiKey.name}
                </span>
                <ApiBadge status={apiKey.status} />
              </div>
              <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                {maskKey(apiKey.key)}
              </span>
              {apiKey.lastUsed && (
                <div style={{ fontSize: 10, color: '#cbd5e1', marginTop: 2 }}>
                  Último uso: {apiKey.lastUsed}
                </div>
              )}
            </div>

            {/* Menú acciones */}
            <div style={{ position: 'relative', flexShrink: 0 }}
              onClick={e => { e.stopPropagation(); setMenuOpen(menuOpen === apiKey.id ? null : apiKey.id); }}
            >
              <button style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px 6px',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
              }}>
                <IconDots />
              </button>

              {menuOpen === apiKey.id && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  zIndex: 10,
                  minWidth: 140,
                  overflow: 'hidden',
                }}>
                  {[
                    { label: 'Rotar llave', action: 'rotate' },
                    { label: apiKey.status === 'active' ? 'Desactivar' : 'Activar', action: 'toggle' },
                    { label: 'Eliminar', action: 'delete', danger: true },
                  ].map(item => (
                    <button
                      key={item.action}
                      onClick={e => { e.stopPropagation(); setMenuOpen(null); onAction?.(item.action, apiKey); }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 14px',
                        background: 'none',
                        border: 'none',
                        fontSize: 12,
                        color: item.danger ? '#dc2626' : '#374151',
                        cursor: 'pointer',
                        fontFamily: 'sans-serif',
                        borderBottom: item.action !== 'delete' ? '1px solid #f1f5f9' : 'none',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
