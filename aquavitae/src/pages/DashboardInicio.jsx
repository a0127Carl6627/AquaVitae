import React, { useState } from 'react';
import { useDashboard, useAlertas, useEvolucion } from '../hooks/useAquavitaeQueries';
import StatCards from '../stories/StatCards';
import RiskGauge from '../stories/RiskGauge';
import DonutChart from '../stories/DonutChart';
import RiskEvolutionChart from '../stories/RiskEvolutionChart';
import MexicoRiskMap from '../stories/MexicoRiskMap';
import AlertsList from '../stories/AlertsList';
import LastUpdated from '../stories/LastUpdated';
import PlantRiskList from '../stories/PlantRiskList';

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
  const { data: dashboard, isLoading, error, refetch } = useDashboard();
  const { data: alertasRaw } = useAlertas(10);
  const { data: evolucionRaw } = useEvolucion(7);

  if (isLoading) return <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando resumen ejecutivo…</div>;
  if (error) return <div style={{ flex: 1, color: 'red', textAlign: 'center', padding: 20 }}>Error: {error.message}</div>;

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
    <div style={{ flex: 1, backgroundColor: '#f9fafb', padding: '24px 32px', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24, backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px' }}>
          <div><h1 style={{ fontSize: 22, fontWeight: 600 }}>Resumen ejecutivo hídrico</h1><p style={{ fontSize: 13, color: '#6b7280' }}>Visión general del riesgo hídrico y nivel de riesgo de plantas.</p></div>
          <LastUpdated fechaActualizacion={new Date()} onRefresh={refetch} loading={isLoading} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '16px 12px', display: 'flex', justifyContent: 'center' }}>
            <RiskGauge nivel={nivelGeneral} regiones={resumen.alto} />
          </div>
          <StatCards crisisActivas={resumen.crisisActivas} plantasAltoRiesgo={resumen.alto} plantasMedioRiesgo={resumen.medio} plantasBajoRiesgo={resumen.bajo} totalPlantas={totalPlantas} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px' }}>
            <MexicoRiskMap plantas={plantas} height={340} selectedEstado={plantas.find(p => p.idPlanta === selectedId)?.estado ?? null} onSelectPlanta={p => setSelectedId(p.idPlanta)} />
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px' }}>
            <PlantRiskList plants={plantas} selectedId={selectedId} onSelectPlanta={p => setSelectedId(p.idPlanta)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: 16, marginBottom: 20 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px' }}>
            <DonutChart alto={resumen.alto} medio={resumen.medio} bajo={resumen.bajo} />
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: 15, margin: '0 0 2px' }}>Evolución del riesgo hídrico</h3>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 12px' }}>(últimos 7 días)</p>
            <RiskEvolutionChart data={evolucion} />
          </div>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '20px 24px' }}>
            <AlertsList alerts={alertas} />
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div><p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px' }}>Notificaciones activas por correo</p><p style={{ fontSize: 12, color: '#9ca3af' }}>Recibe alertas inmediatas cuando se detecten niveles críticos o riesgo de sequía.</p></div>
        </div>
      </div>
    </div>
  );
}