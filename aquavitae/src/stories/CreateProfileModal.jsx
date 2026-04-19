import React, { useState } from 'react';

const estiloInput = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#334155',
  outline: 'none',
  fontFamily: 'sans-serif',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
};

export default function CreateProfileModal({ isOpen = true, onClose, onChange, initialData = {} }) {
  const [form, setForm] = useState({ nombre: initialData.nombre || '', descripcion: initialData.descripcion || '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleChange(field, value) {
    const nuevoForm = { ...form, [field]: value };
    setForm(nuevoForm);
    if (field === 'nombre' && value) setError('');
    if (onChange) onChange(nuevoForm);
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
        width: '440px',
        maxWidth: '95vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>
        {/* Encabezado */}
        <div style={{ marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
            Nuevo Perfil
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            Define un nuevo rol dentro del sistema.
          </p>
        </div>

        {/* Formulario */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Nombre del perfil */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
              Perfil <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. Supervisor Regional"
              value={form.nombre}
              onChange={e => handleChange('nombre', e.target.value)}
              style={{ ...estiloInput, borderColor: error ? '#ef4444' : '#e2e8f0' }}
            />
            {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
          </div>

          {/* Descripción */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
              Descripción
            </label>
            <textarea
              placeholder="Describe brevemente el rol y sus responsabilidades..."
              value={form.descripcion}
              onChange={e => handleChange('descripcion', e.target.value)}
              rows={3}
              style={{
                ...estiloInput,
                resize: 'vertical',
                lineHeight: '1.6',
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
