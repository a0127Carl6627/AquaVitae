import React from 'react';

// Clases de badge por rol (set fijo, detectables por el JIT).
const ROL_CLASS = {
  'Director':          'bg-[#dbeafe] text-[#1d4ed8] border-[#bfdbfe]',
  'Gerente de Planta': 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]',
  'Analista':          'bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]',
  'Operador':          'bg-[#fce7f3] text-[#be185d] border-[#fbcfe8]',
};
const getRolClass = (rol) => ROL_CLASS[rol] || 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      aria-label="Tiene permiso">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function DashIcon() {
  return (
    <span className="text-base font-medium leading-none text-gray-300" aria-label="Sin permiso">
      —
    </span>
  );
}

export default function PermissionsMatrix({
  modules = MODULES_DEFAULT,
  roles   = ROLES_DEFAULT,
  permissions = PERMISSIONS_DEFAULT,
}) {
  const rolesVisibles = roles.filter(r => r !== 'Administrador');

  return (
    <div className="[font-family:'Inter',system-ui,sans-serif]">
      <h3 className="m-0 mb-4 text-[15px] font-semibold text-gray-900">
        Detalle de permisos por módulo
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="w-[30%] px-3.5 py-2.5 text-left text-[13px] font-medium text-gray-500">
                Módulo
              </th>

              {rolesVisibles.map(rol => (
                <th key={rol} className="px-2.5 py-2.5 text-center">
                  <span className={`inline-block whitespace-nowrap rounded-[20px] border px-3 py-1 text-xs font-medium ${getRolClass(rol)}`}>
                    {rol}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {modules.map((mod, i) => (
              <tr
                key={mod}
                className={`hover:bg-[#f9fafb] ${i === modules.length - 1 ? '' : 'border-b border-gray-100'}`}
              >
                <td className="px-3.5 py-[13px] text-[13px] font-medium text-gray-700">
                  {mod}
                </td>

                {rolesVisibles.map(rol => {
                  const tiene = permissions[rol]?.[mod] ?? false;
                  return (
                    <td key={rol} className="px-2.5 py-[13px]">
                      <div className="flex items-center justify-center">
                        {tiene ? <CheckIcon /> : <DashIcon />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const MODULES_DEFAULT = [
  'Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos',
  'Alertas', 'Simulaciones', 'Reportes',
];

export const ROLES_DEFAULT = [
  'Director', 'Gerente de Planta', 'Analista', 'Operador',
];

export const PERMISSIONS_DEFAULT = {
  'Director':          { Resumen: true,  Plantas: true,  'Fuentes de agua': true,  Riesgos: true,  Alertas: true,  Simulaciones: true,  Reportes: true,   },
  'Gerente de Planta': { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,  },
  'Analista':          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,   },
  'Operador':          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: false,  },
};
