import React from 'react';
import AuditMetaCell from './AuditMetaCell';

export default {
  title: 'Auditoria/AuditMetaCell',
  component: AuditMetaCell,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const ConAvatar = {
  args: {
    user: 'ana.garcia',
    timestamp: '2026-04-18 09:12:33',
    showAvatar: true,
  },
};

export const SinAvatar = {
  args: {
    user: 'carlos.mv',
    timestamp: '2026-04-18 08:45:10',
    showAvatar: false,
  },
};

export const ConFechaRelativa = {
  args: {
    user: 'laura.p',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString().replace('T', ' ').slice(0, 19),
    showAvatar: true,
    showRelative: true,
  },
};

export const ConIP = {
  args: {
    user: 'sys.auto',
    timestamp: '2026-04-17 17:30:00',
    showAvatar: true,
    showIP: true,
    ip: '192.168.1.45',
  },
};

export const TodosLosDatos = {
  args: {
    user: 'admin.root',
    timestamp: '2026-04-17 14:20:55',
    showAvatar: true,
    showRelative: true,
    showIP: true,
    ip: '10.0.0.1',
  },
};

export const SinFecha = {
  args: {
    user: 'ana.garcia',
    timestamp: '',
    showAvatar: true,
  },
};

export const EnTablaCompleta = {
  render: () => {
    const filas = [
      { id: 1, user: 'ana.garcia',  timestamp: '2026-04-18 09:12:33', accion: 'UPDATE', campos: 'status / role',     ip: '192.168.1.12' },
      { id: 2, user: 'carlos.mv',   timestamp: '2026-04-18 08:45:10', accion: 'UPDATE', campos: 'email',             ip: '192.168.1.20' },
      { id: 3, user: 'sys.auto',    timestamp: '2026-04-17 17:30:00', accion: 'CREATE', campos: '—',                 ip: '10.0.0.1'     },
      { id: 4, user: 'laura.p',     timestamp: '2026-04-17 14:20:55', accion: 'UPDATE', campos: 'mfa_required',      ip: '192.168.1.34' },
      { id: 5, user: 'admin.root',  timestamp: '2026-04-16 10:05:00', accion: 'DELETE', campos: 'region / password', ip: '10.0.0.1'     },
    ];

    const accionColor = { UPDATE: '#58a6ff', CREATE: '#3fb950', DELETE: '#ff7b72' };

    const sorted = [...filas].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: '680px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d' }}>
              {['USUARIO / FECHA', 'ACCIÓN', 'CAMPOS', 'IP'].map(h => (
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
            {sorted.map((f, i) => (
              <tr key={f.id} style={{ borderBottom: '0.5px solid #e5e7eb', background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                <td style={{ padding: '10px 12px' }}>
                  <AuditMetaCell user={f.user} timestamp={f.timestamp} showAvatar showRelative />
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ color: accionColor[f.accion] || '#8b949e', fontWeight: 600 }}>{f.accion}</span>
                </td>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#374151', fontSize: 11 }}>{f.campos}</td>
                <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#9ca3af', fontSize: 11 }}>{f.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>Ordenado por fecha/hora más reciente</p>
      </div>
    );
  },
};
