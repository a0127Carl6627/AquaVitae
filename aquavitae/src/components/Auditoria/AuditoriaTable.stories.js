import AuditoriaTable from './AuditoriaTable';

export default {
  title: 'Auditoria/AuditoriaTable',
  component: AuditoriaTable,
};

const mockLogs = [
  {
    id: 1,
    accion: 'CREAR_USUARIO',
    modulo: 'Gestión Usuarios',
    entidad: 'Usuario',
    severidad: 'INFO',
    ip: '192.168.1.25',
    fecha: '2026-05-27T20:36:10',
  },
  {
    id: 2,
    accion: 'ELIMINAR_USUARIO',
    modulo: 'Gestión Usuarios',
    entidad: 'Usuario #9',
    severidad: 'ALTA',
    ip: '192.168.1.25',
    fecha: '2026-05-27T20:37:05',
  },
];

export const Default = () => (
  <AuditoriaTable
    logs={mockLogs}
    selectedLogId={2}
    onSelectLog={(log) => console.log(log)}
  />
);