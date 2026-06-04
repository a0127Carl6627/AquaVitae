import React, { useState, useEffect, useMemo } from 'react';
import { useApiStatus, useApiAlerts, useTriggerApiCheck } from '../hooks/useAquavitaeQueries';

const PANEL = 'rounded-2xl border border-[#eef2f7] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]';
const TH = 'border-b border-[#edf2f7] px-2.5 py-3 text-left font-[650] text-[#64748b]';
const TD = 'border-b border-[#f1f5f9] px-2.5 py-[13px] text-[#334155]';

const METRIC_VALUE_TONE = {
  red: 'text-[#ef4444]',
  orange: 'text-[#f97316]',
  purple: 'text-[#7c3aed]',
  blue: 'text-[#2563eb]',
};
const METRIC_ICON_TONE = {
  red: 'bg-[#fee2e2] text-[#ef4444]',
  orange: 'bg-[#ffedd5] text-[#f97316]',
  purple: 'bg-[#ede9fe] text-[#7c3aed]',
  blue: 'bg-[#dbeafe] text-[#2563eb]',
};
const CODE_PILL = {
  401: 'bg-[#fee2e2] text-[#ef4444]',
  404: 'bg-[#ffedd5] text-[#f97316]',
};
const SEVERITY = {
  critica: 'bg-[#fee2e2] text-[#dc2626]',
  alta: 'bg-[#ffedd5] text-[#f97316]',
};

export default function ApiAlertsPage() {
  const { data: statusList = [], isLoading: loadingStatus, error: statusError } = useApiStatus();
  const { data: alerts = [], isLoading: loadingAlerts, error: alertsError } = useApiAlerts();
  const triggerCheck = useTriggerApiCheck();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

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
    return <div className="flex flex-1 items-center justify-center">Cargando monitoreo de APIs...</div>;
  }

  if (error) {
    return <div className="flex flex-1 items-center justify-center text-[#e23b3b]">Error: {error.message}</div>;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-between border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="text-xs text-[#8a93a3]">Administrador · <strong>Alertas de API</strong></div>
        <div className="flex items-center gap-3.5">
          <span className="text-xs text-[#5a6577]">{dateStr} · {timeStr}</span>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">AD</div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-7 pb-10 pt-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Alertas de API</h1>
          <p className="m-0 text-[13px] text-[#5a6577]">Monitorea errores de integración para detectar y resolver problemas antes de que afecten al usuario.</p>
        </div>
        <button
          className="cursor-pointer rounded-[10px] border border-[#dbe3ef] bg-white px-3.5 py-2.5 font-[650] text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleRefresh}
          disabled={triggerCheck.isPending}
        >
          {triggerCheck.isPending ? 'Actualizando...' : 'Actualizar APIs'}
        </button>
      </div>

      <section className="mb-5 grid grid-cols-1 gap-[18px] min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4">
        <MetricCard title="Errores 401" subtitle="No autorizado" value={metrics.errores401} tone="red" icon="🔒" />
        <MetricCard title="Errores 404" subtitle="No encontrado" value={metrics.errores404} tone="orange" icon="!" />
        <MetricCard title="Total de errores" subtitle="401 y 404" value={metrics.totalErrores} tone="purple" icon="⌁" />
        <MetricCard title="APIs afectadas" subtitle="Con errores" value={metrics.apisAfectadas} tone="blue" icon="▦" />
      </section>

      <section className="mb-5 grid grid-cols-1 gap-[18px] min-[1100px]:grid-cols-2">
        <div className={PANEL}>
          <h2 className="m-0 mb-4 text-base font-bold text-[#111827]">Estado de APIs externas</h2>
          <div className="flex flex-col gap-3">
            {statusList.length === 0 ? (
              <p className="text-sm text-[#94a3b8]">Sin APIs monitoreadas todavía.</p>
            ) : (
              statusList.map((api) => (
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-[#f1f5f9] p-3" key={`${api.nombreApi}-${api.endpoint}`}>
                  <div>
                    <strong className="block text-sm text-[#111827]">{api.nombreApi}</strong>
                    <span className="text-xs text-[#64748b]">{api.endpoint}</span>
                  </div>
                  <div className={`rounded-full px-2.5 py-[5px] text-xs font-bold ${api.estado === 'OK' ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                    {api.estado}
                  </div>
                  <span className="font-bold text-[#475569]">{api.ultimoCodigo ?? '—'}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={PANEL}>
          <h2 className="m-0 mb-4 text-base font-bold text-[#111827]">Errores por API</h2>
          <div className="flex flex-col gap-3.5">
            {statusList.map((api) => (
              <div className="grid grid-cols-[120px_1fr_30px] items-center gap-3.5 text-[13px] text-[#475569]" key={api.nombreApi}>
                <span>{api.nombreApi}</span>
                <div className="h-2 overflow-hidden rounded-full bg-[#f1f5f9]">
                  {/* ancho dinámico: inline justificado */}
                  <div className={`h-full rounded-full ${api.estado === 'OK' ? 'bg-[#60a5fa]' : 'bg-[#ef4444]'}`} style={{ width: `${api.estado === 'OK' ? 20 : 70}%` }} />
                </div>
                <strong>{api.erroresActivos}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={PANEL}>
        <div>
          <h2 className="m-0 mb-4 text-base font-bold text-[#111827]">Alertas recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr><th className={TH}>API</th><th className={TH}>Endpoint</th><th className={TH}>Código</th><th className={TH}>Mensaje</th><th className={TH}>Severidad</th></tr>
            </thead>
            <tbody>
              {alerts.length === 0 ? (
                <tr><td colSpan="5" className="p-[30px] text-center text-sm text-[#94a3b8]">No hay alertas activas.</td></tr>
              ) : (
                alerts.map((alert, idx) => (
                  <tr key={`${alert.nombreApi}-${alert.endpoint}-${idx}`}>
                    <td className={TD}>{alert.nombreApi}</td>
                    <td className={TD}>{alert.endpoint}</td>
                    <td className={TD}><span className={`rounded-full px-2 py-1 font-extrabold ${CODE_PILL[alert.codigoError] || ''}`}>{alert.codigoError}</span></td>
                    <td className={TD}>{alert.mensaje}</td>
                    <td className={TD}><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${SEVERITY[alert.severidad?.toLowerCase()] || ''}`}>{alert.severidad}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
      </div>
    </div>
  );
}

function MetricCard({ title, subtitle, value, tone, icon }) {
  return (
    <article className="flex items-center justify-between rounded-2xl border border-[#eef2f7] bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
      <div>
        <h3 className="m-0 text-sm text-[#334155]">{title}</h3>
        <p className="mb-2.5 mt-1 text-xs text-[#94a3b8]">{subtitle}</p>
        <strong className={`text-[32px] font-extrabold ${METRIC_VALUE_TONE[tone] || ''}`}>{value}</strong>
      </div>
      <div className={`grid h-[58px] w-[58px] place-items-center rounded-full text-[22px] font-extrabold ${METRIC_ICON_TONE[tone] || ''}`}>{icon}</div>
    </article>
  );
}
