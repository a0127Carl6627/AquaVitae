import React, { useMemo } from 'react';
import { useApiStatus, useApiAlerts, useTriggerApiCheck } from '../../hooks/useAquavitaeQueries';
import './ApiAlertsPage.css';

export default function ApiAlertsPage() {
  const { data: statusList = [], isLoading: loadingStatus, error: statusError } = useApiStatus();
  const { data: alerts = [], isLoading: loadingAlerts, error: alertsError } = useApiAlerts();
  const triggerCheck = useTriggerApiCheck();

  const loading = loadingStatus || loadingAlerts;
  const error = statusError || alertsError;

  const metrics = useMemo(() => {
    const errores401 = alerts.filter((a) => a.codigoError === 401).length;
    const errores404 = alerts.filter((a) => a.codigoError === 404).length;
    const totalErrores = alerts.length;
    const apisAfectadas = new Set(alerts.map((a) => a.nombreApi)).size;
    return { errores401, errores404, totalErrores, apisAfectadas };
  }, [alerts]);

  const handleRefresh = () => {
    triggerCheck.mutate();
  };

  if (loading) {
    return (
      <main className="api-alerts-page">
        <p className="api-loading">Cargando monitoreo de APIs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="api-alerts-page">
        <div className="api-error-banner">Error: {error.message}</div>
      </main>
    );
  }

  return (
    <main className="api-alerts-page">
      <header className="api-header">
        <div>
          <h1>Alertas de API</h1>
          <p>Monitorea errores de integración para detectar y resolver problemas antes de que afecten al usuario.</p>
        </div>
        <div className="api-header-actions">
          <span className="api-last-update">
            Última actualización: {new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button className="api-refresh-btn" onClick={handleRefresh} disabled={triggerCheck.isPending}>
            {triggerCheck.isPending ? 'Actualizando...' : 'Actualizar APIs'}
          </button>
        </div>
      </header>

      <section className="api-cards-grid">
        <MetricCard title="Errores 401" subtitle="No autorizado" value={metrics.errores401} tone="red" icon="🔒" />
        <MetricCard title="Errores 404" subtitle="No encontrado" value={metrics.errores404} tone="orange" icon="!" />
        <MetricCard title="Total de errores" subtitle="401 y 404" value={metrics.totalErrores} tone="purple" icon="⌁" />
        <MetricCard title="APIs afectadas" subtitle="Con errores" value={metrics.apisAfectadas} tone="blue" icon="▦" />
      </section>

      <section className="api-content-grid">
        <div className="api-panel">
          <h2>Estado de APIs externas</h2>
          <div className="api-status-list">
            {statusList.length === 0 ? (
              <p className="api-empty">Sin APIs monitoreadas todavía.</p>
            ) : (
              statusList.map((api) => (
                <div className="api-status-item" key={`${api.nombreApi}-${api.endpoint}`}>
                  <div>
                    <strong>{api.nombreApi}</strong>
                    <span>{api.endpoint}</span>
                  </div>
                  <div className={`api-status-badge ${api.estado === 'OK' ? 'ok' : 'error'}`}>
                    {api.estado}
                  </div>
                  <span className="api-code">{api.ultimoCodigo ?? '—'}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="api-panel">
          <h2>Errores por API</h2>
          <div className="api-error-summary">
            {statusList.map((api) => (
              <div className="api-error-row" key={api.nombreApi}>
                <span>{api.nombreApi}</span>
                <div className="api-bar">
                  <div className={`api-bar-fill ${api.estado === 'OK' ? 'ok' : 'error'}`} style={{ width: `${api.estado === 'OK' ? 20 : 70}%` }} />
                </div>
                <strong>{api.erroresActivos}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="api-panel">
        <div className="api-table-header">
          <h2>Alertas recientes</h2>
        </div>
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr><th>API</th><th>Endpoint</th><th>Código</th><th>Mensaje</th><th>Severidad</th></tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr><td colSpan="5" className="api-empty-cell">No hay alertas activas.</td></tr>
              ) : (
                alerts.map((alert, idx) => (
                  <tr key={`${alert.nombreApi}-${alert.endpoint}-${idx}`}>
                    <td>{alert.nombreApi}</td>
                    <td>{alert.endpoint}</td>
                    <td><span className={`api-code-pill code-${alert.codigoError}`}>{alert.codigoError}</span></td>
                    <td>{alert.mensaje}</td>
                    <td><span className={`api-severity ${alert.severidad?.toLowerCase()}`}>{alert.severidad}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ title, subtitle, value, tone, icon }) {
  return (
    <article className="api-metric-card">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <strong className={`metric-value ${tone}`}>{value}</strong>
      </div>
      <div className={`metric-icon ${tone}`}>{icon}</div>
    </article>
  );
}