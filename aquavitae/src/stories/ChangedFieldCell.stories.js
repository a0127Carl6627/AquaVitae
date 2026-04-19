import React from 'react';
import ChangedFieldCell from './ChangedFieldCell';

export default {
  title: 'Auditoria/ChangedFieldCell',
  component: ChangedFieldCell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const CampoSimple = {
  args: { fields: 'status' },
};

export const CampoEmail = {
  args: { fields: 'email' },
};

export const CampoRole = {
  args: { fields: 'role' },
};

export const MultiplesCampos = {
  args: { fields: ['status', 'role', 'email'] },
};

export const MultiplesCamposCompleto = {
  args: { fields: ['status', 'role', 'email', 'mfa_required', 'region'] },
};

export const CampoDesconocido = {
  args: { fields: 'capacidad_maxima' },
};

export const SinCampos = {
  args: { fields: [] },
};

export const EnColumnaDeTabla = {
  render: () => {
    const filas = [
      {
        id: 1,
        timestamp: '2026-04-18 09:12:33',
        usuario: 'ana.garcia',
        accion: 'UPDATE',
        campos: ['status', 'role'],
        anterior: 'active / editor',
        nuevo: 'inactive / supervisor',
      },
      {
        id: 2,
        timestamp: '2026-04-18 08:45:10',
        usuario: 'carlos.mv',
        accion: 'UPDATE',
        campos: 'email',
        anterior: 'carlos@old.com',
        nuevo: 'carlos@new.com',
      },
      {
        id: 3,
        timestamp: '2026-04-17 17:30:00',
        usuario: 'sys.auto',
        accion: 'CREATE',
        campos: [],
        anterior: null,
        nuevo: '—',
      },
      {
        id: 4,
        timestamp: '2026-04-17 14:20:55',
        usuario: 'laura.p',
        accion: 'UPDATE',
        campos: ['mfa_required', 'password', 'region'],
        anterior: 'false / *** / Zona Norte',
        nuevo: 'true / *** / Zona Sur',
      },
    ];

    const accionColor = { UPDATE: '#58a6ff', CREATE: '#3fb950', DELETE: '#ff7b72' };

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: '760px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['TIMESTAMP', 'USUARIO', 'ACCIÓN', 'CAMPO MODIFICADO', 'VALOR ANTERIOR', 'VALOR NUEVO'].map(h => (
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
                  <span style={{ color: accionColor[f.accion] || '#8b949e', fontWeight: 600 }}>{f.accion}</span>
                </td>
                <td style={{ padding: '10px' }}>
                  <ChangedFieldCell fields={f.campos} />
                </td>
                <td style={{ padding: '10px', color: '#6b7280', fontSize: 11 }}>{f.anterior ?? '—'}</td>
                <td style={{ padding: '10px', color: '#15803d', fontSize: 11, fontWeight: f.nuevo !== '—' ? 600 : 400 }}>{f.nuevo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};
