// Stories/GestionUsuariosPageMock.stories.jsx
import React, { useState } from 'react';
import StatsGrid from '../components/Admin/stories/StatsGrid';
import UsersTable from '../components/Admin/stories/UsersTable';
import RolesHighlight from '../components/Admin/stories/RolesHighlight';
import PermissionsMatrix from '../components/Admin/stories/PermissionsMatrix';
import DataAccessPolicy from '../components/Admin/stories/DataAccessPolicy';
import ModalDeleteUser from '../components/Admin/stories/ModalDeleteUser';

// Datos simulados idénticos a la imagen
const mockStats = [
  { title: 'Usuarios activos', value: '48', subtitle: 'De 60 registrados', icon: 'users' },
  { title: 'Roles definidos', value: '7', subtitle: 'Perfiles configurados', icon: 'roles' },
  { title: 'Permisos asignados', value: '126', subtitle: 'A módulos y datos', icon: 'permissions' },
  { title: 'Actividad reciente', value: '23', subtitle: 'Cambios en últimos 7 días', icon: 'activity' },
];

const mockUsuariosData = {
  items: [
    { id: 1, nombreCompleto: 'Fernanda Ríos', correo: 'fernanda.rios@aquavitae.com', nombreRol: 'Administrador', nombreEmpresa: 'Todas las regiones', activo: true, ultimoAcceso: '20 May 2025, 10:24 a.m.' },
    { id: 2, nombreCompleto: 'Juan Morales', correo: 'juan.morales@aquavitae.com', nombreRol: 'Director', nombreEmpresa: 'Todas las regiones', activo: true, ultimoAcceso: '20 May 2025, 09:15 a.m.' },
    { id: 3, nombreCompleto: 'Laura Pérez', correo: 'laura.perez@aquavitae.com', nombreRol: 'Gerente de Planta', nombreEmpresa: 'Plantas Monterrey', activo: true, ultimoAcceso: '19 May 2025, 04:30 p.m.' },
    { id: 4, nombreCompleto: 'Carlos Ramírez', correo: 'carlos.ramirez@aquavitae.com', nombreRol: 'Analista', nombreEmpresa: 'Región Norte', activo: true, ultimoAcceso: '19 May 2025, 11:20 a.m.' },
    { id: 5, nombreCompleto: 'María Gómez', correo: 'maria.gomez@aquavitae.com', nombreRol: 'Operador', nombreEmpresa: 'Plantas Querétaro', activo: true, ultimoAcceso: '18 May 2025, 08:45 a.m.' },
  ],
  total: 48,
  page: 0,
  size: 5,
  totalPages: 10,
};

const mockRolesDestacados = [
  { id: 1, nombre: 'Administrador', descripcion: 'Acceso total a todos los módulos y datos', cantidadPermisos: 32 },
  { id: 2, nombre: 'Director', descripcion: 'Acceso a reportes, alertas y simulaciones', cantidadPermisos: 24 },
  { id: 3, nombre: 'Gerente de Planta', descripcion: 'Acceso a módulos operativos de su planta', cantidadPermisos: 18 },
  { id: 4, nombre: 'Analista', descripcion: 'Acceso a reportes y análisis de su región', cantidadPermisos: 16 },
  { id: 5, nombre: 'Operador', descripcion: 'Acceso limitado a operación de planta', cantidadPermisos: 8 },
];

const mockModules = [
  'Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos', 'Alertas', 'Simulaciones', 'Reportes', 'Configuración'
];
const mockRolesPerm = ['Administrador', 'Director', 'Gerente de Planta', 'Analista', 'Operador'];
const mockPermissions = {
  Administrador: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Alertas: true, Simulaciones: true, Reportes: true, Configuración: true },
  Director: { Resumen: true, Plantas: true, 'Fuentes de agua': true, Riesgos: true, Alertas: true, Simulaciones: true, Reportes: true, Configuración: false },
  'Gerente de Planta': { Resumen: true, Plantas: true, 'Fuentes de agua': false, Riesgos: true, Alertas: true, Simulaciones: false, Reportes: false, Configuración: false },
  Analista: { Resumen: true, Plantas: true, 'Fuentes de agua': false, Riesgos: true, Alertas: true, Simulaciones: false, Reportes: true, Configuración: false },
  Operador: { Resumen: true, Plantas: true, 'Fuentes de agua': false, Riesgos: true, Alertas: true, Simulaciones: false, Reportes: false, Configuración: false },
};

const mockPoliticas = [
  { rol: 'Administrador', acceso: 'Todas las regiones y plantas' },
  { rol: 'Director', acceso: 'Todas las regiones y plantas' },
  { rol: 'Gerente de Planta', acceso: 'Solo su planta asignada' },
  { rol: 'Analista', acceso: 'Solo su región asignada' },
  { rol: 'Operador', acceso: 'Solo su planta asignada' },
];

const styles = {
  page: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '32px 24px',
    backgroundColor: '#f7f9fc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: { marginBottom: 28 },
  title: { fontSize: 28, fontWeight: 700, color: '#0f2b3d', marginBottom: 8 },
  description: { fontSize: 15, color: '#5b6e8c' },
};

// Componente que simula la página completa con datos mock y modal de eliminación funcional
const GestionUsuariosMock = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [usuarios, setUsuarios] = useState(mockUsuariosData);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const confirmDelete = (user) => {
    // Simular eliminación lógica: remover el usuario de la lista
    const updatedItems = usuarios.items.filter(u => u.id !== user.id);
    setUsuarios({
      ...usuarios,
      items: updatedItems,
      total: usuarios.total - 1,
    });
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setUserToDelete(null);
  };

  // Callbacks vacíos para editar y agregar (solo demostración)
  const handleEdit = (user) => {
    console.log('Editar usuario (mock)', user);
  };

  const handleAdd = () => {
    console.log('Agregar usuario (mock)');
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Usuarios y roles</h1>
        <p style={styles.description}>Gestiona usuarios, roles y permisos de acceso a módulos y datos.</p>
      </div>
      <StatsGrid stats={mockStats} />
      <UsersTable
        usuarios={usuarios}
        onPageChange={() => {}}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onAgregar={handleAdd}
      />
      <RolesHighlight roles={mockRolesDestacados} />
      <PermissionsMatrix modules={mockModules} roles={mockRolesPerm} permissions={mockPermissions} />
      <DataAccessPolicy politicas={mockPoliticas} />

      {/* Modal de eliminación */}
      {userToDelete && (
        <ModalDeleteUser
          user={userToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default {
  title: 'UsuarioYRoles/VistaCompletaMock',
  component: GestionUsuariosMock,
};

export const VistaPrevia = () => <GestionUsuariosMock />;
VistaPrevia.storyName = 'Vista completa con datos mock (incluye modal eliminar)';