import React from 'react';
import CompareActionButtons from './CompareActionButtons';

export default {
  title: 'HU18/CompareActionButtons',
  component: CompareActionButtons,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const Default = {
  args: {
    onDownload: async () => { await delay(1500); },
    onExport:   async () => { await delay(2000); },
  },
};

export const DescargandoDatos = {
  args: { forceDownloadStatus: 'loading' },
};

export const ExportandoComparacion = {
  args: { forceExportStatus: 'loading' },
};

export const AmbosExito = {
  args: { forceDownloadStatus: 'success', forceExportStatus: 'success' },
};

export const EnCabeceraComparador = {
  render: () => (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'sans-serif', background: '#f0f7ff', borderRadius: 14,
      padding: '20px 28px', minWidth: 560,
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Comparador de Ubicaciones</h2>
        <p style={{ margin: '3px 0 0', fontSize: 12, color: '#64748b' }}>Selecciona 2-4 ubicaciones para comparar</p>
      </div>
      <CompareActionButtons
        onDownload={async () => { await new Promise(r => setTimeout(r, 1500)); alert('CSV descargado'); }}
        onExport={async ()   => { await new Promise(r => setTimeout(r, 2000)); alert('PDF exportado'); }}
      />
    </div>
  ),
};
