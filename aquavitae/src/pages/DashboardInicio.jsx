import React, { useState, useEffect, useCallback } from 'react';

import StatCards          from '../stories/StatCards';
import RiskGauge          from '../stories/RiskGauge';
import DonutChart         from '../stories/DonutChart';
import RiskEvolutionChart from '../stories/RiskEvolutionChart';
import MexicoRiskMap      from '../stories/MexicoRiskMap';
import AlertsList         from '../stories/AlertsList';
import LastUpdated        from '../stories/LastUpdated';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
const NIVEL_COLOR     = { ALTO: '#ef4444', MEDIO: '#f97316', BAJO: '#22c55e', SIN_RIESGO: '#22c55e' };
const NIVEL_LABEL     = { ALTO: 'Alto', MEDIO: 'Medio', BAJO: 'Bajo', SIN_RIESGO: 'Sin riesgo' };
const TENDENCIA_ICON  = { BAJANDO: '↘', ESTABLE: '→', SUBIENDO: '↗' };
const TENDENCIA_COLOR = { BAJANDO: '#ef4444', ESTABLE: '#9ca3af', SUBIENDO: '#22c55e' };

function PlantTable({ plantas }) {
  return (
    <div>
      <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 14px' }}>
        Plantas por nivel de riesgo
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Planta', 'Ubicación', 'Nivel de riesgo', 'Tendencia', 'Nivel actual'].map(h => (
                <th key={h} style={{
                  padding: '8px 10px', fontWeight: 500,
                  color: '#6b7280', textAlign: 'left', whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plantas.map((p) => {
              const color = NIVEL_COLOR[p.nivelRiesgo] ?? '#6b7280';
              const tend  = p.tendencia ?? 'ESTABLE';
              const pct   = p.indiceHidricoPct ?? Math.round((p.indiceHidrico ?? 0) * 100);
              return (
                <tr key={p.idPlanta} style={{ borderBottom: '1px solid #f9fafb' }}>
                  <td style={{ padding: '9px 10px', fontWeight: 500, color: '#111827' }}>
                    {p.nombrePlanta}
                  </td>
                  <td style={{ padding: '9px 10px', color: '#6b7280' }}>
                    {p.ubicacionNombre}
                  </td>
                  <td style={{ padding: '9px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: color, flexShrink: 0,
                      }} />
                      <span style={{ color, fontWeight: 500 }}>
                        {NIVEL_LABEL[p.nivelRiesgo] ?? p.nivelRiesgo}
                      </span>
                    </div>
                  </td>
                  <td style={{
                    padding: '9px 10px', fontSize: 16,
                    color: TENDENCIA_COLOR[tend] ?? '#9ca3af',
                  }}>
                    {TENDENCIA_ICON[tend] ?? '→'}
                  </td>
                  <td style={{ padding: '9px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1, height: 6, background: '#f3f4f6',
                        borderRadius: 99, overflow: 'hidden', minWidth: 70,
                      }}>
                        <div style={{
                          height: '100%', width: `${pct}%`,
                          background: color, borderRadius: 99,
                          transition: 'width 0.4s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: 12, color: '#6b7280', minWidth: 28, textAlign: 'right' }}>
                        {pct}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
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

export default function DashboardInicio() {

  const [plantas,    setPlantas]    = useState([]);
  const [resumen,    setResumen]    = useState(null);
  const [alertas,    setAlertas]    = useState([]);
  const [evolucion,  setEvolucion]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error,      setError]      = useState(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);

    try {
      const [dashRes, alertasRes, evolucionRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`),
        fetch(`${API_BASE}/api/alertas?limit=10`),
        fetch(`${API_BASE}/api/evolucion?dias=7`),
      ]);

      if (!dashRes.ok)      throw new Error(`Dashboard: ${dashRes.status}`);
      if (!alertasRes.ok)   throw new Error(`Alertas: ${alertasRes.status}`);
      if (!evolucionRes.ok) throw new Error(`Evolución: ${evolucionRes.status}`);

      const dashData      = await dashRes.json();
      const alertasData   = await alertasRes.json();
      const evolucionData = await evolucionRes.json();

      const plantasTransformadas = (dashData.plantas || []).map(p => ({
        idPlanta:         p.idPlanta,
        nombrePlanta:     p.nombrePlanta,
        ubicacionNombre:  p.ubicacionNombre,
        latitud:          p.latitud,
        longitud:         p.longitud,
        nivelRiesgo:      p.nivelRiesgo,
        tendencia:        p.tendencia,
        indiceHidricoPct: p.indiceHidricoPct,
        indiceHidrico:    (p.indiceHidricoPct ?? 0) / 100,
      }));

      const resumenTransformado = {
        alto:          dashData.plantasAltoRiesgo  ?? 0,
        medio:         dashData.plantasMedioRiesgo ?? 0,
        bajo:          dashData.plantasBajoRiesgo  ?? 0,
        crisisActivas: dashData.crisisActivas       ?? 0,
        totalPlantas:  dashData.totalPlantas        ?? plantasTransformadas.length,
      };

      const alertasTransformadas = (alertasData || []).map(a => ({
        id:          a.id,
        tipo:        a.tipo,
        titulo:      a.titulo,
        descripcion: a.descripcion,
        hora:        formatHora(a.fecha),
      }));

      const evolucionTransformada = (evolucionData || []).map(p => ({
        fecha:         formatFechaCorta(p.fecha),
        valorPromedio: p.valorPromedio,
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

  const totalPlantas = resumen ? resumen.alto + resumen.medio + resumen.bajo : 0;

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
        /*
         * dash-gauge-row: RiskGauge (columna fija ~220px) + StatCards (resto del espacio).
         * align-items: center alinea verticalmente el gauge con el bloque de 4 cards,
         * logrando que visualmente queden a la misma altura como en el diseño de referencia.
         */
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
          .dash-bottom-row {
            grid-template-columns: 1fr 1fr;
          }
          .dash-bottom-row > *:last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 900px) {
          .dash-gauge-row,
          .dash-map-row,
          .dash-bottom-row {
            grid-template-columns: 1fr !important;
          }
          .dash-bottom-row > *:last-child {
            grid-column: auto;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24,
          backgroundColor: '#ffffff',
          borderRadius: 12,
          padding: '20px 24px',
          border: '1px solid #f3f4f6',
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

        {/* ── Error banner ── */}
        {error && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fee2e2',
            borderLeft: '4px solid #ef4444',
            borderRadius: 6,
            marginBottom: 20,
            color: '#991b1b',
            fontSize: 13,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>{error}</span>
            <button
              onClick={() => fetchData(false)}
              style={{
                background: '#ef4444', color: 'white', border: 'none',
                borderRadius: 5, padding: '4px 12px', fontSize: 12,
                cursor: 'pointer', marginLeft: 12,
              }}
            >
              Reintentar
            </button>
          </div>
        )}

        {/* ── Gauge + StatCards ── */}
        <div className="dash-gauge-row">
          <div style={{ ...card, padding: '16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RiskGauge
              nivel={nivelGeneral}
              regiones={resumen?.crisisActivas ?? 0}
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

        {/* ── Map + Plant Table ── */}
        <div className="dash-map-row">
          <div style={card}>
            <MexicoRiskMap plantas={plantas} altura="340px" />
          </div>
          <div style={card}>
            <PlantTable plantas={plantas} />
          </div>
        </div>

        {/* ── Donut + Evolution + Alerts ── */}
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

        {/* ── Email notifications footer ── */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 12,
          padding: '14px 20px',
          border: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
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

function formatFechaCorta(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d)) return '';
  const dia = d.getDate();
  const mes = d.toLocaleString('es-MX', { month: 'short' })
    .replace('.', '')
    .replace(/^\w/, c => c.toUpperCase());
  return `${dia} ${mes}`;
}

const card = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: '20px 24px',
  border: '1px solid #f3f4f6',
};