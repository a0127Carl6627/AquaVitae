import React, { useState } from 'react';

const empresas = ['Empresa A', 'Empresa B', 'Empresa C', 'Empresa D'];

function Campo({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{label}</label>
      {children}
    </div>
  );
}

const estiloInput = {
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#334155',
  outline: 'none',
  fontFamily: 'sans-serif',
  backgroundColor: '#fff',
};

export default function EditUserModal({ isOpen = true, user = {}, onChange }) {
  const [form, setForm] = useState({
    nombre: user.nombre || '',
    correo: user.correo || '',
    contrasena: '',
    confirmarContrasena: '',
    empresa: user.empresa || '',
    isAdmin: user.isAdmin || false,
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleChange(field, value) {
    const nuevoForm = { ...form, [field]: value };
    setForm(nuevoForm);
    if (onChange) onChange(nuevoForm);

    if (field === 'confirmarContrasena' || field === 'contrasena') {
      const pass = field === 'contrasena' ? value : form.contrasena;
      const confirm = field === 'confirmarContrasena' ? value : form.confirmarContrasena;
      setError(confirm && pass !== confirm ? 'Las contraseñas no coinciden' : '');
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      fontFamily: 'sans-serif',
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '32px',
        width: '480px',
        maxWidth: '95vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        {/* Encabezado */}
        <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
            Editar Usuario
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>
            Completa la información para modificar este perfil.
          </p>
        </div>

        {/* Formulario */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Nombre + Toggle Admin */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <Campo label="Nombre">
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={form.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  style={estiloInput}
                />
              </Campo>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '10px' }}>
              <div
                onClick={() => handleChange('isAdmin', !form.isAdmin)}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: form.isAdmin ? '#3b82f6' : '#cbd5e1',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '3px',
                  left: form.isAdmin ? '23px' : '3px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
              <span style={{ fontSize: '14px', color: '#334155', whiteSpace: 'nowrap' }}>¿Admin?</span>
            </div>
          </div>

          {/* Correo */}
          <Campo label="Correo">
            <input
              type="email"
              placeholder="usuario@empresa.com"
              value={form.correo}
              onChange={e => handleChange('correo', e.target.value)}
              style={estiloInput}
            />
          </Campo>

          {/* Contraseñas */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Campo label="Contraseña">
              <input
                type="password"
                placeholder="••••••••"
                value={form.contrasena}
                onChange={e => handleChange('contrasena', e.target.value)}
                style={{ ...estiloInput, width: '100%' }}
              />
            </Campo>
            <Campo label="Confirma contraseña">
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirmarContrasena}
                onChange={e => handleChange('confirmarContrasena', e.target.value)}
                style={{ ...estiloInput, width: '100%', borderColor: error ? '#ef4444' : '#e2e8f0' }}
              />
            </Campo>
          </div>
          {error && <span style={{ fontSize: '12px', color: '#ef4444', marginTop: '-10px' }}>{error}</span>}

          {/* Empresa */}
          <Campo label="Empresa">
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
              </span>
              <select
                value={form.empresa}
                onChange={e => handleChange('empresa', e.target.value)}
                style={{ ...estiloInput, width: '100%', paddingLeft: '36px', appearance: 'none' }}
              >
                <option value="">Selecciona una empresa</option>
                {empresas.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </div>
          </Campo>

        </div>
      </div>
    </div>
  );
}
