import React, { useState, useEffect, useCallback } from 'react';

import StatCards          from '../stories/StatCards';
import RiskGauge          from '../stories/RiskGauge';
import SimulacionKpiCard  from '../stories/SimulacionKpiCard';
import DonutChart         from '../stories/DonutChart';
import RiskEvolutionChart from '../stories/RiskEvolutionChart';
import MexicoRiskMap      from '../stories/MexicoRiskMap';
import AlertsList         from '../stories/AlertsList';
import LastUpdated        from '../stories/LastUpdated';
import PlantRiskList      from '../stories/PlantRiskList';  // ← Importa el nuevo componente

// ─── Conexión al back ────────────────────────────────────────────────────────
const BASE = process.env.REACT_APP_API_BASE || '';

// ─── Mapeos de presentación ──────────────────────────────────────────────────
const NIVEL_COLOR     = { ALTO: '#ef4444', MEDIO: '#f97316', BAJO: '#22c55e', SIN_RIESGO: '#22c55e' };
const NIVEL_LABEL     = { ALTO: 'Alto',    MEDIO: 'Medio',   BAJO: 'Bajo',    SIN_RIESGO: 'Sin riesgo' };
const TENDENCIA_COLOR = { BAJANDO: '#ef4444', ESTABLE: '#9ca3af', SUBIENDO: '#22c55e' };

// ─── Helpers de fecha ────────────────────────────────────────────────────────
function formatHora(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d)) return '';
  let h = d.getHours();
  const m  = String(d.getMinutes()).padStart(2, '0');
  const ap = h >= 12 ? 'p.m.' : 'a.m.';
  h = h % 12 || 12;
  return `${h}:${m} ${ap}`;
}

function formatFechaCorta(value) {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(String(value).includes('T') ? value : `${value}T12:00:00`);
  if (isNaN(d)) return '';
  const dia = d.getDate();
  const mes = d.toLocaleString('es-MX', { month: 'short' })
    .replace('.', '')
    .replace(/^\w/, c => c.toUpperCase());
  return `${dia} ${mes}`;
}

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', gap: 12, fontFamily: 'Inter, sans-serif',
    }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
        style={{ animation: 'spin 1s linear infinite' }}>
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
      </svg>
      <p style={{ color: '#6b7280', fontSize: 14, margin: 0 }}>
        Cargando resumen ejecutivo…
      </p>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Dashboard principal ─────────────────────────────────────────────────────
