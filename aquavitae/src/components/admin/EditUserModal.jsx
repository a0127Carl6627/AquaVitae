import React, { useState, useEffect } from 'react';
import { editarUsuario } from '../../services/aquavitaeApi';

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

export default function EditUserModal({ isOpen, usuario, roles = [], plantas = [], onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    correo: '',
    telefono: '',
    activo: true,
    idRol: '',
    contrasena: '',
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync form when usuario prop changes
  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || '',
        apellido: usuario.apellido || '',
        nombreUsuario: usuario.nombreUsuario || '',
        correo: usuario.correo || '',
        telefono: usuario.telefono || '',
        activo: usuario.activo !== undefined ? usuario.activo : true,
        idRol: usuario.idRol ? String(usuario.idRol) : '',
        contrasena: '',
      });
      setMostrarContrasena(false);
      setErrorMsg('');
    }
  }, [usuario]);

  if (!isOpen || !usuario) return null;

  // Rol seleccionado y sus permisos
  const rolSeleccionado = roles.find(r => String(r.id) === String(form.idRol));
  const permisosRol = rolSeleccionado?.permisos || {};

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleGuardar() {
    setErrorMsg('');
    setGuardando(true);
    try {
      const dto = {
        nombre: form.nombre,
        apellido: form.apellido,
        nombreUsuario: form.nombreUsuario,
        correo: form.correo,
        telefono: form.telefono,
        activo: form.activo,
        idRol: form.idRol ? Number(form.idRol) : null,
      };
      if (mostrarContrasena && form.contrasena) {
        dto.contrasena = form.contrasena;
      }
      await editarUsuario(usuario.id, dto);
      onSave && onSave();
    } catch (err) {
      setErrorMsg(err.message || 'Error al guardar');
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
            Usuarios y roles &rsaquo; <span style={{ color: '#1a2332', fontWeight: 500 }}>Editar usuario</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1a2332', margin: '0 0 4px' }}>
                Editar usuario
              </h1>
              <p style={{ fontSize: '13px', color: '#5a6577', margin: 0 }}>
                Modifica la información del usuario y sus permisos de acceso.
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
                    placeholder="Ej. María Fernanda"
                    value={form.nombre}
                    onChange={e => handleChange('nombre', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
                <Campo label="Nombre de usuario" required>
                  <input
                    type="text"
                    placeholder="Ej. maria.gomez"
                    value={form.nombreUsuario}
                    onChange={e => handleChange('nombreUsuario', e.target.value)}
                    style={estiloInput}
                  />
                </Campo>
              </div>

              {/* Fila 2: Correo + Estado */}
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
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.activo ? 'activo' : 'inactivo'}
                      onChange={e => handleChange('activo', e.target.value === 'activo')}
                      style={{ ...estiloInput, appearance: 'none', paddingLeft: '36px' }}
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                    </select>
                    {/* Dot indicator */}
                    <span style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: form.activo ? '#22c55e' : '#94a3b8',
                      display: 'inline-block',
                      pointerEvents: 'none',
                    }} />
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#94a3b8',
                    }}>▾</span>
                  </div>
                </Campo>
              </div>

              {/* Fila 3: Teléfono + Contraseña */}
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
                <Campo label="Contraseña">
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {mostrarContrasena ? (
                      <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={form.contrasena}
                        onChange={e => handleChange('contrasena', e.target.value)}
                        style={{ ...estiloInput, flex: 1 }}
                        autoFocus
                      />
                    ) : (
                      <input
                        type="password"
                        value="••••••••••"
                        readOnly
                        style={{ ...estiloInput, flex: 1, color: '#94a3b8', cursor: 'default' }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => { setMostrarContrasena(v => !v); handleChange('contrasena', ''); }}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                        color: '#1a2332',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {mostrarContrasena ? 'Cancelar' : 'Cambiar contraseña'}
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
                    Puede actualizar la información del usuario y sus permisos. Los cambios se aplicarán inmediatamente.
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
                    const tienePermiso = permisosRol[modulo] !== undefined
                      ? permisosRol[modulo]
                      : rolSeleccionado
                        ? !!permisosRol[modulo.toLowerCase()] || !!permisosRol[modulo]
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
              <strong>Importante:</strong> Al guardar los cambios, el usuario recibirá una notificación si se modificó su correo o rol.
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
              {guardando ? 'Guardando...' : '💾 Guardar cambios'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
