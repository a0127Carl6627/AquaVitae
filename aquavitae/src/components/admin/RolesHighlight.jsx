// Components/RolesHighlight.jsx
import React from 'react';

const TH = 'border-b border-[#edf2f7] bg-[#f9fafb] px-6 py-3.5 text-left text-[13px] font-semibold text-[#5b6e8c]';
const TD = 'border-b border-[#f0f2f5] px-6 py-4 text-sm text-[#1f2a3e]';

// Clases de badge según el rol
const ROLE_BADGE = {
  Administrador: 'bg-[#fee2e2] text-[#b91c1c]',
  Director: 'bg-[#fff3e8] text-[#ea580c]',
  'Gerente de Planta': 'bg-[#e0f2fe] text-[#0369a1]',
  Analista: 'bg-[#e6f7e6] text-[#2e7d32]',
  Operador: 'bg-[#f3e8ff] text-[#6b21a5]',
};
const getRoleClass = (rol) => ROLE_BADGE[rol] || 'bg-[#f1f5f9] text-[#334155]';

export default function RolesHighlight({ roles }) {
  // Filtramos para excluir al rol "Administrador" (como se pide en la imagen)
  const filteredRoles = roles.filter(rol => rol.nombre !== 'Administrador');

  return (
    <div className="mb-8 overflow-hidden rounded-[20px] border border-[#edf2f7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="border-b border-[#edf2f7] px-6 py-[18px] text-lg font-semibold text-[#1a2c3e]">Roles y permisos destacados</div>
      <table className="w-full border-collapse [font-family:system-ui,sans-serif]">
        <thead>
          <tr><th className={TH}>Rol</th><th className={TH}>Descripción</th><th className={TH}>Permisos</th></tr>
        </thead>
        <tbody>
          {filteredRoles.map((rol) => (
            <tr key={rol.id}>
              <td className={TD}>
                <span className={`inline-block w-[160px] min-w-[160px] rounded-[40px] px-3 py-1 text-center text-xs font-medium ${getRoleClass(rol.nombre)}`}>
                  {rol.nombre}
                </span>
              </td>
              <td className={TD}>{rol.descripcion}</td>
              <td className={TD}>
                <span className="inline-block rounded-[40px] bg-[#eff6ff] px-2.5 py-1 text-xs font-medium text-[#2563eb]">{rol.cantidadPermisos} permisos</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
