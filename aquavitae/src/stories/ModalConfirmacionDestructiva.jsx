import React from 'react';

export default function ModalConfirmacionDestructiva({
  isOpen = false,
  title = '¿Eliminar definitivamente?',
  description = '',
  cancelLabel = 'Cancelar',
  confirmLabel = 'Eliminar',
  onCancel = null,
  onConfirm = null,
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        fontFamily: 'sans-serif',
      }}>
        {/* Icono de advertencia */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>

        {/* Título */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '12px',
          margin: '0 0 12px 0',
        }}>
          {title}
        </h2>

        {/* Descripción */}
        {description && (
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.6',
            marginBottom: '32px',
            margin: '0 0 32px 0',
          }}>
            {description}
          </p>
        )}

        {/* Botones */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: '#f1f5f9',
              border: '1px solid #e2e8f0',
              color: '#0f172a',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }
            }}
          >
            {cancelLabel}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              backgroundColor: '#ef4444',
              border: 'none',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              opacity: isLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#ef4444';
              }
            }}
          >
            {/* Icono de papelera */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
