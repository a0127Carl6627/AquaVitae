const KPI_CONFIG = [
  {
    key: 'registrosInmutables',
    label: 'Eventos totales',
    subtitle: 'Registros protegidos',
    icon: '📄',
    iconClass: 'bg-[#eaf2ff] text-[#2563eb]',
  },
  {
    key: 'usuariosAuditados',
    label: 'Usuarios auditados',
    subtitle: 'Con actividad registrada',
    icon: '👤',
    iconClass: 'bg-[#eafbf1] text-[#16a34a]',
  },
  {
    key: 'eventosHoy',
    label: 'Eventos hoy',
    subtitle: 'Actividad reciente',
    icon: '✎',
    iconClass: 'bg-[#f3e8ff] text-[#7c3aed]',
  },
  {
    key: 'cambiosCriticos',
    label: 'Eventos críticos',
    subtitle: 'Requieren atención',
    icon: '🛡',
    iconClass: 'bg-[#fff4df] text-[#f59e0b]',
  },
];

function AuditoriaKpis({ resumen = {} }) {
  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      {KPI_CONFIG.map((item) => (
        <div key={item.key} className="flex items-center gap-3.5 rounded-2xl border border-[#e8edf5] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-xl ${item.iconClass}`}>
            {item.icon}
          </div>

          <div className="flex flex-col">
            <p className="m-0 mb-1.5 text-[13px] font-semibold text-[#64748b]">
              {item.label}
            </p>

            <h2 className="m-0 text-[30px] font-extrabold leading-none text-[#172033]">
              {resumen[item.key] ?? 0}
            </h2>

            <p className="mt-1.5 text-xs text-[#94a3b8]">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuditoriaKpis;
