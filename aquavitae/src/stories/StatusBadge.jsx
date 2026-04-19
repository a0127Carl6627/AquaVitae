import React from 'react';
import './StatusBadge.css';

export default function StatusBadge({
  status = 'activo',
}) {
  const normalizedStatus = status.toLowerCase();
  const isActive = normalizedStatus === 'activo' || normalizedStatus === 'active';

  return (
    <span className={`status-badge ${isActive ? 'status-badge--active' : 'status-badge--inactive'}`}>
      {isActive ? 'Activo' : 'Inactivo'}
    </span>
  );
}
