import React, { useState, useEffect } from 'react';
import { useDashboard, useAlerta, useAlternativas, useFactores, useProyeccion, useKpis } from '../hooks/useAquavitaeQueries';
import AlertaBannerHidrico from '../stories/AlertaBannerHidrico';
import MapaAlternativas from '../stories/MapaAlternativas';
import GraficaDisponibilidadOperativa from '../stories/GraficaDisponibilidadOperativa';
import TablaCostosUbicacion from '../stories/TablaCostosUbicacion';
import FactoresClave from '../stories/FactoresClave';
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

  if (loadingDashboard) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando datos...</div>;
  if (dashboardError) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e23b3b' }}>Error: {dashboardError.message}</div>;

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0' }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>Director · <strong>Alternativas de ubicación</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <select value={selectedId ?? ''} onChange={e => setSelectedId(Number(e.target.value))} style={{ appearance: 'none', background: '#fff', border: '1px solid #d6dde6', borderRadius: 8, padding: '6px 28px 6px 10px', fontSize: 12, cursor: 'pointer' }}>
            {plantas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <span style={{ fontSize: 12, color: '#5a6577' }}>{dateStr} · {timeStr}</span>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)', display: 'grid', placeItems: 'center', color: '#fff' }}>DR</div>
        </div>
      </div>

      <div style={{ padding: '24px 28px 40px', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#1a2332' }}>Alternativas de ubicación</h1>
          <p style={{ fontSize: 13, color: '#5a6577', margin: 0 }}>Análisis comparativo de ubicaciones para reubicación operativa · Factores hídricos, logísticos y financieros</p>
        </div>

        {loadingDetail || !alerta ? (
          <div style={{ background: '#fde8e8', borderRadius: 12, padding: '20px', marginBottom: 20, height: 80, display: 'flex', alignItems: 'center', color: '#8a93a3' }}>Cargando alerta...</div>
        ) : alerta.estresActual < 45 ? (
          <div style={{ background: '#e3f4ea', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#2ea36b', display: 'grid', placeItems: 'center', color: '#fff' }}>✓</div>
            <div><strong style={{ display: 'block', fontSize: 13.5, color: '#2ea36b' }}>Operación normal en {alerta.nombrePlanta}</strong><span style={{ fontSize: 12, color: '#5a6577' }}>Estrés hídrico actual: {alerta.estresActual}% · Sin riesgo de cierre en los próximos 90 días · Costo apertura referencia: {alerta.costoAperturaStr}</span></div>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}><AlertaBannerHidrico plantaNombre={alerta.nombrePlanta} estresActual={alerta.estresActual} cierreRecomendadoDias={alerta.diasCierreRecomendado <= 0 ? 0 : alerta.diasCierreRecomendado} costoApertura={alerta.costoAperturaStr} costoOperacion={alerta.costoOperacionStr} diasApertura={alerta.diasAperturaStr} /></div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '4fr 3fr', gap: 16, marginBottom: 16 }}>
          {loadingDetail || alternativas?.length === 0 ? <div style={{ background: '#fff', borderRadius: 12, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div> : <MapaAlternativas key={selectedId} plantaActual={selectedPlanta ? { nombre: selectedPlanta.nombre, estado: selectedPlanta.estado } : null} alternativas={alternativas} selectedEstado={selectedAlternativa?.estado ?? null} height={340} onSelectAlternativa={alt => setSelectedAlternativa(alt)} />}
          {loadingDetail || disponibilidadData.length === 0 ? <div style={{ background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando gráfica...</div> : <GraficaDisponibilidadOperativa data={disponibilidadData} inicioDeclive={proyeccion?.startDay ?? 10} cierreForzoso={proyeccion?.peakDay ?? 80} perdidaProyectada={kpis ? formatMXN(kpis.perdidaEconomicaProyectada) : '—'} probEvento={kpis ? `${Math.round(kpis.probabilidadEventoCritico * 100)}%` : '—'} height={280} />}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 20 }}>
          {loadingDetail || alternativas?.length === 0 ? <div style={{ background: '#fff', borderRadius: 12, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando alternativas...</div> : <TablaCostosUbicacion alternativas={alternativas} selectedNombre={selectedAlternativa?.nombre ?? null} onSelectAlternativa={alt => setSelectedAlternativa(alt)} />}
          {loadingDetail || factores?.length === 0 ? <div style={{ background: '#fff', borderRadius: 12, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando factores...</div> : <FactoresClave titulo={selectedPlanta ? `Para ${selectedPlanta.nombre}` : 'Para la ubicación seleccionada'} factores={factores} />}
        </div>

        <div style={{ background: '#eaf1fe', borderRadius: 12, padding: '16px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2563eb', color: '#fff', display: 'grid', placeItems: 'center' }}>📈</div>
            <div><strong style={{ display: 'block', fontSize: 14 }}>¿Necesitas proyectar la recuperación hídrica?</strong><span style={{ fontSize: 12, color: '#5a6577' }}>Consulta la simulación de recuperación con y sin intervención en el módulo de Simulación.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}