import './AuditoriaTable.css';

function formatDate(dateString) {
  if (!dateString) return '—';

  return new Date(dateString).toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function getSeverityClass(severidad) {
  const s = (severidad || '').toLowerCase();

  if (s === 'alta') return 'alta';
  if (s === 'media') return 'media';

  return 'info';
}

function AuditoriaTable({
  logs = [],
  selectedLogId,
  onSelectLog,
}) {
  return (
    <div className="auditoria-table-container">
      <table className="auditoria-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Acción</th>
            <th>Módulo</th>
            <th>Entidad</th>
            <th>Severidad</th>
            <th>IP</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              onClick={() => onSelectLog?.(log)}
              className={
                selectedLogId === log.id
                  ? 'selected'
                  : ''
              }
            >
              <td>{formatDate(log.fecha)}</td>

              <td className="accion-cell">
                {log.accion}
              </td>

              <td>{log.modulo}</td>

              <td>{log.entidad}</td>

              <td>
                <span
                  className={`severity-badge ${getSeverityClass(log.severidad)}`}
                >
                  {log.severidad}
                </span>
              </td>

              <td>{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditoriaTable;