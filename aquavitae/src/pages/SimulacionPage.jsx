import React, { useState, useEffect } from 'react';
import { useDashboard, useKpis, useProyeccion, useRecuperacion } from '../hooks/useAquavitaeQueries';
import SimulacionKpiCard from '../components/simulacion/SimulacionKpiCard';
import MapaRiesgoHidrico from '../components/maps/MapaRiesgoHidrico';
import GraficaProyeccionHidrica from '../components/charts/GraficaProyeccionHidrica';
import GraficaRecuperacionHidrica from '../components/charts/GraficaRecuperacionHidrica';

const RIESGO_COLOR = { ALTO: '#e23b3b', MEDIO: '#e89923', BAJO: '#2ea36b' };
const RIESGO_BG   = { ALTO: '#fde8e8', MEDIO: '#fdf2dd', BAJO: '#e3f4ea' };

function kpiColor(indice) { if (indice >= 0.70) return 'red'; if (indice >= 0.45) return 'amber'; return 'green'; }
function diasColor(dias) { if (dias <= 14) return 'red'; if (dias <= 30) return 'amber'; return 'blue'; }
function probColor(prob) { if (prob >= 0.70) return 'red'; if (prob >= 0.40) return 'amber'; return 'green'; }
function formatMillon(num) { if (num == null) return '—'; const n = Number(num); if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)} MM`; if (n >= 1_000_000) return `$${Math.round(n / 1_000_000)} M`; return `$${n.toLocaleString('es-MX')}`; }

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

  if (loadingDashboard) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando datos...</div>;
  if (dashboardError) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e23b3b' }}>Error: {dashboardError.message}</div>;

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0' }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>Director · <strong>Simulación y recuperación hídrica</strong></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span>{dateStr} · {timeStr}</span><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)', display: 'grid', placeItems: 'center', color: '#fff' }}>DR</div></div>
      </div>
      <div style={{ padding: '24px 28px 40px', maxWidth: 1440, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22 }}>
          <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#1a2332' }}>Simulación y recuperación hídrica</h1><p style={{ fontSize: 13, color: '#5a6577', margin: 0 }}>Proyección de estrés hídrico y escenarios de recuperación por planta · Bachoco 2026</p></div>
          <div><label style={{ fontSize: 11, color: '#8a93a3' }}>PLANTA</label><select value={selectedId ?? ''} onChange={e => setSelectedId(Number(e.target.value))} style={{ appearance: 'none', background: '#fff', border: '1px solid #d6dde6', borderRadius: 8, padding: '7px 30px 7px 11px', fontSize: 12.5, cursor: 'pointer', minWidth: 200 }}>{plantas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}</select></div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {(loadingDetail || !kpis) ? (
            [...Array(4)].map((_, i) => <div key={i} style={{ background: '#fff', borderRadius: 12, height: 100 }} />)
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <MapaRiesgoHidrico plantas={plantas} height={340} selectedEstado={selectedPlanta?.estado ?? null} onSelectPlanta={p => setSelectedId(p.id)} />
          
          {loadingDetail || !proyeccion ? (
            <div style={{ background: '#fff', borderRadius: 12, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando proyección...</div>
          ) : (
            <GraficaProyeccionHidrica data={proyeccion.data} startDay={proyeccion.startDay} peakDay={proyeccion.peakDay} peakValue={proyeccion.peakValue} height={340} />
          )}

          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px 10px', borderBottom: '1px solid #e6eaf0' }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Plantas monitoreadas</div>
              <div style={{ fontSize: 11.5, color: '#8a93a3' }}>{resumen.alto ?? 0} alto · {resumen.medio ?? 0} medio · {resumen.bajo ?? 0} bajo</div>
            </div>
            <div style={{ overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead>
                  <tr>{['Planta','Estado','Estrés','Riesgo'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 14px', background: '#fafbfc' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {plantas.map(p => {
                    const isSelected = p.id === selectedId;
                    const color = RIESGO_COLOR[p.nivelRiesgo] || '#94a0b3';
                    const bg = RIESGO_BG[p.nivelRiesgo] || '#eef1f5';
                    return (
                      <tr key={p.id} onClick={() => setSelectedId(p.id)} style={{ borderLeft: `3px solid ${isSelected ? '#2563eb' : 'transparent'}`, background: isSelected ? '#eaf1fe' : 'transparent', cursor: 'pointer' }}>
                        <td style={{ padding: '11px 14px', fontWeight: isSelected ? 600 : 400 }}>{p.nombre}</td>
                        <td style={{ padding: '11px 14px', color: '#5a6577' }}>{p.estado}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <div style={{ width: 72, height: 6, background: '#eef1f5', borderRadius: 999, overflow: 'hidden' }}>
                            <div style={{ width: `${p.indice}%`, height: '100%', background: color }} />
                          </div>
                          <span style={{ fontWeight: 600, marginLeft: 8 }}>{p.indice}%</span>
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{ background: bg, color, padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{p.riesgoLabel}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {loadingDetail || !recuperacion ? (
            <div style={{ background: '#fff', borderRadius: 12, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando simulación...</div>
          ) : (
            <GraficaRecuperacionHidrica data={recuperacion} height={340} />
          )}
        </div>

        <div style={{ background: '#eaf1fe', borderRadius: 12, padding: '16px 22px', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#2563eb', color: '#fff', display: 'grid', placeItems: 'center', marginRight: 14 }}>📍</div>
          <div>
            <strong style={{ display: 'block', fontSize: 14 }}>¿Necesitas evaluar ubicaciones alternativas?</strong>
            <span style={{ fontSize: 12, color: '#5a6577' }}>{selectedPlanta ? `${selectedPlanta.nombre} tiene estrés hídrico ${selectedPlanta.riesgoLabel?.toLowerCase()}.` : 'Selecciona una planta para ver su análisis.'} Consulta el análisis de alternativas.</span>
          </div>
        </div>
      </div>
    </div>
  );
}