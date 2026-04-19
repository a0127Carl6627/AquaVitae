import React from 'react';
import ExportPDFButton from './ExportPDFButton';

export default {
  title: 'HU10/ExportPDFButton',
  component: ExportPDFButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const dataMock = {
  kpis: [
    { label: 'Severidad promedio', value: '72.4%' },
    { label: 'Plantas en riesgo crítico', value: '2 de 8' },
    { label: 'Región más afectada', value: 'Zona Norte (Monterrey)' },
    { label: 'Horizonte de proyección', value: '90 días' },
  ],
  regiones: [
    { nombre: 'Zona Norte (Monterrey)', severidad: 88, accion: 'Reubicar producción' },
    { nombre: 'Zona Bajo (Guadalajara)', severidad: 45, accion: 'Reducción de consumo preventivo' },
    { nombre: 'Zona Centro (Toluca)', severidad: 12, accion: 'Operación estable sin riesgos' },
  ],
};

export const Default = {
  args: {
    label: 'Exportar informe PDF',
    fileNamePrefix: 'reporte_sequia',
    data: dataMock,
    onExport: (result) => console.log('Exportado:', result),
  },
};

export const EstadoCargando = {
  args: {
    label: 'Exportar informe PDF',
    forceStatus: 'loading',
  },
};

export const EstadoExito = {
  args: {
    label: 'Exportar informe PDF',
    forceStatus: 'success',
  },
};

export const EstadoError = {
  args: {
    label: 'Exportar informe PDF',
    forceStatus: 'error',
  },
};

export const EnContextoDeTabla = {
  render: () => (
    <div style={{ fontFamily: 'sans-serif', minWidth: '560px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#111827' }}>
            Desglose por Región y Acciones Recomendadas
          </p>
        </div>
        <ExportPDFButton
          label="Exportar Informe PDF"
          fileNamePrefix="reporte_sequia"
          data={dataMock}
          onExport={(r) => console.log('PDF:', r)}
        />
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            {['REGIÓN', 'SEVERIDAD (%)', 'ACCIÓN RECOMENDADA'].map(h => (
              <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#6b7280', fontWeight: '600', fontSize: '11px', letterSpacing: '0.05em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataMock.regiones.map((r) => (
            <tr key={r.nombre} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 12px', fontWeight: '600', color: '#111827' }}>{r.nombre}</td>
              <td style={{ padding: '10px 12px', color: '#374151' }}>{r.severidad}%</td>
              <td style={{ padding: '10px 12px', color: '#374151' }}>{r.accion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
