import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDashboard, useKpis, useProyeccion, useRecuperacion } from '../hooks/useAquavitaeQueries';
import SimulacionKpiCard from '../components/simulacion/SimulacionKpiCard';
import MapaRiesgoHidrico from '../components/maps/MapaRiesgoHidrico';
import GraficaProyeccionHidrica from '../components/charts/GraficaProyeccionHidrica';
import GraficaRecuperacionHidrica from '../components/charts/GraficaRecuperacionHidrica';

// Sets de clases por nivel de riesgo (detectables por el JIT de Tailwind).
const RIESGO_TEXT     = { ALTO: 'text-[#e23b3b]', MEDIO: 'text-[#e89923]', BAJO: 'text-[#2ea36b]' };
const RIESGO_BADGE_BG = { ALTO: 'bg-[#fde8e8]', MEDIO: 'bg-[#fdf2dd]', BAJO: 'bg-[#e3f4ea]' };
const RIESGO_BAR_BG   = { ALTO: 'bg-[#e23b3b]', MEDIO: 'bg-[#e89923]', BAJO: 'bg-[#2ea36b]' };

function kpiColor(indice) { if (indice >= 0.70) return 'red'; if (indice >= 0.45) return 'amber'; return 'green'; }
function diasColor(dias) { if (dias <= 14) return 'red'; if (dias <= 30) return 'amber'; return 'blue'; }
function probColor(prob) { if (prob >= 0.70) return 'red'; if (prob >= 0.40) return 'amber'; return 'green'; }
function formatMillon(num) {
  if (num == null) return '—';

  const n = Number(num);

  if (n >= 1_000_000_000) {
    return `${(n / 1_000_000_000).toFixed(1)} MM`;
  }

  if (n >= 1_000_000) {
    return `${Math.round(n / 1_000_000)} M`;
  }

  return n.toLocaleString('es-MX');
}

const WaterIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/></svg>;
const ClockIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>;
const AlertIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>;
const MoneyIcon = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;

