import React, { useState } from 'react';
import ModalConfirmacionDestructiva from './ModalConfirmacionDestructiva';

export default function ButtonEliminar({
  itemName = 'elemento',
  itemDescription = '',
  size = 'medium',
  onConfirm = null,
  isLoading = false,
  title = null,
  confirmLabel = 'Eliminar',
  showLabel = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      if (onConfirm) {
        await onConfirm();
      }
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const sizeStyles = {
    small: {
      padding: '6px 10px',
      fontSize: '12px',
    },
    medium: {
      padding: '8px 12px',
      fontSize: '14px',
    },
    large: {
      padding: '10px 16px',
      fontSize: '14px',
    },
  };

  const style = sizeStyles[size] || sizeStyles.medium;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading || isDeleting}
        style={{
          backgroundColor: '#FEE2E2',
          border: 'none',
          color: '#DC2626',
          cursor: isLoading || isDeleting ? 'not-allowed' : 'pointer',
          borderRadius: '6px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease',
          opacity: isLoading || isDeleting ? 0.7 : 1,
          ...style,
        }}
        onMouseEnter={(e) => {
          if (!isLoading && !isDeleting) {
            e.currentTarget.style.backgroundColor = '#dc2626';
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading && !isDeleting) {
            e.currentTarget.style.backgroundColor = '#ef4444';
          }
        }}
      >
        {/* Icono de papelera */}
        <svg
          width="16"
          height="16"
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
        {showLabel && 'Eliminar'}
      </button>

      <ModalConfirmacionDestructiva
        isOpen={isModalOpen}
        title={title || `¿Eliminar ${itemName} definitivamente?`}
        description={itemDescription}
        cancelLabel="Cancelar"
        confirmLabel={confirmLabel}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        isLoading={isDeleting}
      />
    </>
  );
}
