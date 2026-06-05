import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { crearUsuario, generarContrasena } from '../../services/aquavitaeApi';

// ── Clases base ───────────────────────────────────────────────────────────────
const INPUT = 'box-border w-full rounded-lg border border-[#e2e8f0] bg-white px-3.5 py-2.5 text-sm text-[#1a2332] outline-none [font-family:inherit]';
const LABEL = 'mb-1.5 block text-[13px] font-medium text-[#5a6577]';
const LABEL_REQ = 'mb-1.5 block text-[13px] font-medium text-[#1a2332]';

const MODULOS_PERMISO = [
  'Resumen',
  'Plantas',
  'Fuentes de agua',
  'Riesgos',
  'Alertas',
  'Simulaciones',
  'Reportes',
  'Configuración',
];

const PERMISOS_DEFAULT_POR_ROL = {
  'Administrador':     ['Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos', 'Alertas', 'Simulaciones', 'Reportes', 'Configuración'],
  'Director':          ['Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos', 'Alertas', 'Simulaciones', 'Reportes'],
  'Gerente de Planta': ['Resumen', 'Plantas', 'Riesgos', 'Alertas', 'Reportes'],
  'Analista':          ['Resumen', 'Plantas', 'Riesgos', 'Alertas', 'Reportes'],
  'Operador':          ['Resumen', 'Plantas'],
};


