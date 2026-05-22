import React, { useEffect, useMemo, useState } from 'react';
import './ApiAlertsPage.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default function ApiAlertsPage() {
  const [statusList, setStatusList] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);

  async function loadData() {
    setError('');

    try {
      const [statusRes, alertsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/apis/status`),
        fetch(`${API_BASE}/admin/apis/alerts`),
      ]);

      if (!statusRes.ok) throw new Error(`Status APIs: ${statusRes.status}`);
      if (!alertsRes.ok) throw new Error(`Alertas APIs: ${alertsRes.status}`);

      const statusData = await statusRes.json();
      const alertsData = await alertsRes.json();

      setStatusList(statusData);
      setAlerts(alertsData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el monitoreo de APIs.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);

    try {
      await fetch(`${API_BASE}/admin/apis/check`, {
        method: 'POST',
      });
    } catch (err) {
      console.error(err);
    }

    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  const metrics = useMemo(() => {
    const errores401 = alerts.filter((a) => a.codigoError === 401).length;
    const errores404 = alerts.filter((a) => a.codigoError === 404).length;
    const totalErrores = alerts.length;
    const apisAfectadas = new Set(alerts.map((a) => a.nombreApi)).size;

    return {
      errores401,
      errores404,
      totalErrores,
      apisAfectadas,
    };
  }, [alerts]);

  if (loading) {
    return (
      <main className="api-alerts-page">
        <p className="api-loading">Cargando monitoreo de APIs...</p>
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
            Última actualización:{' '}
            {lastUpdate ? lastUpdate.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : '—'}
          </span>

          <button className="api-refresh-btn" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? 'Actualizando...' : 'Actualizar APIs'}
          </button>
        </div>
      </header>

      {error && <div className="api-error-banner">{error}</div>}

      <section className="api-cards-grid">
        <MetricCard
          title="Errores 401"
          subtitle="No autorizado"
          value={metrics.errores401}
          tone="red"
          icon="🔒"
        />

        <MetricCard
          title="Errores 404"
          subtitle="No encontrado"
          value={metrics.errores404}
          tone="orange"
          icon="!"
        />

        <MetricCard
          title="Total de errores"
          subtitle="401 y 404"
          value={metrics.totalErrores}
          tone="purple"
          icon="⌁"
        />

        <MetricCard
          title="APIs afectadas"
          subtitle="Con errores"
          value={metrics.apisAfectadas}
          tone="blue"
          icon="▦"
        />
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
                  <div
                    className={api.estado === 'OK' ? 'api-bar-fill ok' : 'api-bar-fill error'}
                    style={{ width: `${api.estado === 'OK' ? 20 : 70}%` }}
                  />
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
              <tr>
                <th>API</th>
                <th>Endpoint</th>
                <th>Código</th>
                <th>Mensaje</th>
                <th>Severidad</th>
              </tr>
            </thead>

            <tbody>
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="api-empty-cell">
                    No hay alertas activas.
                  </td>
                </tr>
              ) : (
                alerts.map((alert, index) => (
                  <tr key={`${alert.nombreApi}-${alert.endpoint}-${index}`}>
                    <td>{alert.nombreApi}</td>
                    <td>{alert.endpoint}</td>
                    <td>
                      <span className={`api-code-pill code-${alert.codigoError}`}>
                        {alert.codigoError}
                      </span>
                    </td>
                    <td>{alert.mensaje}</td>
                    <td>
                      <span className={`api-severity ${alert.severidad?.toLowerCase()}`}>
                        {alert.severidad}
                      </span>
                    </td>
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