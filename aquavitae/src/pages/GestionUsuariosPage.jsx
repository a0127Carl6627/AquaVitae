import React, { useState, useEffect } from 'react';
import { useResumenUsuarios, useUsuarios, useRoles, usePlantas, useCrearUsuario, useEditarUsuario, useEliminarUsuario } from '../hooks/useAquavitaeQueries';
import StatsGrid from '../components/Admin/stories/StatsGrid';
import UsersTable from '../components/Admin/stories/UsersTable';
import RolesHighlight from '../components/Admin/stories/RolesHighlight';
import PermissionsMatrix from '../components/Admin/stories/PermissionsMatrix';
import DataAccessPolicy from '../components/Admin/stories/DataAccessPolicy';
import ModalDeleteUser from '../components/Admin/stories/ModalDeleteUser';
import EditUserModal from '../stories/EditUserModal';
import NewUserModal from '../stories/NewUserModal';

export default function GestionUsuariosPage() {
  const [userToDelete, setUserToDelete] = useState(null);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const { data: resumen, isLoading: loadingResumen, error: resumenError } = useResumenUsuarios();
  const { data: usuariosData, isLoading: loadingUsuarios, refetch: refetchUsuarios } = useUsuarios(page, size);
  const { data: roles, isLoading: loadingRoles } = useRoles();
  const { data: plantas } = usePlantas();

  const [matrizPermisos, setMatrizPermisos] = useState({ modules: [], roles: [], permissions: {} });
  const [politicasAcceso, setPoliticasAcceso] = useState([]);

  useEffect(() => {
    if (!roles) return;
    const politicaPorRol = { Administrador: 'Todas las regiones y plantas', Director: 'Todas las regiones y plantas', 'Gerente de Planta': 'Solo su planta asignada', Analista: 'Solo su región asignada', Operador: 'Solo su planta asignada' };
    setPoliticasAcceso(roles.map(rol => ({ rol: rol.nombre, acceso: politicaPorRol[rol.nombre] || 'No definido' })));
  }, [roles]);

  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const modules = ['Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos', 'Alertas', 'Simulaciones', 'Reportes', 'Configuración'];
    const permsMap = {
      Director:          { Resumen: true,  Plantas: true,  'Fuentes de agua': true,  Riesgos: true,  Alertas: true,  Simulaciones: true,  Reportes: true,  Configuración: true  },
      'Gerente de Planta': { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,  Configuración: true  },
      Analista:          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true,  Configuración: false },
      Operador:          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: false, Configuración: false },
    };
    setMatrizPermisos({ modules, roles: roles.map(r => r.nombre).filter(r => r !== 'Administrador'), permissions: permsMap });
  }, [roles]);

  const stats = resumen ? [
    { title: 'Usuarios activos', value: resumen.usuariosActivos, subtitle: `De ${resumen.totalUsuarios} registrados`, icon: 'users' },
    { title: 'Roles definidos', value: resumen.rolesDefinidos, subtitle: 'Perfiles configurados', icon: 'roles' },
    { title: 'Permisos asignados', value: resumen.permisosAsignados, subtitle: 'A módulos y datos', icon: 'permissions' },
    { title: 'Actividad reciente', value: resumen.actividadReciente, subtitle: 'Cambios en últimos 7 días', icon: 'activity' },
  ] : [];

  const usuarios = {
    items: usuariosData?.items || [],
    total: usuariosData?.total || 0,
    page: usuariosData?.page || 0,
    size: usuariosData?.size || size,
    totalPages: usuariosData?.totalPages || 1,
  };

  const rolesDestacados = (roles || []).map(r => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion || 'Sin descripción', cantidadPermisos: r.cantidadPermisos || 0 }));

  const crearMutation = useCrearUsuario();
  const editarMutation = useEditarUsuario();
  const eliminarMutation = useEliminarUsuario();

  const handlePageChange = (newPage) => { setPage(newPage); refetchUsuarios(); };
  const handleDeleteClick = (user) => setUserToDelete(user);
  const confirmDelete = async (user) => { await eliminarMutation.mutateAsync(user.id); setUserToDelete(null); };
  const handleAddUser = () => setMostrarAgregar(true);
  const handleSaveNew = () => { refetchUsuarios(); setMostrarAgregar(false); };
  const handleEditUser = (user) => setUsuarioEditar(user);
  const handleSaveEdit = () => { refetchUsuarios(); setUsuarioEditar(null); };

  const loading = loadingResumen || loadingUsuarios || loadingRoles;
  const error = resumenError;

  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading && usuarios.items.length === 0) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando datos...</div>;
  if (error) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e23b3b' }}>Error: {error.message}</div>;

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0' }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>Administrador · <strong>Gestión de usuarios y roles</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span>{dateStr} · {timeStr}</span><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)', display: 'grid', placeItems: 'center', color: '#fff' }}>AD</div></div>
      </div>
      <div style={{ padding: '24px 28px 40px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 24 }}><h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#1a2332' }}>Usuarios y roles</h1><p style={{ fontSize: 14, color: '#5a6577', margin: 0 }}>Gestiona usuarios, roles y permisos de acceso a módulos y datos.</p></div>
        <StatsGrid stats={stats} />
        <UsersTable usuarios={usuarios} onPageChange={handlePageChange} onEdit={handleEditUser} onDelete={handleDeleteClick} onAgregar={handleAddUser} loading={loadingUsuarios} />
        <RolesHighlight roles={rolesDestacados} />
        <PermissionsMatrix modules={matrizPermisos.modules} roles={matrizPermisos.roles} permissions={matrizPermisos.permissions} />
        <DataAccessPolicy politicas={politicasAcceso} />
      </div>
      {userToDelete && <ModalDeleteUser user={userToDelete} onConfirm={confirmDelete} onCancel={() => setUserToDelete(null)} />}
      {usuarioEditar && <EditUserModal isOpen={!!usuarioEditar} usuario={usuarioEditar} roles={rolesDestacados} plantas={plantas || []} onClose={() => setUsuarioEditar(null)} onSave={handleSaveEdit} />}
      {mostrarAgregar && <NewUserModal isOpen={mostrarAgregar} roles={rolesDestacados} plantas={plantas || []} idEmpresa={1} onClose={() => setMostrarAgregar(false)} onSave={handleSaveNew} />}
    </div>
  );
}