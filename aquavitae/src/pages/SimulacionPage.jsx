import React, { useState, useEffect } from 'react';
import SimulacionKpiCard from '../stories/SimulacionKpiCard';
import MapaRiesgoHidrico from '../stories/MapaRiesgoHidrico';
import GraficaProyeccionHidrica from '../stories/GraficaProyeccionHidrica';
import GraficaRecuperacionHidrica from '../stories/GraficaRecuperacionHidrica';
import {
  fetchDashboard,
  fetchKpis,
  fetchProyeccion,
  fetchRecuperacion,
} from '../services/aquavitaeApi';

const RIESGO_COLOR = { ALTO: '#e23b3b', MEDIO: '#e89923', BAJO: '#2ea36b' };
const RIESGO_BG   = { ALTO: '#fde8e8', MEDIO: '#fdf2dd', BAJO: '#e3f4ea' };

function kpiColor(indice) {
  if (indice >= 0.70) return 'red';
  if (indice >= 0.45) return 'amber';
  return 'green';
}

function diasColor(dias) {
  if (dias <= 14) return 'red';
  if (dias <= 30) return 'amber';
  return 'blue';
}

function probColor(prob) {
  if (prob >= 0.70) return 'red';
  if (prob >= 0.40) return 'amber';
  return 'green';
}

