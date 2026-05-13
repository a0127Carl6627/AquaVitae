import React from 'react';
import RowActionButton from './RowActionButton';

export default {
  title: 'HU10/RowActionButton',
  component: RowActionButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconGear = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const rowData = { id: 'PLT-007', region: 'Zona Norte (Monterrey)', severidad: 88 };

export const VerDetalle = {
  args: {
    label: 'VER DETALLE',
    variant: 'secondary',
    rowData,
    onClick: (data) => alert(`Ver detalle: ${data.region}`),
  },
};

export const ReubicarProduccion = {
  args: {
    label: 'REUBICAR PRODUCCIÓN',
    variant: 'primary',
    rowData,
    onClick: (data) => alert(`Reubicar producción: ${data.region}`),
  },
};

export const ConIconoFlecha = {
  args: {
    label: 'VER DETALLE',
    variant: 'secondary',
    icon: React.createElement(IconArrow),
    rowData,
    onClick: (data) => alert(`Acción: ${data.region}`),
  },
};

export const ConIconoEngrane = {
  args: {
    label: 'GESTIONAR',
    variant: 'primary',
    icon: React.createElement(IconGear),
    rowData,
    onClick: (data) => alert(`Gestionar: ${data.region}`),
  },
};

export const Deshabilitado = {
  args: {
    label: 'VER DETALLE',
    variant: 'secondary',
    disabled: true,
    rowData,
  },
};

export const EnFilaDeTabla = {
  render: () => {
    const filas = [
      { id: 'PLT-007', region: 'Zona Norte (Monterrey)', severidad: 88, accion: 'Reubicar producción', variante: 'primary' },
      { id: 'PLT-009', region: 'Zona Bajo (Guadalajara)', severidad: 45, accion: 'Ver detalle', variante: 'secondary' },
      { id: 'PLT-008', region: 'Zona Centro (Toluca)', severidad: 12, accion: 'Ver detalle', variante: 'secondary' },
    ];
    return (
      <table style={{ borderCollapse: 'collapse', fontFamily: 'sans-serif', fontSize: '13px', minWidth: '600px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            {['REGIÓN', 'SEVERIDAD (%)', 'ACCIÓN RECOMENDADA', 'GESTIÓN'].map(h => (
              <th key={h} style={{ padding: '8px 16px', textAlign: 'left', color: '#6b7280', fontWeight: '600', fontSize: '11px', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ fontWeight: '600', color: '#111827' }}>{fila.region}</div>
                <div style={{ color: '#9ca3af', fontSize: '11px' }}>ID {fila.id}</div>
              </td>
              <td style={{ padding: '12px 16px', color: '#374151', fontWeight: '600' }}>{fila.severidad}%</td>
              <td style={{ padding: '12px 16px', color: '#374151' }}>{fila.accion}</td>
              <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                <RowActionButton
                  label={fila.variante === 'primary' ? 'REUBICAR PRODUCCIÓN' : 'VER DETALLE'}
                  variant={fila.variante}
                  rowData={fila}
                  onClick={(data) => alert(`Acción sobre: ${data.region}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};
