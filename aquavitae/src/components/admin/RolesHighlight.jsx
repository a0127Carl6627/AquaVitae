// Components/RolesHighlight.jsx
import React from 'react';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    border: '1px solid #edf2f7',
    marginBottom: 32,
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  },
  title: {
    padding: '18px 24px',
    fontSize: 18,
    fontWeight: 600,
    borderBottom: '1px solid #edf2f7',
    color: '#1a2c3e',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'system-ui, sans-serif',
  },
  th: {
    textAlign: 'left',
    padding: '14px 24px',
    backgroundColor: '#f9fafb',
    fontSize: 13,
    fontWeight: 600,
    color: '#5b6e8c',
    borderBottom: '1px solid #edf2f7',
  },
  td: {
    padding: '16px 24px',
    borderBottom: '1px solid #f0f2f5',
    fontSize: 14,
    color: '#1f2a3e',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 40,
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
    // Mismo ancho para todas las etiquetas
    minWidth: '160px',
    width: '160px',
  },
  badgePerm: {
    backgroundColor: '#eff6ff',
    padding: '4px 10px',
    borderRadius: 40,
    fontSize: 12,
    fontWeight: 500,
    display: 'inline-block',
    color: '#2563eb',
  },
};

// Colores de badge según el rol
const getRoleColor = (rol) => {
  const roleColors = {
    Administrador: { bg: '#fee2e2', text: '#b91c1c' },
    Director: { bg: '#fff3e8', text: '#ea580c' },
    'Gerente de Planta': { bg: '#e0f2fe', text: '#0369a1' },
    Analista: { bg: '#e6f7e6', text: '#2e7d32' },
    Operador: { bg: '#f3e8ff', text: '#6b21a5' },
  };
  return roleColors[rol] || { bg: '#f1f5f9', text: '#334155' };
};

export default function RolesHighlight({ roles }) {
  // Filtramos para excluir al rol "Administrador" (como se pide en la imagen)
  const filteredRoles = roles.filter(rol => rol.nombre !== 'Administrador');

  return (
    <div style={styles.container}>
      <div style={styles.title}>Roles y permisos destacados</div>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Rol</th><th style={styles.th}>Descripción</th><th style={styles.th}>Permisos</th></tr>
        </thead>
        <tbody>
          {filteredRoles.map((rol) => {
            const roleColor = getRoleColor(rol.nombre);
            return (
              <tr key={rol.id}>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      backgroundColor: roleColor.bg,
                      color: roleColor.text,
                    }}
                  >
                    {rol.nombre}
                  </span>
                </td>
                <td style={styles.td}>{rol.descripcion}</td>
                <td style={styles.td}>
                  <span style={styles.badgePerm}>{rol.cantidadPermisos} permisos</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}