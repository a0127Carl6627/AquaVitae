import React from 'react';

const ROL_COLORS = {
  'Director':          { bg: '#dbeafe', text: '#1d4ed8', border: '#bfdbfe' },
  'Gerente de Planta': { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
  'Analista':          { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
  'Operador':          { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' },
};

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
    <span style={{ color: '#d1d5db', fontSize: 16, fontWeight: 500, lineHeight: 1 }}
      aria-label="Sin permiso">
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
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 16px' }}>
        Detalle de permisos por módulo
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{
                padding: '10px 14px', textAlign: 'left',
                fontWeight: 500, fontSize: 13, color: '#6b7280',
                width: '30%',
              }}>
                Módulo
              </th>

              {rolesVisibles.map(rol => {
                const c = ROL_COLORS[rol] ?? { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
                return (
                  <th key={rol} style={{ padding: '10px 10px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                      background: c.bg,
                      color: c.text,
                      border: `1px solid ${c.border}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {rol}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {modules.map((mod, i) => (
              <tr key={mod}
                style={{ borderBottom: i === modules.length - 1 ? 'none' : '1px solid #f3f4f6' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                <td style={{
                  padding: '13px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#374151',
                }}>
                  {mod}
                </td>

                {rolesVisibles.map(rol => {
                  const tiene = permissions[rol]?.[mod] ?? false;
                  return (
                    <td key={rol} style={{ padding: '13px 10px', textAlign: 'center' }}>
                      {tiene ? <CheckIcon /> : <DashIcon />}
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
  'Alertas', 'Simulaciones', 'Reportes', 'Configuración',
];

export const ROLES_DEFAULT = [
  'Director', 'Gerente de Planta', 'Analista', 'Operador',
];

export const PERMISSIONS_DEFAULT = {
  'Director':          { Resumen: true,  Plantas: true,  'Fuentes de agua': true,  Riesgos: true,  Alertas: true,  Simulaciones: true,  Reportes: true,  Configuración: true  },
  'Gerente de Planta': { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,  Configuración: true  },
  'Analista':          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,  Configuración: false },
  'Operador':          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: false, Configuración: false },
};