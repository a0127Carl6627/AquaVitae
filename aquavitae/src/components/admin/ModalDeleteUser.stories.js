// Stories/ModalDeleteUser.stories.jsx
import React, { useState } from 'react';
import ModalDeleteUser from './ModalDeleteUser';

export default {
  title: 'UsuarioYRoles/ModalDeleteUser',
  component: ModalDeleteUser,
  argTypes: {
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'cancelled' },
  },
};

const mockUser = {
  id: 2,
  nombreCompleto: 'Juan Morales',
  correo: 'juan.morales@aquavitae.com',
  nombreRol: 'Director',
  regionPlanta: 'Todas las regiones',
  activo: true,
};

const Template = (args) => {
  const [open, setOpen] = useState(false);
  const handleConfirm = (user) => {
    args.onConfirm(user);
    setOpen(false);
  };
  const handleCancel = () => {
    args.onCancel();
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '8px 16px',
          background: '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Abrir modal de ejemplo
      </button>
      {open && <ModalDeleteUser user={mockUser} onConfirm={handleConfirm} onCancel={handleCancel} />}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const DirectOpen = () => (
  <ModalDeleteUser
    user={mockUser}
    onConfirm={(user) => console.log('Confirmado eliminar', user)}
    onCancel={() => console.log('Cancelado')}
  />
);
DirectOpen.parameters = { layout: 'fullscreen' };