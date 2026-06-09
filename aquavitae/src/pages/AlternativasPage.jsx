import React, { useState, useEffect } from 'react';
import { useDashboard, useAlerta, useAlternativas, useFactores, useProyeccion, useKpis } from '../hooks/useAquavitaeQueries';
import AlertaBannerHidrico from '../components/ui/AlertaBannerHidrico';
import MapaAlternativas from '../components/maps/MapaAlternativas';
import GraficaDisponibilidadOperativa from '../components/charts/GraficaDisponibilidadOperativa';
import TablaCostosUbicacion from '../components/simulacion/TablaCostosUbicacion';
import FactoresClave from '../components/ui/FactoresClave';
import { formatMXN } from '../services/aquavitaeApi';

export default function AlternativasPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAlternativa, setSelectedAlternativa] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const { data: dashboard, isLoading: loadingDashboard, error: dashboardError } = useDashboard();
  const plantas = dashboard?.plantas || [];

  useEffect(() => {
    if (!loadingDashboard && plantas.length > 0 && selectedId === null) {
      const firstHigh = plantas.find(p => p.nivelRiesgo === 'ALTO') || plantas[0];
      if (firstHigh) setSelectedId(firstHigh.id);
    }
  }, [loadingDashboard, plantas, selectedId]);

  const { data: alerta, isLoading: loadingAlerta } = useAlerta(selectedId);
  const { data: alternativas, isLoading: loadingAlternativas } = useAlternativas(selectedId);
  const { data: factores, isLoading: loadingFactores } = useFactores(selectedId);
  const { data: proyeccion, isLoading: loadingProyeccion } = useProyeccion(selectedId);
  const { data: kpis, isLoading: loadingKpis } = useKpis(selectedId);

  const loadingDetail = loadingAlerta || loadingAlternativas || loadingFactores || loadingProyeccion || loadingKpis;
  const disponibilidadData = proyeccion?.data?.map(p => ({
    dia: p.dia,
    valor: parseFloat((100 - p.valor).toFixed(1)),
    bandaSup: p.bandaInf != null ? parseFloat((100 - p.bandaInf).toFixed(1)) : null,
    bandaInf: p.bandaSup != null ? parseFloat((100 - p.bandaSup).toFixed(1)) : null,
  })) || [];

  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  const selectedPlanta = plantas.find(p => p.id === selectedId);

  if (loadingDashboard) return <div className="flex flex-1 items-center justify-center">Cargando datos...</div>;
  if (dashboardError) return <div className="flex flex-1 items-center justify-center text-[#e23b3b]">Error: {dashboardError.message}</div>;

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#f5f7fa]">
      <div className="flex items-center justify-end border-b border-[#e6eaf0] bg-white px-7 py-3.5">
        <div className="flex items-center gap-3.5">
          <select value={selectedId ?? ''} onChange={e => setSelectedId(Number(e.target.value))} className="cursor-pointer appearance-none rounded-lg border border-[#d6dde6] bg-white py-1.5 pl-2.5 pr-7 text-xs">
            {plantas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <span className="text-xs text-[#5a6577]">{dateStr} · {timeStr}</span>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(140deg,#c5d4e3,#8a9bb0)] text-white">DR</div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-7 pb-10 pt-6">
        <div className="mb-5">
          <h1 className="m-0 text-[22px] font-bold text-[#1a2332]">Alternativas de ubicación</h1>
          <p className="m-0 text-[13px] text-[#5a6577]">Análisis comparativo de ubicaciones para reubicación operativa · Factores hídricos, logísticos y financieros</p>
        </div>

        {loadingDetail || !alerta ? (
          <div className="mb-5 flex h-20 items-center rounded-xl bg-[#fde8e8] p-5 text-[#8a93a3]">Cargando alerta...</div>
        ) : alerta.estresActual < 45 ? (
          <div className="mb-5 flex items-center gap-4 rounded-xl bg-[#e3f4ea] px-5 py-4">
            <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#2ea36b] text-white">✓</div>
            <div><strong className="block text-[13.5px] text-[#2ea36b]">Operación normal en {alerta.nombrePlanta}</strong><span className="text-xs text-[#5a6577]">Estrés hídrico actual: {alerta.estresActual}% · Sin riesgo de cierre en los próximos 90 días · Costo apertura referencia: {alerta.costoAperturaStr}</span></div>
          </div>
        ) : (
          <div className="mb-5"><AlertaBannerHidrico plantaNombre={alerta.nombrePlanta} estresActual={alerta.estresActual} cierreRecomendadoDias={alerta.diasCierreRecomendado <= 0 ? 0 : alerta.diasCierreRecomendado} costoApertura={alerta.costoAperturaStr} costoOperacion={alerta.costoOperacionStr} diasApertura={alerta.diasAperturaStr} /></div>
        )}

        <div className="mb-4 grid grid-cols-[4fr_3fr] gap-4">
          {loadingDetail || alternativas?.length === 0 ? <div className="flex h-[400px] items-center justify-center rounded-xl bg-white">Cargando mapa...</div> : <MapaAlternativas key={selectedId} plantaActual={selectedPlanta ? { nombre: selectedPlanta.nombre, estado: selectedPlanta.estado } : null} alternativas={alternativas} selectedEstado={selectedAlternativa?.estado ?? null} height={340} onSelectAlternativa={alt => setSelectedAlternativa(alt)} />}
          {loadingDetail || disponibilidadData.length === 0 ? <div className="flex items-center justify-center rounded-xl bg-white">Cargando gráfica...</div> : <GraficaDisponibilidadOperativa data={disponibilidadData} inicioDeclive={proyeccion?.startDay ?? 10} cierreForzoso={proyeccion?.peakDay ?? 80} perdidaProyectada={kpis ? formatMXN(kpis.perdidaEconomicaProyectada) : '—'} probEvento={kpis ? `${Math.round(kpis.probabilidadEventoCritico * 100)}%` : '—'} height={280} />}
        </div>

        <div className="mb-5 grid grid-cols-[3fr_2fr] gap-4">
          {loadingDetail || alternativas?.length === 0 ? <div className="flex items-center justify-center rounded-xl bg-white p-5">Cargando alternativas...</div> : <TablaCostosUbicacion alternativas={alternativas} selectedNombre={selectedAlternativa?.nombre ?? null} onSelectAlternativa={alt => setSelectedAlternativa(alt)} />}
          {loadingDetail || factores?.length === 0 ? <div className="flex items-center justify-center rounded-xl bg-white p-5">Cargando factores...</div> : <FactoresClave titulo={selectedPlanta ? `Para ${selectedPlanta.nombre}` : 'Para la ubicación seleccionada'} factores={factores} />}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-[#eaf1fe] px-[22px] py-4">
          <div className="flex items-center gap-3.5">
            <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#2563eb] text-white">📈</div>
            <div><strong className="block text-sm">¿Necesitas proyectar la recuperación hídrica?</strong><span className="text-xs text-[#5a6577]">Consulta la simulación de recuperación con y sin intervención en el módulo de Simulación.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}