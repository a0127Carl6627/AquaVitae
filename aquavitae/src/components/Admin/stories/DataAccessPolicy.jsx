// Components/DataAccessPolicy.jsx
import React from 'react';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    border: '1px solid #edf2f7',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
  },
  title: {
    padding: '18px 24px 8px 24px',
    fontSize: 18,
    fontWeight: 600,
    color: '#1a2c3e',
  },
  description: {
    padding: '0 24px 18px 24px',
    fontSize: 14,
    color: '#5b6e8c',
    borderBottom: '1px solid #edf2f7',
    margin: 0,
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
    minWidth: '160px',
    width: '160px',
  },
};

// Colores de badge según el rol (mismos que en UsersTable y RolesHighlight)
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

export default function DataAccessPolicy({ politicas }) {
  return (
    <div style={styles.container}>
      <div style={styles.title}>Política de acceso a datos</div>
      <div style={styles.description}>
        Define qué datos puede ver cada rol según región o planta.
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Rol</th>
            <th style={styles.th}>Acceso a datos</th>
          </tr>
        </thead>
        <tbody>
          {politicas.map((item, idx) => {
            const roleColor = getRoleColor(item.rol);
            return (
              <tr key={idx}>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      backgroundColor: roleColor.bg,
                      color: roleColor.text,
                    }}
                  >
                    {item.rol}
                  </span>
                </td>
                <td style={styles.td}>{item.acceso}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}