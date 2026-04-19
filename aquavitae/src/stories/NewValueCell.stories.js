import React from 'react';
import NewValueCell from './NewValueCell';
import PreviousValueCell from './PreviousValueCell';

export default {
  title: 'Auditoria/NewValueCell',
  component: NewValueCell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const ValorTextoCorto = {
  args: { value: 'supervisor' },
};

export const ValorTextoModificado = {
  args: { value: 'supervisor', previousValue: 'administrador' },
};

export const ValorTextoLargo = {
  args: {
    value: 'Este es un valor de texto nuevo muy largo que supera el límite de caracteres por defecto y debe mostrar la opción de ver más para expandir el contenido completo.',
    previousValue: 'Valor anterior corto',
  },
};

export const ValorNumerico = {
  args: { value: 2000, previousValue: 1500 },
};

export const ValorJSONSinCambios = {
  args: {
    value: { status: 'active', role: 'editor', region: 'Zona Norte' },
  },
};

export const ValorJSONConCambios = {
  args: {
    value: { status: 'inactive', role: 'supervisor', region: 'Zona Norte' },
    previousValue: { status: 'active', role: 'editor', region: 'Zona Norte' },
  },
};

export const ValorJSONExpandible = {
  args: {
    value: {
      status: 'active',
      role: 'supervisor',
      region: 'Zona Sur',
      plant: 'PLT-012',
      permissions: 'read-write',
      lastLogin: '2026-04-18',
    },
    previousValue: {
      status: 'inactive',
      role: 'viewer',
      region: 'Zona Norte',
      plant: 'PLT-007',
      permissions: 'read',
      lastLogin: '2026-04-10',
    },
  },
};

export const ValorVacio = {
  args: { value: null },
};

export const ComparacionAnteriorNuevo = {
  render: () => {
    const filas = [
      {
        campo: 'status',
        anterior: { status: 'active', role: 'editor' },
        nuevo: { status: 'inactive', role: 'supervisor' },
      },
      {
        campo: 'nombre',
        anterior: 'Administrador Principal',
        nuevo: 'Supervisor Regional',
      },
      {
        campo: 'capacidad',
        anterior: 1500,
        nuevo: 2000,
      },
      {
        campo: 'region',
        anterior: null,
        nuevo: 'Zona Norte',
      },
    ];

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: '620px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['CAMPO', 'VALOR ANTERIOR', 'VALOR NUEVO'].map(h => (
                <th key={h} style={{
                  padding: '8px 12px',
                  textAlign: 'left',
                  color: '#6b7280',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={f.campo} style={{ borderBottom: '0.5px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#374151', fontWeight: 600 }}>
                  {f.campo}
                </td>
                <td style={{ padding: '10px 12px', maxWidth: 220 }}>
                  <PreviousValueCell value={f.anterior} />
                </td>
                <td style={{ padding: '10px 12px', maxWidth: 220 }}>
                  <NewValueCell value={f.nuevo} previousValue={f.anterior} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