function Campo({ label, required, children }) {
  return (
    <div className="flex flex-col">
      <label className={required ? LABEL_REQ : LABEL}>
        {label}{required && <span className="ml-0.5 text-[#e23b3b]">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function NewUserModal({ isOpen, roles = [], plantas = [], idEmpresa, onClose, onSave }) {
  const [form, setForm] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    contrasenaTemp: '',
    idRol: '',
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [generando, setGenerando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [permisosActivos, setPermisosActivos] = useState(new Set());

  const rolSeleccionado = roles.find(r => String(r.id) === String(form.idRol));

  useEffect(() => {
    const rolNuevo = roles.find(r => String(r.id) === String(form.idRol));
    setPermisosActivos(new Set(PERMISOS_DEFAULT_POR_ROL[rolNuevo?.nombre] || []));
  }, [form.idRol, roles]);

  if (!isOpen) return null;

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function togglePermiso(modulo) {
    setPermisosActivos(prev => {
      const next = new Set(prev);
      next.has(modulo) ? next.delete(modulo) : next.add(modulo);
      return next;
    });
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
        modulos: Array.from(permisosActivos),
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
    <div className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-[rgba(15,23,42,0.45)] px-4 pb-12 pt-8 [font-family:'Inter','Segoe_UI',sans-serif]">
      <div className="w-full max-w-[920px] overflow-hidden rounded-2xl bg-white shadow-[0_16px_48px_rgba(15,23,42,0.18)]">
        {/* ── Encabezado ── */}
        <div className="border-b border-[#e6eaf0] px-8 pb-5 pt-7">
          {/* Breadcrumb */}
          <div className="mb-2 text-xs text-[#8a93a3]">
            Usuarios y roles &rsaquo; <span className="font-medium text-[#1a2332]">Agregar usuario</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="m-0 mb-1 text-[22px] font-bold text-[#1a2332]">
                Agregar nuevo usuario
              </h1>
              <p className="m-0 text-[13px] text-[#5a6577]">
                Completa la información para registrar un nuevo usuario en la plataforma.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex shrink-0 cursor-pointer items-center gap-1 border-none bg-none py-1 text-[13px] font-medium text-[#3b7dd8]"
            >
              ← Volver a usuarios
            </button>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div className="px-8 pb-6 pt-7">

          {/* Fila superior: Información general (2/3) + Sobre los usuarios (1/3) */}
          <div className="mb-7 flex items-start gap-6">

            {/* Información general */}
            <div className="min-w-0 flex-[2]">
              <h2 className="m-0 mb-4 text-[15px] font-semibold text-[#1a2332]">
                Información general
              </h2>

              {/* Fila 1: Nombre completo */}
              <div className="mb-4">
                <Campo label="Nombre completo" required>
                  <input
                    type="text"
                    placeholder="Ej. María Fernanda López"
                    value={form.nombreCompleto}
                    onChange={e => handleChange('nombreCompleto', e.target.value)}
                    className={INPUT}
                  />
                </Campo>
              </div>

              {/* Fila 2: Correo + Estado (fijo "Activo") */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <Campo label="Correo electrónico" required>
                  <input
                    type="email"
                    placeholder="usuario@empresa.com"
                    value={form.correo}
                    onChange={e => handleChange('correo', e.target.value)}
                    className={INPUT}
                  />
                </Campo>
                <Campo label="Estado">
                  <div className="flex items-center gap-2.5 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5">
                    <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
                    <span className="text-sm font-medium text-[#1a2332]">Activo</span>
                  </div>
                </Campo>
              </div>

              {/* Fila 3: Teléfono + Contraseña temporal + Generar */}
              <div className="grid grid-cols-2 gap-4">
                <Campo label="Teléfono (opcional)">
                  <input
                    type="tel"
                    placeholder="+52 81 2345 6789"
                    value={form.telefono}
                    onChange={e => handleChange('telefono', e.target.value)}
                    className={INPUT}
                  />
                </Campo>
                <Campo label="Contraseña temporal" required>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type={mostrarContrasena ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={form.contrasenaTemp}
                        onChange={e => handleChange('contrasenaTemp', e.target.value)}
                        className="box-border w-full rounded-lg border border-[#e2e8f0] bg-white py-2.5 pl-3.5 pr-[38px] text-sm text-[#1a2332] outline-none [font-family:inherit]"
                      />
                      {/* Toggle show/hide */}
                      <button
                        type="button"
                        onClick={() => setMostrarContrasena(v => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-none p-0 text-[15px] leading-none text-[#94a3b8]"
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
                      className={clsx('shrink-0 whitespace-nowrap rounded-lg border border-[#3b7dd8] px-3.5 py-2.5 text-[13px] font-medium text-white transition-colors', generando ? 'cursor-not-allowed bg-[#93b8eb]' : 'cursor-pointer bg-[#3b7dd8]')}
                    >
                      {generando ? 'Generando...' : 'Generar contraseña'}
                    </button>
                  </div>
                </Campo>
              </div>
            </div>

            {/* Sobre los usuarios */}
            <div className="mt-8 min-w-[220px] flex-1 rounded-xl border border-[#bfdbfe] bg-[#f0f6ff] p-5">
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 text-xl">ℹ️</span>
                <div>
                  <p className="m-0 mb-1.5 text-[13px] font-semibold text-[#1e40af]">
                    Sobre los usuarios
                  </p>
                  <p className="m-0 text-[12.5px] leading-normal text-[#3b5999]">
                    El usuario recibirá un correo con su contraseña temporal y deberá cambiarla en su primer inicio de sesión.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Asignación de rol y permisos ── */}
          <div className="mb-6 border-t border-[#e6eaf0] pt-6">
            <h2 className="m-0 mb-5 text-[15px] font-semibold text-[#1a2332]">
              Asignación de rol y permisos
            </h2>

            <div className="grid grid-cols-3 items-start gap-6">

              {/* Columna izquierda: Rol */}
              <div>
                <Campo label="Seleccionar rol" required>
                  <div className="relative">
                    <select
                      value={form.idRol}
                      onChange={e => handleChange('idRol', e.target.value)}
                      className="box-border w-full appearance-none rounded-lg border border-[#e2e8f0] bg-white py-2.5 pl-3.5 pr-8 text-sm text-[#1a2332] outline-none [font-family:inherit]"
                    >
                      <option value="">Seleccionar rol</option>
                      {roles.map(r => (
                        <option key={r.id} value={String(r.id)}>{r.nombre}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">▾</span>
                  </div>
                </Campo>
                {rolSeleccionado?.descripcion && (
                  <div className="mt-2.5">
                    <p className="m-0 mb-1 text-xs font-medium text-[#5a6577]">
                      Descripción del rol
                    </p>
                    <p className="m-0 text-[12.5px] leading-normal text-[#5a6577]">
                      {rolSeleccionado.descripcion}
                    </p>
                  </div>
                )}
              </div>

              {/* Columna derecha: Permisos del usuario */}
              <div>
                <p className="m-0 mb-3 text-[13px] font-medium text-[#1a2332]">
                  Permisos del usuario
                </p>
                <div className="flex flex-col gap-2">
                  {MODULOS_PERMISO.map(modulo => {
                    const activo = permisosActivos.has(modulo);
                    return (
                      <label
                        key={modulo}
                        className="flex cursor-pointer items-center gap-2.5"
                      >
                        <input
                          type="checkbox"
                          checked={activo}
                          onChange={() => togglePermiso(modulo)}
                          className="h-[15px] w-[15px] cursor-pointer accent-[#3b7dd8]"
                        />
                        <span className={clsx('text-[13px]', activo ? 'font-medium text-[#1a2332]' : 'font-normal text-[#94a3b8]')}>
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
          <div className="mb-6 flex items-start gap-2.5 rounded-[10px] border border-[#fde68a] bg-[#fffbeb] px-4 py-3.5">
            <span className="shrink-0 text-base">ℹ️</span>
            <p className="m-0 text-[12.5px] leading-normal text-[#92400e]">
              <strong>Importante:</strong> El usuario quedará registrado como activo y podrá iniciar sesión con su correo y la contraseña temporal enviada.
            </p>
          </div>

          {/* ── Error ── */}
          {errorMsg && (
            <div className="mb-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-[13px] text-[#dc2626]">
              {errorMsg}
            </div>
          )}

          {/* ── Botones ── */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={guardando}
              className={clsx('rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-6 py-2.5 text-sm font-medium text-[#5a6577]', guardando ? 'cursor-not-allowed opacity-60' : 'cursor-pointer opacity-100')}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardar}
              disabled={guardando}
              className={clsx('flex items-center gap-2 rounded-lg border-none px-6 py-2.5 text-sm font-semibold text-white transition-colors', guardando ? 'cursor-not-allowed bg-[#93b8eb]' : 'cursor-pointer bg-[#3b7dd8]')}
            >
              {guardando ? 'Guardando...' : 'Guardar usuario'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
