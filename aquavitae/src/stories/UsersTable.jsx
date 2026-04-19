import React from 'react';
import './UsersTable.css';
import StatusBadge from './StatusBadge';

export default function UsersTable({
  users = [
    {
      id: 1,
      name: 'Carlos Olivarez',
      email: 'carlos@empresa.com',
      role: 'Administrador',
      status: 'activo',
    },
    {
      id: 2,
      name: 'Fernanda ',
      email: 'fernanda@empresa.com',
      role: 'Usuario',
      status: 'inactivo',
    },
  ],
  onEdit,
  onDelete,
}) {
  return (
    <div className="users-table">
      <div className="users-table__header users-table__grid">
        <span>Nombre</span>
        <span>Email</span>
        <span>Rol</span>
        <span>Estado</span>
        <span>Acciones</span>
      </div>

      <div className="users-table__body">
        {users.map((user) => (
          <div key={user.id} className="users-table__row users-table__grid">
            <span className="users-table__name">{user.name}</span>
            <span className="users-table__text">{user.email}</span>
            <span className="users-table__text">{user.role}</span>
            <span><StatusBadge status={user.status} /></span>

            <div className="users-table__actions">
              <button
                type="button"
                className="users-table__icon-button"
                onClick={() => onEdit?.(user)}
                aria-label={`Editar a ${user.name}`}
              >
                ✏️
              </button>

              <button
                type="button"
                className="users-table__icon-button"
                onClick={() => onDelete?.(user)}
                aria-label={`Eliminar a ${user.name}`}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}