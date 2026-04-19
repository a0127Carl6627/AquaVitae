import React, { useState, useRef, useEffect } from 'react';

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconChevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconX = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

function highlight(text, query) {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <strong style={{ color: '#1d4ed8', fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  );
}

function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function LocationSearchInput({
  options = [],
  selected = [],
  onSelect,
  onRemove,
  maxSelections = 4,
  minSelections = 2,
  placeholder = 'Busca y selecciona plantas o regiones…',
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query);
  const containerRef = useRef(null);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
    !selected.find(s => s.value === opt.value)
  );

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (opt) => {
    if (selected.length >= maxSelections) return;
    onSelect?.(opt);
    setQuery('');
    setOpen(false);
  };

  const atMax = selected.length >= maxSelections;

  return (
    <div ref={containerRef} style={{ fontFamily: 'sans-serif', width: '100%' }}>
      {/* Label */}
      <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Seleccionar ubicaciones para análisis ({minSelections}–{maxSelections})
      </p>

      {/* Input wrapper */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        border: `1.5px solid ${open ? '#93c5fd' : '#e2e8f0'}`,
        borderRadius: 10,
        padding: '9px 12px',
        background: atMax ? '#f8fafc' : '#fff',
        boxShadow: open ? '0 0 0 3px rgba(147,197,253,0.25)' : 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        cursor: atMax ? 'not-allowed' : 'text',
      }}
        onClick={() => { if (!atMax) { setOpen(true); } }}
      >
        <IconSearch />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (!atMax) setOpen(true); }}
          placeholder={atMax ? `Máximo ${maxSelections} ubicaciones seleccionadas` : placeholder}
          disabled={atMax}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 13,
            color: '#0f172a',
            background: 'transparent',
            cursor: atMax ? 'not-allowed' : 'text',
          }}
        />
        <IconChevron open={open} />
      </div>

      {/* Dropdown */}
      {open && !atMax && (
        <div style={{
          position: 'absolute',
          marginTop: 6,
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          zIndex: 50,
          width: '100%',
          maxHeight: 220,
          overflowY: 'auto',
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '14px 16px', fontSize: 12, color: '#94a3b8', textAlign: 'center' }}>
              Sin resultados para "{query}"
            </div>
          ) : (
            filtered.map(opt => (
              <div
                key={opt.value}
                onMouseDown={() => handleSelect(opt)}
                style={{
                  padding: '10px 14px',
                  fontSize: 13,
                  color: '#0f172a',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#eff6ff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontWeight: 500 }}>{highlight(opt.label, debouncedQuery)}</span>
                {opt.sublabel && (
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{opt.sublabel}</span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Chips */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {selected.map(s => (
            <span key={s.value} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px 4px 12px',
              background: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #bfdbfe',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
            }}>
              {s.label}
              <button
                onClick={() => onRemove?.(s)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#bfdbfe', border: 'none', borderRadius: '50%',
                  width: 16, height: 16, cursor: 'pointer', color: '#1d4ed8', padding: 0,
                }}
              >
                <IconX />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
