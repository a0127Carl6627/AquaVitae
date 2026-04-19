import React from 'react';
import RotateKeyButton from './RotateKeyButton';

export default {
  title: 'HU15/RotateKeyButton',
  component: RotateKeyButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const Default = {
  args: {
    keyId: 'key-1',
    keyName: 'API Producción',
    onRotate: async (id) => { await delay(1500); console.log('Rotada:', id); },
  },
};

export const EstadoCargando = {
  args: {
    keyId: 'key-1',
    keyName: 'API Producción',
    forceStatus: 'loading',
  },
};

export const EstadoExito = {
  args: {
    keyId: 'key-1',
    keyName: 'API Producción',
    forceStatus: 'success',
  },
};

export const EstadoError = {
  args: {
    keyId: 'key-1',
    keyName: 'API Producción',
    forceStatus: 'error',
  },
};

export const EnListaDeKeys = {
  render: () => {
    const keys = [
      { id: 'key-1', name: 'API Producción',  status: 'active'   },
      { id: 'key-2', name: 'API Staging',     status: 'inactive' },
      { id: 'key-3', name: 'API Monitoreo',   status: 'error'    },
    ];

    const statusColor = { active: '#15803d', inactive: '#475569', error: '#dc2626' };
    const statusLabel = { active: 'Activa', inactive: 'Inactiva', error: 'Error' };

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: 460 }}>
        {keys.map((k, i) => (
          <div key={k.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: i === 0 ? '10px 10px 0 0' : i === keys.length - 1 ? '0 0 10px 10px' : 0,
            borderTopWidth: i === 0 ? 1 : 0,
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{k.name}</div>
              <div style={{ fontSize: 11, color: statusColor[k.status], marginTop: 2 }}>
                ● {statusLabel[k.status]}
              </div>
            </div>
            <RotateKeyButton
              keyId={k.id}
              keyName={k.name}
              onRotate={async (id) => { await new Promise(r => setTimeout(r, 1500)); alert(`Llave rotada: ${id}`); }}
            />
          </div>
        ))}
      </div>
    );
  },
};
