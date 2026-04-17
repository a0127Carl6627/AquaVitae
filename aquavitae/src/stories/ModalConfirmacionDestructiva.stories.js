import { useState } from 'react';
import ModalConfirmacionDestructiva from './ModalConfirmacionDestructiva';

export default {
  title: 'HU05/ModalConfirmacionDestructiva',
  component: ModalConfirmacionDestructiva,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
    cancelLabel: { control: 'text' },
    confirmLabel: { control: 'text' },
    isLoading: { control: 'boolean' },
    onCancel: { action: 'cancelado' },
    onConfirm: { action: 'confirmado' },
  },
};

export const EliminarUsuario = {
  args: {
    isOpen: true,
    title: '¿Eliminar usuario definitivamente?',
    description: 'Estás a punto de eliminar a Ana García. Esta acción es irreversible y el usuario perderá el acceso a todos los módulos de forma inmediata.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Eliminar Usuario',
    onCancel: () => alert('Eliminación cancelada'),
    onConfirm: () => alert('Usuario eliminado'),
    isLoading: false,
  },
};

export const ArchivarAlerta = {
  args: {
    isOpen: true,
    title: '¿Archivar alerta?',
    description: 'Esta acción archivará la alerta de forma permanente. No podrás recuperarla después.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Archivar Alerta',
    onCancel: () => alert('Archivación cancelada'),
    onConfirm: () => alert('Alerta archivada'),
    isLoading: false,
  },
};

export const CerrarSesion = {
  args: {
    isOpen: true,
    title: '¿Cerrar sesión?',
    description: 'Se cerrará tu sesión en todos los dispositivos. Necesitarás iniciar sesión de nuevo.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Cerrar Sesión',
    onCancel: () => alert('Sesión no cerrada'),
    onConfirm: () => alert('Sesión cerrada'),
    isLoading: false,
  },
};

export const ConDescarga = {
  args: {
    isOpen: true,
    title: '¿Eliminar archivo?',
    description: 'Se eliminará el archivo descargado "reporte_aguas_2026.pdf". Esta acción no se puede deshacer.',
    cancelLabel: 'Mantener Archivo',
    confirmLabel: 'Eliminar Archivo',
    onCancel: () => alert('Archivo mantenido'),
    onConfirm: () => alert('Archivo eliminado'),
    isLoading: false,
  },
};

export const CargandoConfirmacion = {
  args: {
    isOpen: true,
    title: '¿Eliminar usuario definitivamente?',
    description: 'Estás a punto de eliminar a Ana García. Esta acción es irreversible y el usuario perderá el acceso a todos los módulos de forma inmediata.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Eliminar Usuario',
    onCancel: () => alert('Cancelado'),
    onConfirm: () => alert('Eliminando...'),
    isLoading: true,
  },
};

export const Cerrado = {
  args: {
    isOpen: false,
    title: '¿Eliminar usuario definitivamente?',
    description: 'Estás a punto de eliminar a Ana García.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Eliminar Usuario',
  },
};

// Componente wrapper para demostrar interactividad
function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          backgroundColor: '#001f3f',
          color: '#ffffff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        Abrir Modal
      </button>

      <ModalConfirmacionDestructiva
        isOpen={isOpen}
        title="¿Eliminar usuario definitivamente?"
        description="Estás a punto de eliminar a Ana García. Esta acción es irreversible y el usuario perderá el acceso a todos los módulos de forma inmediata."
        cancelLabel="Cancelar"
        confirmLabel="Eliminar Usuario"
        onCancel={() => setIsOpen(false)}
        onConfirm={() => {
          alert('Usuario eliminado');
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export const Interactivo = {
  render: () => <ModalDemo />,
};