export default function DashboardInicio() {

  const [plantas,    setPlantas]    = useState([]);
  const [resumen,    setResumen]    = useState(null);
  const [alertas,    setAlertas]    = useState([]);
  const [evolucion,  setEvolucion]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error,      setError]      = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);

    try {
      const [dashRes, alertasRes, evolucionRes] = await Promise.all([
        fetch(`${BASE}/api/dashboard`),
        fetch(`${BASE}/api/alertas?limit=10`),
        fetch(`${BASE}/api/evolucion?dias=7`),
      ]);

      if (!dashRes.ok)      throw new Error(`Dashboard: ${dashRes.status}`);
      if (!alertasRes.ok)   throw new Error(`Alertas: ${alertasRes.status}`);
      if (!evolucionRes.ok) throw new Error(`Evolución: ${evolucionRes.status}`);

      const dashData      = await dashRes.json();
      const alertasData   = await alertasRes.json();
      const evolucionData = await evolucionRes.json();

      // Plantas
      const plantasTransformadas = (dashData.plantas || []).map(p => {
        const partes = (p.ubicacionNombre ?? '').split(',');
        const estado = partes.length > 1 ? partes[partes.length - 1].trim() : p.ubicacionNombre ?? '';
        const nv = p.nivelRiesgo ?? '';
        return {
          idPlanta:        p.idPlanta,
          nombrePlanta:    p.nombrePlanta,
          nombre:          p.nombrePlanta,
          ubicacionNombre: p.ubicacionNombre,
          estado,
          latitud:         p.latitud,
          longitud:        p.longitud,
          nivelRiesgo:     nv,
          riesgo:          nv.toLowerCase() === 'alto' ? 'alta' : nv.toLowerCase() || 'bajo',
          riesgoLabel:     nv ? nv.charAt(0).toUpperCase() + nv.slice(1).toLowerCase() : 'Sin datos',
          tendencia:       p.tendencia ?? 'ESTABLE',
          indiceHidrico:   p.indiceHidrico,
          indiceHidricoPct: Math.round((p.indiceHidrico ?? 0) * 100),
        };
      });
      if (plantasTransformadas.length > 0) {
        setSelectedId(plantasTransformadas[0].idPlanta);
      }

      // Resumen
      const resumenBack = dashData.resumen ?? {};
      const altoCount   = Number(resumenBack.alto  ?? 0);
      const medioCount  = Number(resumenBack.medio ?? 0);
      const bajoCount   = Number(resumenBack.bajo  ?? 0);

      const resumenTransformado = {
        alto:          altoCount,
        medio:         medioCount,
        bajo:          bajoCount,
        crisisActivas: altoCount,
        totalPlantas:  altoCount + medioCount + bajoCount,
      };

      // Alertas
      const alertasTransformadas = (alertasData || []).map(a => ({
        id:          a.id,
        tipo:        a.tipo,
        titulo:      a.titulo,
        descripcion: a.descripcion,
        hora:        formatHora(a.fecha),
        fecha:       a.fecha, // para ordenar
      }));

      // Evolución
      const puntos = Array.isArray(evolucionData)
        ? evolucionData
        : (evolucionData?.puntos ?? []);

      const evolucionTransformada = puntos.map(p => ({
        fecha: formatFechaCorta(p.fecha),
        valorPromedio: parseFloat(((p.valorPromedio ?? 0) * 100).toFixed(1)),
      }));

      setPlantas(plantasTransformadas);
      setResumen(resumenTransformado);
      setAlertas(alertasTransformadas);
      setEvolucion(evolucionTransformada);

    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message ?? 'No se pudo cargar el dashboard.');
    } finally {
      setLastUpdate(new Date());
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(false); }, [fetchData]);

  const totalPlantas = resumen?.totalPlantas ?? 0;

  const nivelGeneral = !resumen || totalPlantas === 0
    ? 'bajo'
    : resumen.alto > 0
    ? 'alto'
    : resumen.medio > 0
    ? 'medio'
    : 'bajo';

  if (loading) return <LoadingScreen />;

  return (
    <div style={{
      flex: 1,
      backgroundColor: '#f9fafb',
      padding: '24px 32px',
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      boxSizing: 'border-box',
    }}>
      <style>{`
        .dash-gauge-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 16px;
          margin-bottom: 20px;
          align-items: center;
        }
        .dash-map-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .dash-bottom-row {
          display: grid;
          grid-template-columns: 260px 1fr 300px;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 1100px) {
          .dash-bottom-row { grid-template-columns: 1fr 1fr; }
          .dash-bottom-row > *:last-child { grid-column: 1 / -1; }
        }
        @media (max-width: 900px) {
          .dash-gauge-row, .dash-map-row, .dash-bottom-row {
            grid-template-columns: 1fr !important;
          }
          .dash-bottom-row > *:last-child { grid-column: auto; }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
          marginBottom: 24, backgroundColor: '#ffffff',
          borderRadius: 12, padding: '20px 24px', border: '1px solid #f3f4f6',
        }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: '#111827', margin: 0 }}>
              Resumen ejecutivo hídrico
            </h1>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>
              Visión general del riesgo hídrico y nivel de riesgo de plantas.
            </p>
          </div>
          <LastUpdated
            fechaActualizacion={lastUpdate}
            onRefresh={() => fetchData(true)}
            loading={refreshing}
          />
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            padding: '12px 16px', backgroundColor: '#fee2e2',
            borderLeft: '4px solid #ef4444', borderRadius: 6,
            marginBottom: 20, color: '#991b1b', fontSize: 13,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>⚠ {error}</span>
            <button onClick={() => fetchData(false)} style={{
              background: '#ef4444', color: 'white', border: 'none',
              borderRadius: 5, padding: '4px 12px', fontSize: 12,
              cursor: 'pointer', marginLeft: 12,
            }}>
              Reintentar
            </button>
          </div>
        )}

        {/* Gauge + StatCards */}
        <div className="dash-gauge-row">
          <div style={{ ...card, padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiskGauge
              nivel={nivelGeneral}
              regiones={resumen?.alto ?? 0}
            />
          </div>
          <StatCards
            crisisActivas={resumen?.crisisActivas   ?? 0}
            plantasAltoRiesgo={resumen?.alto        ?? 0}
            plantasMedioRiesgo={resumen?.medio      ?? 0}
            plantasBajoRiesgo={resumen?.bajo        ?? 0}
            totalPlantas={totalPlantas}
          />
        </div>

        {/* Map + PlantRiskList */}
        <div className="dash-map-row">
          <div style={card}>
            <MexicoRiskMap
              plantas={plantas}
              height={340}
              selectedEstado={plantas.find(p => p.idPlanta === selectedId)?.estado ?? null}
              onSelectPlanta={p => setSelectedId(p.idPlanta)}
            />
          </div>
          <div style={card}>
            <PlantRiskList
              plants={plantas}
              selectedId={selectedId}
              onSelectPlanta={p => setSelectedId(p.idPlanta)}
            />
          </div>
        </div>

        {/* Donut + Evolution + Alerts */}
        <div className="dash-bottom-row">
          <div style={card}>
            <DonutChart
              alto={resumen?.alto  ?? 0}
              medio={resumen?.medio ?? 0}
              bajo={resumen?.bajo  ?? 0}
            />
          </div>

          <div style={{ ...card, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 2px' }}>
              Evolución del riesgo hídrico
            </h3>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 12px' }}>
              (últimos 7 días)
            </p>
            <div style={{ flex: 1 }}>
              <RiskEvolutionChart data={evolucion} />
            </div>
          </div>

          <div style={card}>
            <AlertsList alerts={alertas} />
          </div>
        </div>

        {/* Email notifications footer */}
        <div style={{
          backgroundColor: '#ffffff', borderRadius: 12,
          padding: '14px 20px', border: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#eff6ff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#3b82f6', margin: '0 0 2px' }}>
              Notificaciones activas por correo
            </p>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>
              Recibe alertas inmediatas cuando se detecten niveles críticos o riesgo de sequía.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const card = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: '20px 24px',
  border: '1px solid #f3f4f6',
};