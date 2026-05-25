import React, { useState, useEffect } from 'react';
import StatsGrid from '../components/Admin/stories/StatsGrid';
import UsersTable from '../components/Admin/stories/UsersTable';
import RolesHighlight from '../components/Admin/stories/RolesHighlight';
import PermissionsMatrix from '../components/Admin/stories/PermissionsMatrix';
import DataAccessPolicy from '../components/Admin/stories/DataAccessPolicy';
import ModalDeleteUser from '../components/Admin/stories/ModalDeleteUser';
import EditUserModal from '../stories/EditUserModal';
import { api } from '../services/aquavitaeApi';

export default function GestionUsuariosPage() {
  // Estado general
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Datos del dashboard
  const [stats, setStats] = useState([]);
  const [usuarios, setUsuarios] = useState({ items: [], total: 0, page: 0, size: 5, totalPages: 1 });
  const [rolesDestacados, setRolesDestacados] = useState([]);
  const [matrizPermisos, setMatrizPermisos] = useState({ modules: [], roles: [], permissions: {} });
  const [politicasAcceso, setPoliticasAcceso] = useState([]);

  // Modal eliminación
  const [userToDelete, setUserToDelete] = useState(null);

  // Modal edición
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [plantas, setPlantas] = useState([]);

  // Fecha/hora para topbar
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Carga inicial y cuando cambia la página
  const fetchAllData = async (page = 0, size = 5) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Resumen (tarjetas)
      const resumen = await api.getResumen();
      setStats([
        { title: 'Usuarios activos', value: resumen.usuariosActivos, subtitle: `De ${resumen.totalUsuarios} registrados`, icon: 'users' },
        { title: 'Roles definidos', value: resumen.rolesDefinidos, subtitle: 'Perfiles configurados', icon: 'roles' },
        { title: 'Permisos asignados', value: resumen.permisosAsignados, subtitle: 'A módulos y datos', icon: 'permissions' },
        { title: 'Actividad reciente', value: resumen.actividadReciente, subtitle: 'Cambios en últimos 7 días', icon: 'activity' },
      ]);

      // 2. Lista paginada de usuarios (estructura que espera UsersTable)
      const usuariosData = await api.getUsuarios(page, size);
      setUsuarios({
        items: usuariosData.content,
        total: usuariosData.totalElements,
        page: usuariosData.page,
        size: usuariosData.size,
        totalPages: usuariosData.totalPages,
      });

      // 3. Roles destacados (todos los roles, el componente excluirá Administrador)
      const roles = await api.getRoles();
      setRolesDestacados(roles.map(r => ({
        id: r.id,
        nombre: r.nombre,
        descripcion: r.descripcion || 'Sin descripción',
        cantidadPermisos: r.cantidadPermisos || 0,
      })));

      // 4. Matriz de permisos: obtener cada rol con sus permisos
      const rolesConPermisos = await Promise.all(roles.map(rol => api.getRolConPermisos(rol.id)));
      const modulesSet = new Set();
      const permsMap = {};
      rolesConPermisos.forEach(rol => {
        permsMap[rol.nombre] = {};
        Object.entries(rol.permisos || {}).forEach(([modulo, tiene]) => {
          modulesSet.add(modulo);
          permsMap[rol.nombre][modulo] = tiene;
        });
      });
      const modulesArray = Array.from(modulesSet).sort();
      const rolesArray = rolesConPermisos.map(r => r.nombre);
      setMatrizPermisos({
        modules: modulesArray,
        roles: rolesArray,
        permissions: permsMap,
      });

      // 5. Plantas (para modal de edición)
      try {
        const plantasData = await api.getPlantas();
        setPlantas(
          Array.isArray(plantasData)
            ? plantasData.map(p => ({ id: p.idPlanta ?? p.id, nombre: p.nombrePlanta ?? p.nombre }))
            : []
        );
      } catch {
        // No es crítico si falla
        setPlantas([]);
      }

      // 6. Política de acceso a datos (mapeo fijo según nombres de rol)
      const politicaPorRol = {
        Administrador: 'Todas las regiones y plantas',
        Director: 'Todas las regiones y plantas',
        'Gerente de Planta': 'Solo su planta asignada',
        Analista: 'Solo su región asignada',
        Operador: 'Solo su planta asignada',
      };
      const politicas = roles.map(rol => ({
        rol: rol.nombre,
        acceso: politicaPorRol[rol.nombre] || 'No definido',
      }));
      setPoliticasAcceso(politicas);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cambio de página (desde tabla)
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < usuarios.totalPages) {
      fetchAllData(newPage, usuarios.size);
    }
  };

  // Eliminación lógica
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const confirmDelete = async (user) => {
    try {
      await api.eliminarUsuario(user.id);
      // Recargar la página actual después de eliminar
      fetchAllData(usuarios.page, usuarios.size);
      setUserToDelete(null);
    } catch (err) {
      setError(err.message);
      setUserToDelete(null);
    }
  };

  // Crear usuario (pendiente de implementar, puedes abrir un modal)
  const handleAddUser = () => {
    // Aquí puedes abrir un modal de creación de usuario
    console.log('Agregar usuario - por implementar');
  };

  // Editar usuario
  const handleEditUser = (user) => {
    setUsuarioEditar(user);
  };

  const handleSaveEdit = () => {
    fetchAllData(usuarios.page, usuarios.size);
    setUsuarioEditar(null);
  };

  // Formato de fecha para topbar
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading && usuarios.items.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a6577', fontSize: 14 }}>
        Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e23b3b', fontSize: 14 }}>
        Error: {error}. ¿El backend está corriendo?
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>

      {/* Topbar similar al ejemplo */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0', flexShrink: 0,
      }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>
          Administrador · <strong style={{ color: '#1a2332', fontWeight: 600 }}>Gestión de usuarios y roles</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 12, color: '#5a6577' }}>{dateStr} · {timeStr}</span>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)',
            display: 'grid', placeItems: 'center', color: '#fff', fontSize: 12, fontWeight: 600,
          }}>AD</div>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ padding: '24px 28px 40px', maxWidth: 1400, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Encabezado */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-.01em', margin: '0 0 4px', color: '#1a2332' }}>
            Usuarios y roles
          </h1>
          <p style={{ fontSize: 14, color: '#5a6577', margin: 0 }}>
            Gestiona usuarios, roles y permisos de acceso a módulos y datos.
          </p>
        </div>

        {/* Tarjetas de KPIs */}
        <StatsGrid stats={stats} />

        {/* Tabla de usuarios (con paginación, búsqueda local, editar/eliminar) */}
        <UsersTable
          usuarios={usuarios}
          onPageChange={handlePageChange}
          onEdit={handleEditUser}
          onDelete={handleDeleteClick}
          onAgregar={handleAddUser}
          loading={loading}
        />

        {/* Roles destacados */}
        <RolesHighlight roles={rolesDestacados} />

        {/* Matriz de permisos (se excluye Administrador internamente en PermissionsMatrix) */}
        <PermissionsMatrix
          modules={matrizPermisos.modules}
          roles={matrizPermisos.roles}
          permissions={matrizPermisos.permissions}
        />

        {/* Política de acceso a datos */}
        <DataAccessPolicy politicas={politicasAcceso} />

      </div>

      {/* Modal de confirmación de eliminación */}
      {userToDelete && (
        <ModalDeleteUser
          user={userToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}

      {/* Modal de edición de usuario */}
      {usuarioEditar && (
        <EditUserModal
          isOpen={!!usuarioEditar}
          usuario={usuarioEditar}
          roles={rolesDestacados}
          plantas={plantas}
          onClose={() => setUsuarioEditar(null)}
          onSave={handleSaveEdit}
        />
      )}

    </div>
  );
}