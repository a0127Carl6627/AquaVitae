import React from 'react';
import EncryptionStatusIndicator from './EncryptionStatusIndicator';

export default {
  title: 'HU15/EncryptionStatusIndicator',
  component: EncryptionStatusIndicator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Cifrada = {
  args: { isEncrypted: true, showLabel: true, showTooltip: true },
};

export const NoSegura = {
  args: { isEncrypted: false, showLabel: true, showTooltip: true },
};

export const NivelRiesgo = {
  args: { securityLevel: 'warning', showLabel: true, showTooltip: true },
};

export const SoloIcono = {
  args: { isEncrypted: true, showLabel: false, showTooltip: true },
};

export const TooltipPersonalizado = {
  args: {
    isEncrypted: true,
    showTooltip: true,
    customTooltip: 'Cifrado AES-256. Rotación automática cada 90 días.',
  },
};

export const EnListaDeKeys = {
  render: () => {
    const keys = [
      { id: 'key-1', name: 'API Producción',  isEncrypted: true,  level: 'encrypted' },
      { id: 'key-2', name: 'API Staging',     isEncrypted: true,  level: 'warning'   },
      { id: 'key-3', name: 'API Monitoreo',   isEncrypted: false, level: 'insecure'  },
    ];

    return (
      <div style={{ fontFamily: 'sans-serif', minWidth: 440 }}>
        {keys.map((k, i) => (
          <div key={k.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 16px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: i === 0 ? '10px 10px 0 0' : i === keys.length - 1 ? '0 0 10px 10px' : 0,
            borderTopWidth: i === 0 ? 1 : 0,
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>{k.name}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>
                aqv_••••••••••••••••{k.id.slice(-4)}
              </div>
            </div>
            <EncryptionStatusIndicator
              isEncrypted={k.isEncrypted}
              securityLevel={k.level}
              showTooltip
            />
          </div>
        ))}
      </div>
    );
  },
};
