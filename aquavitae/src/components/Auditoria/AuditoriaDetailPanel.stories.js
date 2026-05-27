import AuditoriaDetailPanel from './AuditoriaDetailPanel';

const meta = {
  title: 'Auditoria/AuditoriaDetailPanel',
  component: AuditoriaDetailPanel,
};

export default meta;

const mockLog = {
  id: 2,
  accion: 'ELIMINAR_USUARIO',
  modulo: 'Gestión Usuarios',
  entidad: 'Usuario #9',
  descripcion: 'Se eliminó un usuario desde administración',
  ip: '192.168.1.25',
  severidad: 'ALTA',
  valorAnterior: JSON.stringify({
    id: 9,
    correo: 'juan@test.com',
    rol: 'ADMIN',
  }),
  valorNuevo: JSON.stringify({}),
  hashIntegridad: 'CE673819',
};

export const Default = () => (
  <div style={{ width: 500 }}>
    <AuditoriaDetailPanel log={mockLog} />
  </div>
);

export const Empty = () => (
  <div style={{ width: 500 }}>
    <AuditoriaDetailPanel />
  </div>
);