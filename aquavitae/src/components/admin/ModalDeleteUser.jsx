// Components/ModalDeleteUser.jsx
import React from 'react';

export default function ModalDeleteUser({ user, onConfirm, onCancel }) {
  if (!user) return null;

  const { nombreCompleto, correo, nombreRol, regionPlanta } = user;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 [font-family:'Inter',system-ui,sans-serif]"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[480px] overflow-hidden rounded-3xl bg-white shadow-[0_20px_35px_-10px_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-7 pb-4 pt-6">
          <h2 className="m-0 text-xl font-semibold text-gray-800">¿Eliminar usuario?</h2>
          <p className="mt-2 text-sm leading-normal text-gray-500">
            Esta acción no se puede deshacer.
            <br />
            El usuario y su acceso a la plataforma serán eliminados permanentemente.
          </p>
        </div>

        <div className="mx-7 mb-6 rounded-[20px] border border-[#f0f2f5] bg-gray-50 px-5 py-[18px]">
          <div className="mb-1 text-base font-semibold text-gray-900">{nombreCompleto || 'Usuario'}</div>
          <div className="mb-3 text-[13px] text-gray-500">{correo || '—'}</div>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <span>
              <strong>Rol:</strong> {nombreRol || '—'}
            </span>
            <span>
              <strong>Región:</strong> {regionPlanta || '—'}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#edf2f7] bg-white px-7 pb-7 pt-4">
          <button
            className="cursor-pointer rounded-[40px] border border-[#e2e8f0] bg-white px-[18px] py-2 text-[13px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="cursor-pointer rounded-[40px] border-none bg-[#ef4444] px-[18px] py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#dc2626]"
            onClick={() => onConfirm(user)}
          >
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  );
}