function formatMillon(num) {
  if (num == null) return '—';
  const n = Number(num);
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)} MM`;
  if (n >= 1_000_000) return `$${Math.round(n / 1_000_000)} M`;
  return `$${n.toLocaleString('es-MX')}`;
}

const WaterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/>
    <path d="M12 9v4M12 17h.01"/>
  </svg>
);
const MoneyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export default function SimulacionPage() {
  const [dashboard, setDashboard] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [kpis, setKpis] = useState(null);
  const [proyeccion, setProyeccion] = useState(null);
  const [recuperacion, setRecuperacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    fetchDashboard()
      .then(data => {
        setDashboard(data);
        const firstHigh = data.plantas.find(p => p.nivelRiesgo === 'ALTO') || data.plantas[0];
        if (firstHigh) setSelectedId(firstHigh.id);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedId == null) return;
    setLoadingDetail(true);
    Promise.all([
      fetchKpis(selectedId),
      fetchProyeccion(selectedId),
      fetchRecuperacion(selectedId),
    ])
      .then(([k, p, r]) => {
        setKpis(k);
        setProyeccion(p);
        setRecuperacion(r);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingDetail(false));
  }, [selectedId]);

  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a6577', fontSize: 14 }}>
        Cargando datos...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e23b3b', fontSize: 14 }}>
        Error: {error}. ¿El backend está corriendo en puerto 8080?
      </div>
    );
  }

  const { plantas = [], resumen = {} } = dashboard || {};
  const selectedPlanta = plantas.find(p => p.id === selectedId);

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>

      {/* Topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>
          Director · <strong style={{ color: '#1a2332', fontWeight: 600 }}>Simulación y recuperación hídrica</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#5a6577' }}>
          <span>{dateStr} · {timeStr}</span>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)',
            display: 'grid', placeItems: 'center', color: '#fff', fontSize: 12, fontWeight: 600,
          }}>DR</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 40px', maxWidth: 1440, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Page header + plant selector */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.01em', margin: '0 0 4px', color: '#1a2332' }}>
              Simulación y recuperación hídrica
            </h1>
            <p style={{ fontSize: 13, color: '#5a6577', margin: 0 }}>
              Proyección de estrés hídrico y escenarios de recuperación por planta · Bachoco 2026
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0 }}>
            <label style={{ fontSize: 11, fontWeight: 500, color: '#8a93a3', letterSpacing: '.02em' }}>PLANTA</label>
            <select
              value={selectedId ?? ''}
              onChange={e => setSelectedId(Number(e.target.value))}
              style={{
                appearance: 'none', WebkitAppearance: 'none',
                background: '#fff', border: '1px solid #d6dde6',
                borderRadius: 8, padding: '7px 30px 7px 11px',
                fontSize: 12.5, color: '#1a2332', fontFamily: 'inherit',
                cursor: 'pointer', minWidth: 200,
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M2 4l3 3 3-3' stroke='%235a6577' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
              }}
            >
              {plantas.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 20 }}>
          {loadingDetail || !kpis ? (
            [0,1,2,3].map(i => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, padding: '18px 20px', height: 100, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))
          ) : (
            <>
              <SimulacionKpiCard
                label="Índice hídrico actual"
                value={`${Math.round(kpis.indiceHidricoActual * 100)}%`}
                sublabel="Nivel de estrés"
                color={kpiColor(kpis.indiceHidricoActual)}
                icon={<WaterIcon />}
              />
              <SimulacionKpiCard
                label="Días hasta umbral crítico"
                value={
                  kpis.diasHastaUmbralCritico < 0 ? '+90 días' :
                  kpis.diasHastaUmbralCritico === 0 ? 'Ya crítico' :
                  String(kpis.diasHastaUmbralCritico)
                }
                sublabel="Sin intervención"
                color={
                  kpis.diasHastaUmbralCritico === 0 ? 'red' :
                  kpis.diasHastaUmbralCritico < 0 ? 'green' :
                  diasColor(kpis.diasHastaUmbralCritico)
                }
                icon={<ClockIcon />}
              />
              <SimulacionKpiCard
                label="Probabilidad evento crítico"
                value={`${Math.round(kpis.probabilidadEventoCritico * 100)}%`}
                sublabel="Próximos 90 días"
                color={probColor(kpis.probabilidadEventoCritico)}
                icon={<AlertIcon />}
              />
              <SimulacionKpiCard
                label="Pérdida económica proyectada"
                value={formatMillon(kpis.perdidaEconomicaProyectada)}
                sublabel="Estimado 90 días MXN"
                color="blue"
                icon={<MoneyIcon />}
              />
            </>
          )}
        </div>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>

          {/* Mapa de riesgo */}
          <MapaRiesgoHidrico
            plantas={plantas}
            height={340}
            selectedEstado={selectedPlanta?.estado ?? null}
            onSelectPlanta={p => setSelectedId(p.id ?? selectedId)}
          />

          {/* Gráfica proyección */}
          {loadingDetail || !proyeccion ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando proyección...
            </div>
          ) : (
            <GraficaProyeccionHidrica
              data={proyeccion.data}
              startDay={proyeccion.startDay}
              peakDay={proyeccion.peakDay}
              peakValue={proyeccion.peakValue}
              height={340}
            />
          )}

          {/* Tabla de plantas */}
          <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px 18px 10px', borderBottom: '1px solid #e6eaf0' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1a2332' }}>Plantas monitoreadas</div>
              <div style={{ fontSize: 11.5, color: '#8a93a3', marginTop: 2 }}>
                {resumen.alto ?? 0} alto · {resumen.medio ?? 0} medio · {resumen.bajo ?? 0} bajo
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead>
                  <tr>
                    {['Planta', 'Estado', 'Estrés', 'Riesgo'].map(h => (
                      <th key={h} style={{
                        textAlign: 'left', fontWeight: 500, color: '#8a93a3',
                        fontSize: 11, letterSpacing: '.03em', textTransform: 'uppercase',
                        padding: '10px 14px', background: '#fafbfc',
                        borderBottom: '1px solid #e6eaf0', whiteSpace: 'nowrap',
                        position: 'sticky', top: 0,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plantas.map(p => {
                    const isSelected = p.id === selectedId;
                    const color = RIESGO_COLOR[p.nivelRiesgo] || '#94a0b3';
                    const bg = RIESGO_BG[p.nivelRiesgo] || '#eef1f5';
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        style={{
                          borderBottom: '1px solid #e6eaf0',
                          borderLeft: `3px solid ${isSelected ? '#2563eb' : 'transparent'}`,
                          background: isSelected ? '#eaf1fe' : 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        <td style={{ padding: '11px 14px', color: '#1a2332', fontWeight: isSelected ? 600 : 400 }}>
                          {p.nombre}
                        </td>
                        <td style={{ padding: '11px 14px', color: '#5a6577' }}>{p.estado}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 72, height: 6, background: '#eef1f5', borderRadius: 999, overflow: 'hidden' }}>
                              <div style={{ width: `${p.indice}%`, height: '100%', background: color, borderRadius: 999 }} />
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 12, color: '#1a2332', minWidth: 30 }}>{p.indice}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            padding: '3px 9px', borderRadius: 999,
                            fontSize: 11, fontWeight: 600,
                            background: bg, color,
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                            {p.riesgoLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gráfica recuperación */}
          {loadingDetail || !recuperacion ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando simulación...
            </div>
          ) : (
            <GraficaRecuperacionHidrica
              data={recuperacion}
              height={340}
            />
          )}
        </div>

        {/* Banner */}
        <div style={{
          background: '#eaf1fe', border: '1px solid #c9dcfb', borderRadius: 12,
          padding: '16px 22px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: '#2563eb',
              color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1a2332', marginBottom: 2 }}>
                ¿Necesitas evaluar ubicaciones alternativas?
              </strong>
              <span style={{ fontSize: 12, color: '#5a6577' }}>
                {selectedPlanta ? `${selectedPlanta.nombre} tiene estrés hídrico ${selectedPlanta.riesgoLabel?.toLowerCase()}.` : 'Selecciona una planta para ver su análisis.'} Consulta el análisis de alternativas.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
