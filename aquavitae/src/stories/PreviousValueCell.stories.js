import React from 'react';
import PreviousValueCell from './PreviousValueCell';

export default {
  title: 'Auditoria/PreviousValueCell',
  component: PreviousValueCell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const ValorTextoCorto = {
  args: { value: 'administrador' },
};

export const ValorTextoLargo = {
  args: {
    value: 'Este es un valor de texto muy largo que supera el límite de caracteres visible por defecto y debe mostrar la opción de ver más para expandir el contenido completo.',
  },
};

export const ValorNumerico = {
  args: { value: 42 },
};

export const ValorJSONSimple = {
  args: {
    value: { status: 'active', role: 'editor', region: 'Zona Norte' },
  },
};

export const ValorJSONExpandible = {
  args: {
    value: {
      status: 'inactive',
      role: 'viewer',
      region: 'Zona Norte',
      plant: 'PLT-007',
      permissions: 'read',
      lastLogin: '2026-04-15',
    },
  },
};

export const ValorVacio = {
  args: { value: null },
};

export const ValorVacioPersonalizado = {
  args: { value: null, emptyLabel: 'Sin valor previo' },
};

export const EnColumnaDeTabla = {
  render: () => {
    const filas = [
      {
        id: 1,
        timestamp: '2026-04-18 09:12:33',
        usuario: 'ana.garcia',
        accion: 'UPDATE',
        campo: 'status',
        valorAnterior: { status: 'active', role: 'editor' },
      },
      {
        id: 2,
        timestamp: '2026-04-18 08:45:10',
        usuario: 'carlos.mv',
        accion: 'UPDATE',
        campo: 'nombre',
        valorAnterior: 'Administrador Principal',
      },
      {
        id: 3,
        timestamp: '2026-04-17 17:30:00',
        usuario: 'sys.auto',
        accion: 'CREATE',
        campo: 'threshold',
        valorAnterior: null,
      },
      {
        id: 4,
        timestamp: '2026-04-17 14:20:55',
        usuario: 'laura.p',
        accion: 'UPDATE',
        campo: 'capacidad',
        valorAnterior: 1500,
      },
    ];

    const accionColor = { UPDATE: '#58a6ff', CREATE: '#3fb950', DELETE: '#ff7b72' };

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: '700px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['TIMESTAMP', 'USUARIO', 'ACCIÓN', 'CAMPO', 'VALOR ANTERIOR'].map(h => (
                <th key={h} style={{
                  padding: '8px 10px',
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
              <tr key={f.id} style={{ borderBottom: '0.5px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                <td style={{ padding: '10px', color: '#6b7280', whiteSpace: 'nowrap' }}>{f.timestamp}</td>
                <td style={{ padding: '10px', color: '#0F172A', fontWeight: 500 }}>{f.usuario}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ color: accionColor[f.accion] || '#c9d1d9', fontWeight: 600 }}>{f.accion}</span>
                </td>
                <td style={{ padding: '10px', fontFamily: 'monospace', color: '#374151' }}>{f.campo}</td>
                <td style={{ padding: '10px', maxWidth: 260 }}>
                  <PreviousValueCell value={f.valorAnterior} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
