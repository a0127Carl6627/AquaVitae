import React, { useState, useEffect } from 'react';
import AlertaBannerHidrico from '../stories/AlertaBannerHidrico';
import MapaAlternativas from '../stories/MapaAlternativas';
import GraficaDisponibilidadOperativa from '../stories/GraficaDisponibilidadOperativa';
import TablaCostosUbicacion from '../stories/TablaCostosUbicacion';
import FactoresClave from '../stories/FactoresClave';
import {
  fetchDashboard,
  fetchAlerta,
  fetchAlternativas,
  fetchFactores,
  fetchProyeccion,
  fetchKpis,
  formatMXN,
} from '../services/aquavitaeApi';

export default function AlternativasPage() {
  const [plantas, setPlantas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [alternativas, setAlternativas] = useState([]);
  const [factores, setFactores] = useState([]);
  const [selectedAlternativa, setSelectedAlternativa] = useState(null);
  const [disponibilidadData, setDisponibilidadData] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [proyeccion, setProyeccion] = useState(null);
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
        setPlantas(data.plantas);
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
      fetchAlerta(selectedId),
      fetchAlternativas(selectedId),
      fetchFactores(selectedId),
      fetchProyeccion(selectedId),
      fetchKpis(selectedId),
    ])
      .then(([al, alts, facs, proy, k]) => {
        setAlerta(al);
        setAlternativas(alts);
        setSelectedAlternativa(null);
        setFactores(facs);
        setProyeccion(proy);
        setKpis(k);

        // Disponibilidad = inversión del estrés (100 - estrés%)
        const dispData = proy.data.map(p => ({
          dia: p.dia,
          valor: parseFloat((100 - p.valor).toFixed(1)),
          bandaSup: p.bandaInf != null ? parseFloat((100 - p.bandaInf).toFixed(1)) : null,
          bandaInf: p.bandaSup != null ? parseFloat((100 - p.bandaSup).toFixed(1)) : null,
        }));
        setDisponibilidadData(dispData);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoadingDetail(false));
  }, [selectedId]);

  const timeStr = now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  const selectedPlanta = plantas.find(p => p.id === selectedId);

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

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#f5f7fa' }}>

      {/* Topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e6eaf0', flexShrink: 0,
      }}>
        <div style={{ fontSize: 12, color: '#8a93a3' }}>
          Director · <strong style={{ color: '#1a2332', fontWeight: 600 }}>Alternativas de ubicación</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Plant selector */}
          <select
            value={selectedId ?? ''}
            onChange={e => setSelectedId(Number(e.target.value))}
            style={{
              appearance: 'none', WebkitAppearance: 'none',
              background: '#fff', border: '1px solid #d6dde6',
              borderRadius: 8, padding: '6px 28px 6px 10px',
              fontSize: 12, color: '#1a2332', fontFamily: 'inherit',
              cursor: 'pointer', minWidth: 180,
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M2 4l3 3 3-3' stroke='%235a6577' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 9px center',
            }}
          >
            {plantas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          <span style={{ fontSize: 12, color: '#5a6577' }}>{dateStr} · {timeStr}</span>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(140deg,#c5d4e3,#8a9bb0)',
            display: 'grid', placeItems: 'center', color: '#fff', fontSize: 12, fontWeight: 600,
          }}>DR</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 40px', maxWidth: 1440, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Page header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-.01em', margin: '0 0 4px', color: '#1a2332' }}>
            Alternativas de ubicación
          </h1>
          <p style={{ fontSize: 13, color: '#5a6577', margin: 0 }}>
            Análisis comparativo de ubicaciones para reubicación operativa · Factores hídricos, logísticos y financieros
          </p>
        </div>

        {/* Alert banner */}
        {loadingDetail || !alerta ? (
          <div style={{ background: '#fde8e8', border: '1px solid rgba(226,59,59,.22)', borderRadius: 12, padding: '20px', marginBottom: 20, height: 80, display: 'flex', alignItems: 'center', color: '#8a93a3', fontSize: 13 }}>
            Cargando alerta...
          </div>
        ) : alerta.estresActual < 45 ? (
          <div style={{
            background: '#e3f4ea', border: '1px solid rgba(46,163,107,.22)', borderRadius: 12,
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
            marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#2ea36b', display: 'grid', placeItems: 'center', color: '#fff', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: '#2ea36b', marginBottom: 3 }}>
                Operación normal en {alerta.nombrePlanta}
              </strong>
              <span style={{ fontSize: 12, color: '#5a6577' }}>
                Estrés hídrico actual: {alerta.estresActual}% · Sin riesgo de cierre en los próximos 90 días · Costo apertura referencia: {alerta.costoAperturaStr}
              </span>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            <AlertaBannerHidrico
              plantaNombre={alerta.nombrePlanta}
              estresActual={alerta.estresActual}
              cierreRecomendadoDias={alerta.diasCierreRecomendado <= 0 ? 0 : alerta.diasCierreRecomendado}
              costoApertura={alerta.costoAperturaStr}
              costoOperacion={alerta.costoOperacionStr}
              diasApertura={alerta.diasAperturaStr}
            />
          </div>
        )}

        {/* Main grid: map + chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 3fr', gap: 16, marginBottom: 16 }}>
          {loadingDetail || alternativas.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando mapa...
            </div>
          ) : (
            <MapaAlternativas
              key={selectedId}
              plantaActual={selectedPlanta ? {
                nombre: selectedPlanta.nombre,
                estado: selectedPlanta.estado,
              } : null}
              alternativas={alternativas}
              selectedEstado={selectedAlternativa?.estado ?? null}
              height={340}
              onSelectAlternativa={alt => setSelectedAlternativa(alt)}
            />
          )}

          {loadingDetail || disponibilidadData.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando gráfica...
            </div>
          ) : (
            <GraficaDisponibilidadOperativa
              data={disponibilidadData}
              inicioDeclive={proyeccion?.startDay ?? 10}
              cierreForzoso={proyeccion?.peakDay ?? 80}
              perdidaProyectada={kpis ? formatMXN(kpis.perdidaEconomicaProyectada) : '—'}
              probEvento={kpis ? `${Math.round(kpis.probabilidadEventoCritico * 100)}%` : '—'}
              height={280}
            />
          )}
        </div>

        {/* Bottom grid: tabla + factores */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginBottom: 20 }}>
          {loadingDetail || alternativas.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando alternativas...
            </div>
          ) : (
            <TablaCostosUbicacion
              alternativas={alternativas}
              selectedNombre={selectedAlternativa?.nombre ?? null}
              onSelectAlternativa={alt => setSelectedAlternativa(alt)}
            />
          )}

          {loadingDetail || factores.length === 0 ? (
            <div style={{ background: '#fff', border: '1px solid #e6eaf0', borderRadius: 12, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a93a3', fontSize: 13 }}>
              Cargando factores...
            </div>
          ) : (
            <FactoresClave
              titulo={selectedPlanta ? `Para ${selectedPlanta.nombre}` : 'Para la ubicación seleccionada'}
              factores={factores}
            />
          )}
        </div>

        {/* Bottom banner */}
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
                <path d="M3 17l5-5 4 4 8-9"/><path d="M14 7h6v6"/>
              </svg>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#1a2332', marginBottom: 2 }}>
                ¿Necesitas proyectar la recuperación hídrica?
              </strong>
              <span style={{ fontSize: 12, color: '#5a6577' }}>
                Consulta la simulación de recuperación con y sin intervención en el módulo de Simulación.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
