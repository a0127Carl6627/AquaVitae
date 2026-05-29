import React, { useState } from 'react';
import { crearUsuario, generarContrasena } from '../services/aquavitaeApi';

// ── Estilos base ──────────────────────────────────────────────────────────────
const estiloInput = {
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#1a2332',
  outline: 'none',
  fontFamily: 'inherit',
  backgroundColor: '#fff',
  width: '100%',
  boxSizing: 'border-box',
};

const estiloLabel = {
  fontSize: '13px',
  fontWeight: '500',
  color: '#5a6577',
  marginBottom: '6px',
  display: 'block',
};

const estiloLabelRequerido = {
  ...estiloLabel,
  color: '#1a2332',
};

// Módulos de permiso del rol
const MODULOS_PERMISO = [
  'Resumen',
  'Plantas',
  'Fuentes de agua',
  'Riesgos',
  'Simulaciones',
  'Reportes',
  'Configuración',
];


function Campo({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={required ? estiloLabelRequerido : estiloLabel}>
        {label}{required && <span style={{ color: '#e23b3b', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function NewUserModal({ isOpen, roles = [], plantas = [], idEmpresa, onClose, onSave }) {
  const [form, setForm] = useState({
    nombreCompleto: '',
    nombreUsuario: '',
    correo: '',
    telefono: '',
    contrasenaTemp: '',
    idRol: '',
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Rol seleccionado y sus permisos
  const rolSeleccionado = roles.find(r => String(r.id) === String(form.idRol));
  const permisosRol = rolSeleccionado?.permisos || {};

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleGenerarContrasena() {
    setGenerando(true);
    try {
      const data = await generarContrasena();
      handleChange('contrasenaTemp', data.contrasena || data);
      setMostrarContrasena(true);
    } catch (err) {
      setErrorMsg(err.message || 'Error al generar contraseña');
    } finally {
      setGenerando(false);
    }
  }

  // Split "Nombre completo" → nombre + apellido
  function parsearNombre(nombreCompleto) {
    const trimmed = (nombreCompleto || '').trim();
    const idx = trimmed.indexOf(' ');
    if (idx === -1) {
      return { nombre: trimmed, apellido: '-' };
    }
    return { nombre: trimmed.slice(0, idx), apellido: trimmed.slice(idx + 1) };
  }

  async function handleGuardar() {
    setErrorMsg('');

    // Validaciones básicas
    if (!form.nombreCompleto.trim()) { setErrorMsg('El nombre completo es requerido.'); return; }
    if (!form.correo.trim()) { setErrorMsg('El correo electrónico es requerido.'); return; }
    if (!form.contrasenaTemp.trim()) { setErrorMsg('La contraseña temporal es requerida.'); return; }
    if (form.contrasenaTemp.trim().length < 8) { setErrorMsg('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (!form.idRol) { setErrorMsg('Debe seleccionar un rol.'); return; }

    setGuardando(true);
    try {
      const { nombre, apellido } = parsearNombre(form.nombreCompleto);
      const dto = {
        nombre,
        apellido,
        correo: form.correo.trim(),
        telefono: form.telefono.trim() || undefined,
        idRol: Number(form.idRol),
        idEmpresa: idEmpresa != null ? Number(idEmpresa) : 1,
        contrasenaTemp: form.contrasenaTemp.trim(),
      };
      await crearUsuario(dto);
      onSave && onSave();
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear usuario');
    } finally {
      setGuardando(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15,23,42,0.45)',
        zIndex: 1000,
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '32px 16px 48px',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '920px',
          boxShadow: '0 16px 48px rgba(15,23,42,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* ── Encabezado ── */}
        <div style={{ padding: '28px 32px 20px', borderBottom: '1px solid #e6eaf0' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: '12px', color: '#8a93a3', marginBottom: '8px' }}>
            Usuarios y roles &rsaquo; <span style={{ color: '#1a2332', fontWeight: 500 }}>Agregar usuario</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a2332', margin: '0 0 4px' }}>
                Agregar nuevo usuario
              </h1>
              <p style={{ fontSize: '13px', color: '#5a6577', margin: 0 }}>
                Completa la información para registrar un nuevo usuario en la plataforma.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#3b7dd8',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0',
                flexShrink: 0,
              }}
            >
              ← Volver a usuarios
            </button>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div style={{ padding: '28px 32px 24px' }}>

          {/* Fila superior: Información general (2/3) + Sobre los usuarios (1/3) */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '28px', alignItems: 'flex-start' }}>

            {/* Información general */}
            <div style={{ flex: '2', minWidth: 0 }}>
              <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#1a2332', margin: '0 0 16px' }}>
                Información general
              </h2>

              {/* Fila 1: Nombre completo + Nombre de usuario */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <Campo label="Nombre completo" required>
                  <input
                    type="text"
                    placeholder="Ej. María Fernanda López"
                    value={form.nombreCompleto}
                    onChange={e => handleChange('nombreCompleto', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
                <Campo label="Nombre de usuario" required>
                  <input
                    type="text"
                    placeholder="Ej. maria.lopez"
                    value={form.nombreUsuario}
                    onChange={e => handleChange('nombreUsuario', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
              </div>

              {/* Fila 2: Correo + Estado (fijo "Activo") */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <Campo label="Correo electrónico" required>
                  <input
                    type="email"
                    placeholder="usuario@empresa.com"
                    value={form.correo}
                    onChange={e => handleChange('correo', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
                <Campo label="Estado">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      display: 'inline-block',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '14px', color: '#1a2332', fontWeight: '500' }}>Activo</span>
                  </div>
                </Campo>
              </div>

              {/* Fila 3: Teléfono + Contraseña temporal + Generar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Campo label="Teléfono (opcional)">
                  <input
                    type="tel"
                    placeholder="+52 81 2345 6789"
                    value={form.telefono}
                    onChange={e => handleChange('telefono', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
                <Campo label="Contraseña temporal" required>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input
                        type={mostrarContrasena ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.contrasenaTemp}
                        onChange={e => handleChange('contrasenaTemp', e.target.value)}
                        style={{ ...estiloInput, paddingRight: '38px' }}
                      />
                      {/* Toggle show/hide */}
                      <button
                        type="button"
                        onClick={() => setMostrarContrasena(v => !v)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#94a3b8',
                          padding: '0',
                          lineHeight: 1,
                          fontSize: '15px',
                        }}
                        title={mostrarContrasena ? 'Ocultar contraseña' : 'Ver contraseña'}
                      >
                        {mostrarContrasena ? (
                          // Eye-off icon
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                          </svg>
                        ) : (
                          // Eye icon
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        )}
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerarContrasena}
                      disabled={generando}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #3b7dd8',
                        background: generando ? '#93b8eb' : '#3b7dd8',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: generando ? 'not-allowed' : 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        transition: 'background 0.15s',
                      }}
                    >
                      {generando ? 'Generando...' : 'Generar contraseña'}
                    </button>
                  </div>
                </Campo>
              </div>
            </div>

            {/* Sobre los usuarios */}
            <div style={{
              flex: '1',
              minWidth: '220px',
              backgroundColor: '#f0f6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '12px',
              padding: '20px',
              marginTop: '32px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>ℹ️</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af', margin: '0 0 6px' }}>
                    Sobre los usuarios
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#3b5999', margin: 0, lineHeight: '1.5' }}>
                    El usuario recibirá un correo con su contraseña temporal y deberá cambiarla en su primer inicio de sesión.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Asignación de rol y permisos ── */}
          <div style={{ borderTop: '1px solid #e6eaf0', paddingTop: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#1a2332', margin: '0 0 20px' }}>
              Asignación de rol y permisos
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'flex-start' }}>

              {/* Columna izquierda: Rol */}
              <div>
                <Campo label="Seleccionar rol" required>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.idRol}
                      onChange={e => handleChange('idRol', e.target.value)}
                      style={{ ...estiloInput, appearance: 'none', paddingRight: '32px' }}
                    >
                      <option value="">Seleccionar rol</option>
                      {roles.map(r => (
                        <option key={r.id} value={String(r.id)}>{r.nombre}</option>
                      ))}
                    </select>
                    <span style={{
                      position: 'absolute', right: '12px', top: '50%',
                      transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8',
                    }}>▾</span>
                  </div>
                </Campo>
                {rolSeleccionado?.descripcion && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#5a6577', margin: '0 0 4px', fontWeight: '500' }}>
                      Descripción del rol
                    </p>
                    <p style={{ fontSize: '12.5px', color: '#5a6577', margin: 0, lineHeight: '1.5' }}>
                      {rolSeleccionado.descripcion}
                    </p>
                  </div>
                )}
              </div>

              {/* Columna derecha: Permisos del rol */}
              <div>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#1a2332', margin: '0 0 12px' }}>
                  Permisos del rol
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {MODULOS_PERMISO.map(modulo => {
                    const tienePermiso = rolSeleccionado
                      ? (permisosRol[modulo] !== undefined
                          ? !!permisosRol[modulo]
                          : !!permisosRol[modulo.toLowerCase()])
                      : false;
                    return (
                      <label
                        key={modulo}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'default' }}
                      >
                        <input
                          type="checkbox"
                          checked={!!tienePermiso}
                          readOnly
                          disabled
                          style={{ accentColor: '#3b7dd8', width: '15px', height: '15px' }}
                        />
                        <span style={{
                          fontSize: '13px',
                          color: tienePermiso ? '#1a2332' : '#94a3b8',
                          fontWeight: tienePermiso ? '500' : '400',
                        }}>
                          {modulo}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ── Nota importante ── */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: '12.5px', color: '#92400e', margin: 0, lineHeight: '1.5' }}>
              <strong>Importante:</strong> El usuario quedará registrado como activo y podrá iniciar sesión con su correo y la contraseña temporal enviada.
            </p>
          </div>

          {/* ── Error ── */}
          {errorMsg && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#dc2626',
            }}>
              {errorMsg}
            </div>
          )}

          {/* ── Botones ── */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={guardando}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#5a6577',
                fontSize: '14px',
                fontWeight: '500',
                cursor: guardando ? 'not-allowed' : 'pointer',
                opacity: guardando ? 0.6 : 1,
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              disabled={guardando}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: guardando ? '#93b8eb' : '#3b7dd8',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: guardando ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.15s',
              }}
            >
              {guardando ? 'Guardando...' : 'Guardar usuario'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
