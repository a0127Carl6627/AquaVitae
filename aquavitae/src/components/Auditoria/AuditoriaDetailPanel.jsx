import './AuditoriaDetailPanel.css';

function formatJson(value) {
  if (!value) return '{}';

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch {
    return value;
  }
}

function AuditoriaDetailPanel({ log }) {
  if (!log) {
    return (
      <div className="auditoria-detail-empty">
        Selecciona un evento de auditoría
      </div>
    );
  }

  return (
    <div className="auditoria-detail-panel">
      <div className="auditoria-detail-header">
        <h3>Detalle de evento</h3>
        <span>{log.accion}</span>
      </div>

      <div className="auditoria-detail-section">
        <label>Descripción</label>
        <p>{log.descripcion}</p>
      </div>

      <div className="auditoria-detail-grid">
        <div>
          <label>Módulo</label>
          <p>{log.modulo}</p>
        </div>

        <div>
          <label>Entidad</label>
          <p>{log.entidad}</p>
        </div>

        <div>
          <label>IP</label>
          <p>{log.ip}</p>
        </div>

        <div>
          <label>Severidad</label>
          <p>{log.severidad}</p>
        </div>
      </div>

      <div className="auditoria-detail-section">
        <label>Valor anterior</label>

        <pre>
          {formatJson(log.valorAnterior)}
        </pre>
      </div>

      <div className="auditoria-detail-section">
        <label>Valor nuevo</label>

        <pre>
          {formatJson(log.valorNuevo)}
        </pre>
      </div>

      <div className="auditoria-detail-section">
        <label>Hash integridad</label>
        <code>{log.hashIntegridad}</code>
      </div>
    </div>
  );
}

export default AuditoriaDetailPanel;