export default function SimulacionPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);

  const { data: dashboard, isLoading: loadingDashboard, error: dashboardError } = useDashboard();
  const plantas = dashboard?.plantas || [];
  const resumen = dashboard?.resumen || {};

  useEffect(() => {
    if (!loadingDashboard && plantas.length > 0 && selectedId === null) {
      const firstHigh = plantas.find(p => p.nivelRiesgo === 'ALTO') || plantas[0];
      if (firstHigh) setSelectedId(firstHigh.id);
    }
  }, [loadingDashboard, plantas, selectedId]);

  const { data: kpis, isLoading: loadingKpis, error: kpisError } = useKpis(selectedId);
  const { data: proyeccion, isLoading: loadingProyeccion } = useProyeccion(selectedId);
  const { data: recuperacion, isLoading: loadingRecuperacion } = useRecuperacion(selectedId);

  const loadingDetail = loadingKpis || loadingProyeccion || loadingRecuperacion;
  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  const selectedPlanta = plantas.find(p => p.id === selectedId);

  if (loadingDashboard) return <div className="flex flex-1 items-center justify-center">Cargando datos...</div>;
  if (dashboardError) return <div className="flex flex-1 items-center justify-center text-[#e23b3b]">Error: {dashboardError.message}</div>;

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-end border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="flex items-center gap-3.5"><span>{dateStr} · {timeStr}</span><div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">DR</div></div>
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-7 pb-10 pt-6">
        <div className="mb-[22px] flex justify-between">
          <div><h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Simulación y recuperación hídrica</h1><p className="m-0 text-[13px] text-[#5a6577]">Proyección de estrés hídrico y escenarios de recuperación por planta · Bachoco 2026</p></div>
          <div className="flex items-center gap-2"><label className="text-[11px] text-[#8a93a3]">PLANTA:</label><select value={selectedId ?? ''} onChange={e => setSelectedId(Number(e.target.value))} className="min-w-[200px] cursor-pointer appearance-none rounded-lg border border-[#d6dde6] bg-white py-[7px] pl-[11px] pr-[30px] text-[12.5px]">{plantas.map(p => <option key={p.id} value={p.id}>{p.nombre.replace(/^Planta\s+/i, '')}</option>)}</select></div>
        </div>

        {/* KPI Cards */}
        <div className="mb-5 grid grid-cols-4 gap-3.5">
          {(loadingDetail || !kpis) ? (
            [...Array(4)].map((_, i) => <div key={i} className="h-[100px] rounded-xl bg-white" />)
          ) : (
            <>
              <SimulacionKpiCard label="Índice hídrico actual" value={`${Math.round(kpis.indiceHidricoActual * 100)}%`} sublabel="Nivel de estrés" color={kpiColor(kpis.indiceHidricoActual)} icon={<WaterIcon />} />
              <SimulacionKpiCard label="Días hasta umbral crítico" value={kpis.diasHastaUmbralCritico < 0 ? '+90 días' : kpis.diasHastaUmbralCritico === 0 ? 'Ya crítico' : String(kpis.diasHastaUmbralCritico)} sublabel="Sin intervención" color={kpis.diasHastaUmbralCritico === 0 ? 'red' : kpis.diasHastaUmbralCritico < 0 ? 'green' : diasColor(kpis.diasHastaUmbralCritico)} icon={<ClockIcon />} />
              <SimulacionKpiCard label="Probabilidad evento crítico" value={`${Math.round(kpis.probabilidadEventoCritico * 100)}%`} sublabel="Próximos 90 días" color={probColor(kpis.probabilidadEventoCritico)} icon={<AlertIcon />} />
              <SimulacionKpiCard label="Pérdida económica proyectada" value={formatMillon(kpis.perdidaEconomicaProyectada)} sublabel="Estimado 90 días MXN" color="blue" icon={<MoneyIcon />} />
            </>
          )}
        </div>

        {/* Grid de 2 columnas */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <MapaRiesgoHidrico plantas={plantas} height={340} selectedEstado={selectedPlanta?.estado ?? null} onSelectPlanta={p => setSelectedId(p.id)} />

          {loadingDetail || !proyeccion ? (
            <div className="flex h-[420px] items-center justify-center rounded-xl bg-white">Cargando proyección...</div>
          ) : (
            <GraficaProyeccionHidrica data={proyeccion.data} startDay={proyeccion.startDay} peakDay={proyeccion.peakDay} peakValue={proyeccion.peakValue} height={340} />
          )}

          <div className="overflow-hidden rounded-xl bg-white">
            <div className="border-b border-[#e6eaf0] px-[18px] pb-2.5 pt-4">
              <div className="text-sm font-semibold">Plantas monitoreadas</div>
              <div className="text-[11.5px] text-[#8a93a3]">{resumen.alto ?? 0} alto · {resumen.medio ?? 0} medio · {resumen.bajo ?? 0} bajo</div>
            </div>
            <div className="overflow-y-auto">
              <table className="w-full border-collapse text-[12.5px]">
                <thead>
                  <tr>{['Planta','Estado','Estrés','Riesgo'].map(h => <th key={h} className="bg-[#fafbfc] px-3.5 py-2.5 text-left">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {plantas.map(p => {
                    const isSelected = p.id === selectedId;
                    const textColor = RIESGO_TEXT[p.nivelRiesgo] || 'text-[#94a0b3]';
                    const badgeBg = RIESGO_BADGE_BG[p.nivelRiesgo] || 'bg-[#eef1f5]';
                    const barBg = RIESGO_BAR_BG[p.nivelRiesgo] || 'bg-[#94a0b3]';
                    return (
                      <tr key={p.id} onClick={() => setSelectedId(p.id)} className={clsx('cursor-pointer border-l-[3px]', isSelected ? 'border-l-[#2563eb] bg-[#eaf1fe]' : 'border-l-transparent bg-transparent')}>
                        <td className={clsx('px-3.5 py-[11px]', isSelected ? 'font-semibold' : 'font-normal')}>{p.nombre}</td>
                        <td className="px-3.5 py-[11px] text-[#5a6577]">{p.estado}</td>
                        <td className="px-3.5 py-[11px]">
                          <div className="h-1.5 w-[72px] overflow-hidden rounded-full bg-[#eef1f5]">
                            {/* ancho 100% dinámico desde datos: excepción inline justificada */}
                            <div className={`h-full ${barBg}`} style={{ width: `${p.indice}%` }} />
                          </div>
                          <span className="ml-2 font-semibold">{p.indice}%</span>
                        </td>
                        <td className="px-3.5 py-[11px]">
                          <span className={`rounded-full px-[9px] py-[3px] text-[11px] font-semibold ${badgeBg} ${textColor}`}>{p.riesgoLabel}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {loadingDetail || !recuperacion ? (
            <div className="flex h-[420px] items-center justify-center rounded-xl bg-white">Cargando simulación...</div>
          ) : (
            <GraficaRecuperacionHidrica data={recuperacion} height={340} />
          )}
        </div>

        <div className="flex items-center rounded-xl bg-[#eaf1fe] px-[22px] py-4">
          <div className="mr-3.5 grid h-9 w-9 place-items-center rounded-[10px] bg-[#2563eb] text-white">📍</div>
          <div>
            <strong className="block text-sm">¿Necesitas evaluar ubicaciones alternativas?</strong>
            <span className="text-xs text-[#5a6577]">{selectedPlanta ? `${selectedPlanta.nombre} tiene estrés hídrico ${selectedPlanta.riesgoLabel?.toLowerCase()}.` : 'Selecciona una planta para ver su análisis.'} Consulta el análisis de alternativas.</span>
          </div>
        </div>
      </div>
    </div>
  );
}