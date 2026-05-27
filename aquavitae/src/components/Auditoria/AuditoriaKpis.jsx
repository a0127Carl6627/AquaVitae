import './AuditoriaKpis.css';

const KPI_CONFIG = [
  {
    key: 'registrosInmutables',
    label: 'Eventos totales',
    subtitle: 'Registros protegidos',
    icon: '📄',
    colorClass: 'blue',
  },
  {
    key: 'usuariosAuditados',
    label: 'Usuarios auditados',
    subtitle: 'Con actividad registrada',
    icon: '👤',
    colorClass: 'green',
  },
  {
    key: 'eventosHoy',
    label: 'Eventos hoy',
    subtitle: 'Actividad reciente',
    icon: '✎',
    colorClass: 'purple',
  },
  {
    key: 'cambiosCriticos',
    label: 'Eventos críticos',
    subtitle: 'Requieren atención',
    icon: '🛡',
    colorClass: 'orange',
  },
];

function AuditoriaKpis({ resumen = {} }) {
  return (
    <div className="auditoria-kpis-grid">
      {KPI_CONFIG.map((item) => (
        <div key={item.key} className="auditoria-kpi-card">
          <div className={`auditoria-kpi-icon ${item.colorClass}`}>
            {item.icon}
          </div>

          <div className="auditoria-kpi-content">
            <p className="auditoria-kpi-label">
              {item.label}
            </p>

            <h2 className="auditoria-kpi-value">
              {resumen[item.key] ?? 0}
            </h2>

            <p className="auditoria-kpi-subtitle">
              {item.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuditoriaKpis;