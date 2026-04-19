import React, { useState } from 'react';

const STATUS = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v10M8.5 10.5L12 14l3.5-3.5M5 18h14"/>
  </svg>
);

const IconExport = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const IconSpinner = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'btn-spin 0.7s linear infinite' }}>
    <style>{`@keyframes btn-spin { to { transform: rotate(360deg); } }`}</style>
    <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
  </svg>
);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function useActionButton(onAction) {
  const [status, setStatus] = useState(STATUS.idle);

  const trigger = async () => {
    if (status === STATUS.loading) return;
    setStatus(STATUS.loading);
    try {
      await onAction?.();
      setStatus(STATUS.success);
      setTimeout(() => setStatus(STATUS.idle), 2500);
    } catch {
      setStatus(STATUS.error);
      setTimeout(() => setStatus(STATUS.idle), 2500);
    }
  };

  return { status, trigger };
}

function ActionButton({ label, loadingLabel, successLabel, icon, variant = 'secondary', forceStatus, onAction }) {
  const { status: internalStatus, trigger } = useActionButton(onAction);
  const status = forceStatus || internalStatus;

  const isLoading = status === STATUS.loading;
  const isSuccess = status === STATUS.success;

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
    fontFamily: 'sans-serif', cursor: isLoading ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap', border: '1.5px solid', transition: 'background 0.15s, color 0.15s',
  };

  const styles = {
    secondary: {
      idle:    { background: '#fff',    color: '#475569', borderColor: '#cbd5e1' },
      loading: { background: '#f1f5f9', color: '#94a3b8', borderColor: '#e2e8f0' },
      success: { background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' },
      error:   { background: '#fee2e2', color: '#dc2626', borderColor: '#fecaca' },
    },
    primary: {
      idle:    { background: '#1d4ed8', color: '#fff',    borderColor: '#1d4ed8' },
      loading: { background: '#3b82f6', color: '#fff',    borderColor: '#3b82f6' },
      success: { background: '#16a34a', color: '#fff',    borderColor: '#16a34a' },
      error:   { background: '#dc2626', color: '#fff',    borderColor: '#dc2626' },
    },
  };

  const s = styles[variant][status] || styles[variant].idle;

  return (
    <button onClick={trigger} disabled={isLoading} style={{ ...base, ...s }}>
      {isLoading ? <IconSpinner /> : isSuccess ? <IconCheck /> : icon}
      {isLoading ? loadingLabel : isSuccess ? successLabel : label}
    </button>
  );
}

export default function CompareActionButtons({
  onDownload,
  onExport,
  forceDownloadStatus = null,
  forceExportStatus = null,
}) {
  return (
    <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center' }}>
      <ActionButton
        label="Descargar datos"
        loadingLabel="Descargando..."
        successLabel="Descargado"
        icon={<IconDownload />}
        variant="secondary"
        forceStatus={forceDownloadStatus}
        onAction={onDownload}
      />
      <ActionButton
        label="Exportar comparación"
        loadingLabel="Exportando..."
        successLabel="Exportado"
        icon={<IconExport />}
        variant="primary"
        forceStatus={forceExportStatus}
        onAction={onExport}
      />
    </div>
  );
}
