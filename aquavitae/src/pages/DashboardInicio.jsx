import React, { useState, useEffect } from 'react';
import { useDashboard, useAlertas, useEvolucion } from '../hooks/useAquavitaeQueries';
import StatCards from '../components/dashboard/StatCards';
import RiskGauge from '../components/charts/RiskGauge';
import DonutChart from '../components/charts/DonutChart';
import RiskEvolutionChart from '../components/charts/RiskEvolutionChart';
import MexicoRiskMap from '../components/maps/MexicoRiskMap';
import AlertsList from '../components/dashboard/AlertsList';
import LastUpdated from '../components/ui/LastUpdated';
import PlantRiskList from '../components/dashboard/PlantRiskList';

function formatHora(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d)) return '';
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ap = h >= 12 ? 'p.m.' : 'a.m.';
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
}

function formatFechaCorta(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(String(value).includes('T') ? value : `${value}T12:00:00`);
  if (isNaN(d)) return '';
  const dia = d.getDate();
  const mes = d.toLocaleString('es-MX', { month: 'short' }).replace('.', '').replace(/^\w/, c => c.toUpperCase());
  return `${dia} ${mes}`;
}

export default function DashboardInicio() {
  const [selectedId, setSelectedId] = useState(null);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  const { data: dashboard, isLoading, error, refetch } = useDashboard();
  const { data: alertasRaw } = useAlertas(10);
  const { data: evolucionRaw } = useEvolucion(7);

  if (isLoading) return <div className="flex flex-1 items-center justify-center">Cargando resumen ejecutivo…</div>;
  if (error) return <div className="flex-1 p-5 text-center text-[red]">Error: {error.message}</div>;

  const plantas = dashboard?.plantas || [];
  const resumenRaw = dashboard?.resumen || {};
  const resumen = {
    alto: Number(resumenRaw.alto ?? 0),
    medio: Number(resumenRaw.medio ?? 0),
    bajo: Number(resumenRaw.bajo ?? 0),
    crisisActivas: Number(resumenRaw.alto ?? 0),
    totalPlantas: (resumenRaw.alto ?? 0) + (resumenRaw.medio ?? 0) + (resumenRaw.bajo ?? 0),
  };

  const alertas = (alertasRaw || []).map(a => ({
    id: a.id,
    tipo: a.tipo,
    titulo: a.titulo,
    descripcion: a.descripcion,
    hora: formatHora(a.fecha),
    fecha: a.fecha,
  }));

  const evolucion = (Array.isArray(evolucionRaw) ? evolucionRaw : (evolucionRaw?.puntos || [])).map(p => ({
    fecha: formatFechaCorta(p.fecha),
    valorPromedio: parseFloat(((p.valorPromedio ?? 0) * 100).toFixed(1)),
  }));

  const totalPlantas = resumen.totalPlantas;
  const nivelGeneral = totalPlantas === 0 ? 'bajo' : resumen.alto > 0 ? 'alto' : resumen.medio > 0 ? 'medio' : 'bajo';

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-between border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="text-xs text-[#8a93a3]">Director · <strong>Resumen ejecutivo hídrico</strong></div>
        <div className="flex items-center gap-3.5">
          <span className="text-xs text-[#5a6577]">{dateStr} · {timeStr}</span>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">DR</div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1400px] px-7 pb-10 pt-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Resumen ejecutivo hídrico</h1><p className="m-0 text-[13px] text-[#5a6577]">Visión general del riesgo hídrico y nivel de riesgo de plantas.</p></div>
          <LastUpdated fechaActualizacion={new Date()} onRefresh={refetch} loading={isLoading} />
        </div>

        <div className="mb-5 grid grid-cols-[220px_1fr] gap-4">
          <div className="flex justify-center rounded-xl bg-white px-3 py-4">
            <RiskGauge nivel={nivelGeneral} regiones={resumen.alto} />
          </div>
          <StatCards crisisActivas={resumen.crisisActivas} plantasAltoRiesgo={resumen.alto} plantasMedioRiesgo={resumen.medio} plantasBajoRiesgo={resumen.bajo} totalPlantas={totalPlantas} />
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white px-6 py-5">
            <MexicoRiskMap plantas={plantas} height={340} selectedEstado={plantas.find(p => p.idPlanta === selectedId)?.estado ?? null} onSelectPlanta={p => setSelectedId(p.idPlanta)} />
          </div>
          <div className="rounded-xl bg-white px-6 py-5">
            <PlantRiskList plants={plantas} selectedId={selectedId} onSelectPlanta={p => setSelectedId(p.idPlanta)} />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-[260px_1fr_300px] gap-4">
          <div className="rounded-xl bg-white px-6 py-5">
            <DonutChart alto={resumen.alto} medio={resumen.medio} bajo={resumen.bajo} />
          </div>
          <div className="flex flex-col rounded-xl bg-white px-6 py-5">
            <h3 className="m-0 mb-0.5 text-[15px]">Evolución del riesgo hídrico</h3>
            <p className="m-0 mb-3 text-xs text-gray-400">(últimos 7 días)</p>
            <RiskEvolutionChart data={evolucion} />
          </div>
          <div className="rounded-xl bg-white px-6 py-5">
            <AlertsList alerts={alertas} />
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white px-5 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eff6ff]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div><p className="m-0 mb-0.5 text-[13px] font-semibold">Notificaciones activas por correo</p><p className="text-xs text-gray-400">Recibe alertas inmediatas cuando se detecten niveles críticos o riesgo de sequía.</p></div>
        </div>
      </div>
    </div>
  );
}