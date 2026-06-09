import React, { useState, useEffect } from 'react';
import { useResumenUsuarios, useUsuarios, useRoles, usePlantas, useCrearUsuario, useEditarUsuario, useEliminarUsuario } from '../hooks/useAquavitaeQueries';
import StatsGrid from '../components/admin/StatsGrid';
import UsersTable from '../components/admin/UsersTable';
import PermissionsMatrix from '../components/admin/PermissionsMatrix';
import ModalDeleteUser from '../components/admin/ModalDeleteUser';
import EditUserModal from '../components/admin/EditUserModal';
import NewUserModal from '../components/admin/NewUserModal';

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



  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const modules = ['Resumen', 'Plantas', 'Fuentes de agua', 'Riesgos', 'Alertas', 'Simulaciones', 'Reportes'];
    const permsMap = {
      Director:          { Resumen: true,  Plantas: true,  'Fuentes de agua': true,  Riesgos: true,  Alertas: true,  Simulaciones: true,  Reportes: true  },
      'Gerente de Planta': { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true  },
      Analista:          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: true,  Alertas: true,  Simulaciones: false, Reportes: true  },
      Operador:          { Resumen: true,  Plantas: true,  'Fuentes de agua': false, Riesgos: false, Alertas: false, Simulaciones: false, Reportes: false },
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

  const rolesDestacados = (roles || []).map(r => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion || 'Sin descripción', cantidadPermisos: r.cantidadPermisos || 0, permisos: r.permisos || [] }));

  const crearMutation = useCrearUsuario();
  const editarMutation = useEditarUsuario();
  const eliminarMutation = useEliminarUsuario();

  const handlePageChange = (newPage) => { setPage(newPage); };
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

  if (loading && usuarios.items.length === 0) return <div className="flex flex-1 items-center justify-center">Cargando datos...</div>;
  if (error) return <div className="flex flex-1 items-center justify-center text-[#e23b3b]">Error: {error.message}</div>;

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-end border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="flex items-center gap-3.5"><span>{dateStr} · {timeStr}</span><div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">AD</div></div>
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-7 pb-10 pt-6">
        <div className="mb-6"><h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Usuarios y roles</h1><p className="m-0 text-[13px] text-[#5a6577]">Gestiona usuarios, roles y permisos de acceso a módulos y datos.</p></div>
        <StatsGrid stats={stats} />
        <UsersTable usuarios={usuarios} onPageChange={handlePageChange} onEdit={handleEditUser} onDelete={handleDeleteClick} onAgregar={handleAddUser} loading={loadingUsuarios} />
        <PermissionsMatrix modules={matrizPermisos.modules} roles={matrizPermisos.roles} permissions={matrizPermisos.permissions} />
        
      </div>
      {userToDelete && <ModalDeleteUser user={userToDelete} onConfirm={confirmDelete} onCancel={() => setUserToDelete(null)} />}
      {usuarioEditar && <EditUserModal isOpen={!!usuarioEditar} usuario={usuarioEditar} roles={rolesDestacados} plantas={plantas || []} onClose={() => setUsuarioEditar(null)} onSave={handleSaveEdit} />}
      {mostrarAgregar && <NewUserModal isOpen={mostrarAgregar} roles={rolesDestacados} plantas={plantas || []} idEmpresa={1} onClose={() => setMostrarAgregar(false)} onSave={handleSaveNew} />}
    </div>
  );
}