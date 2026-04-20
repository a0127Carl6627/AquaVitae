import React from 'react';
import ApiKeyList from './ApiKeyList';

export default {
  title: 'HU15/ApiKeyList',
  component: ApiKeyList,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const keysMock = [
  {
    id: 'key-1',
    name: 'API Producción',
    status: 'active',
    key: 'aqv_prod_a1b2c3d4e5f6g7h8i9j0',
    lastUsed: '2026-04-18 09:12',
  },
  {
    id: 'key-2',
    name: 'API Staging',
    status: 'inactive',
    key: 'aqv_stg_z9y8x7w6v5u4t3s2r1q0',
    lastUsed: '2026-04-10 14:30',
  },
  {
    id: 'key-3',
    name: 'API Monitoreo',
    status: 'error',
    key: 'aqv_mon_m1n2o3p4q5r6s7t8u9v0',
    lastUsed: '2026-04-17 23:58',
  },
  {
    id: 'key-4',
    name: 'API Reportes',
    status: 'active',
    key: 'aqv_rpt_r0e1p2o3r4t5e6s7x8y9',
    lastUsed: '2026-04-18 08:05',
  },
];

export const ConDatos = {
  args: {
    keys: keysMock,
    onAction: (action, key) => alert(`Acción: ${action} → ${key.name}`),
  },
};

export const SoloActivas = {
  args: {
    keys: keysMock.filter(k => k.status === 'active'),
    onAction: (action, key) => alert(`${action}: ${key.name}`),
  },
};

export const UnaLlave = {
  args: {
    keys: [keysMock[0]],
    onAction: (action, key) => alert(`${action}: ${key.name}`),
  },
};

export const ListaVacia = {
  args: {
    keys: [],
  },
};

export const EnPanelConTitulo = {
  render: () => (
    <div style={{
      fontFamily: 'sans-serif',
      background: '#f8fafc',
      borderRadius: 16,
      padding: 24,
      minWidth: 480,
      maxWidth: 560,
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Llaves de API</h3>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94a3b8' }}>Gestión de accesos externos</p>
        </div>
        <button style={{
          background: '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: 7,
          padding: '7px 14px',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}>
          + Nueva llave
        </button>
      </div>
      <ApiKeyList
        keys={keysMock}
        onAction={(action, key) => alert(`${action}: ${key.name}`)}
      />
    </div>
  ),
};
