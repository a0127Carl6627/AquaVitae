import AuditoriaKpis from './AuditoriaKpis';

export default {
  title: 'Auditoria/AuditoriaKpis',
  component: AuditoriaKpis,
};

export const Default = {
  args: {
    resumen: {
      registrosInmutables: 1248,
      usuariosAuditados: 32,
      eventosHoy: 842,
      cambiosCriticos: 18,
    },
  },
};