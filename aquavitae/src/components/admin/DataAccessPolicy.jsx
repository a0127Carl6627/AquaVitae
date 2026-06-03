// Components/DataAccessPolicy.jsx
import React from 'react';

const TH = 'border-b border-[#edf2f7] bg-[#f9fafb] px-6 py-3.5 text-left text-[13px] font-semibold text-[#5b6e8c]';
const TD = 'border-b border-[#f0f2f5] px-6 py-4 text-sm text-[#1f2a3e]';

// Clases de badge según el rol (mismas que en UsersTable y RolesHighlight)
const ROLE_BADGE = {
  Administrador: 'bg-[#fee2e2] text-[#b91c1c]',
  Director: 'bg-[#fff3e8] text-[#ea580c]',
  'Gerente de Planta': 'bg-[#e0f2fe] text-[#0369a1]',
  Analista: 'bg-[#e6f7e6] text-[#2e7d32]',
  Operador: 'bg-[#f3e8ff] text-[#6b21a5]',
};
const getRoleClass = (rol) => ROLE_BADGE[rol] || 'bg-[#f1f5f9] text-[#334155]';

export default function DataAccessPolicy({ politicas }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#edf2f7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="px-6 pb-2 pt-[18px] text-lg font-semibold text-[#1a2c3e]">Política de acceso a datos</div>
      <div className="m-0 border-b border-[#edf2f7] px-6 pb-[18px] text-sm text-[#5b6e8c]">
        Define qué datos puede ver cada rol según región o planta.
      </div>
      <table className="w-full border-collapse [font-family:system-ui,sans-serif]">
        <thead>
          <tr>
            <th className={TH}>Rol</th>
            <th className={TH}>Acceso a datos</th>
          </tr>
        </thead>
        <tbody>
          {politicas.map((item, idx) => (
            <tr key={idx}>
              <td className={TD}>
                <span className={`inline-block w-[160px] min-w-[160px] rounded-[40px] px-3 py-1 text-center text-xs font-medium ${getRoleClass(item.rol)}`}>
                  {item.rol}
                </span>
              </td>
              <td className={TD}>{item.acceso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
