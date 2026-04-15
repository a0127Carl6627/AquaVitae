import React, { useState, useRef, useEffect } from 'react';

const OPCIONES = ['Zona Norte', 'Bajío', 'Centro'];

export default function DropdownRegionPlanta({ valor, onChange }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickFuera(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFuera);
    return () => document.removeEventListener('mousedown', handleClickFuera);
  }, []);

  const seleccionar = (opcion) => {
    onChange && onChange(opcion);
    setAbierto(false);
  };

  const seleccionado = valor || OPCIONES[0];

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', minWidth: '240px' }}>
      <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', letterSpacing: '0.08em', marginBottom: '4px' }}>
        REGIÓN / PLANTA
      </div>
      <button
        onClick={() => setAbierto(!abierto)}
        style={{
          width: '100%',
          padding: '10px 14px',
          backgroundColor: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#1e293b',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          fontFamily: 'inherit',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <span>{seleccionado}</span>
        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{abierto ? '▲' : '▼'}</span>
      </button>

      {abierto && (
        <ul style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          listStyle: 'none',
          margin: 0,
          padding: '4px 0',
          zIndex: 100,
        }}>
          {OPCIONES.map((op, i) => (
            <li
              key={i}
              onClick={() => seleccionar(op)}
              style={{
                padding: '10px 14px',
                fontSize: '14px',
                fontWeight: seleccionado === op ? '600' : '400',
                color: seleccionado === op ? '#1d4ed8' : '#1e293b',
                backgroundColor: seleccionado === op ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = seleccionado === op ? '#eff6ff' : 'transparent')}
            >
              {op}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
