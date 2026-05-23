// Components/ModalDeleteUser.jsx
import React from 'react';

const styles = {
  overlay: {
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
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    width: '100%',
    maxWidth: 480,
    boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  },
  header: {
    padding: '24px 28px 16px 28px',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#1f2937',
    margin: 0,
  },
  warningText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 1.5,
  },
  userCard: {
    margin: '0 28px 24px 28px',
    padding: '18px 20px',
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    border: '1px solid #f0f2f5',
  },
  userName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  userDetails: {
    fontSize: 12,
    color: '#4b5563',
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
    padding: '16px 28px 28px 28px',
    borderTop: '1px solid #edf2f7',
    backgroundColor: '#ffffff',
  },
  cancelBtn: {
    padding: '8px 18px',
    borderRadius: 40,
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    fontSize: 13,
    fontWeight: 500,
    color: '#4b5563',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  deleteBtn: {
    padding: '8px 18px',
    borderRadius: 40,
    border: 'none',
    backgroundColor: '#ef4444',
    fontSize: 13,
    fontWeight: 500,
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
};

export default function ModalDeleteUser({ user, onConfirm, onCancel }) {
  if (!user) return null;

  const { nombreCompleto, correo, nombreRol, regionPlanta } = user;

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>¿Eliminar usuario?</h2>
          <p style={styles.warningText}>
            Esta acción no se puede deshacer.
            <br />
            El usuario y su acceso a la plataforma serán eliminados permanentemente.
          </p>
        </div>

        <div style={styles.userCard}>
          <div style={styles.userName}>{nombreCompleto || 'Usuario'}</div>
          <div style={styles.userEmail}>{correo || '—'}</div>
          <div style={styles.userDetails}>
            <span>
              <strong>Rol:</strong> {nombreRol || '—'}
            </span>
            <span>
              <strong>Región:</strong> {regionPlanta || '—'}
            </span>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.cancelBtn}
            onClick={onCancel}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
          >
            Cancelar
          </button>
          <button
            style={styles.deleteBtn}
            onClick={() => onConfirm(user)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
          >
            Eliminar usuario
          </button>
        </div>
      </div>
    </div>
  );
}