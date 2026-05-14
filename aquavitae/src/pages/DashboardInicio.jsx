import React, { useState, useEffect } from 'react';
import StatCards from '../stories/StatCards';
import RiskGauge from '../stories/RiskGauge';
import DonutChart from '../stories/DonutChart';
import RiskEvolutionChart from '../stories/RiskEvolutionChart';
import MexicoRiskMap from '../stories/MexicoRiskMap';
import PlantRiskList from '../stories/PlantRiskList';
import AlertsList from '../stories/AlertsList';
import LastUpdated from '../stories/LastUpdated';
import Navbar from '../components/Navbar';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

export default function DashboardInicio() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [alertas, setAlertas] = useState([]);
  const [evolucion, setEvolucion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [error, setError] = useState(null);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      setError(null);

      const [dashboardRes, alertasRes, evolucionRes] = await Promise.all([
        fetch(`${API_BASE}/api/dashboard`),
        fetch(`${API_BASE}/api/alertas?limit=10`),
        fetch(`${API_BASE}/api/evolucion?dias=7`),
      ]);

      if (!dashboardRes.ok || !alertasRes.ok || !evolucionRes.ok) {
        throw new Error('Error fetching dashboard data');
      }

      const dashboardData = await dashboardRes.json();
      const alertasData = await alertasRes.json();
      const evolucionData = await evolucionRes.json();

      setDashboard(dashboardData);
      setAlertas(alertasData);
      setEvolucion(evolucionData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('No se pudo cargar los datos del dashboard');
      setDashboard({
        plantas: [],
        resumen: { alto: 2, medio: 4, bajo: 6 },
      });
      setEvolucion({ puntos: [] });
      setAlertas([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#6b7280',
      }}>
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  const transformedAlerts = (alertas || []).map((alert) => ({
    id: alert.id,
    tipo: alert.tipo === 'CRÍTICO' ? 'CRÍTICO' : alert.tipo === 'ADVERTENCIA' ? 'ADVERTENCIA' : 'INFORMATIVO',
    titulo: alert.titulo,
    descripcion: alert.descripcion,
    hora: new Date(alert.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
  }));

  const transformedEvolution = (evolucion?.puntos || []).map((punto) => ({
    fecha: new Date(punto.fecha).toLocaleDateString('es-MX'),
    valorPromedio: punto.valorPromedio,
  }));

  const transformedPlantas = (dashboard?.plantas || []).map((planta) => ({
    idPlanta: planta.idPlanta,
    nombrePlanta: planta.nombrePlanta,
    ubicacionNombre: planta.ubicacionNombre,
    nivelRiesgo: planta.nivelRiesgo,
    indiceHidrico: planta.indiceHidrico,
    latitud: planta.latitud,
    longitud: planta.longitud,
  }));

  const resumen = dashboard?.resumen || { alto: 0, medio: 0, bajo: 0 };
  const totalPlantas = resumen.alto + resumen.medio + resumen.bajo;

  let nivelRiesgoGeneral = 'bajo';
  if (resumen.alto > 0) nivelRiesgoGeneral = 'alto';
  else if (resumen.medio > 0) nivelRiesgoGeneral = 'medio';

  const crisisCount = transformedAlerts.filter((a) => a.tipo === 'CRÍTICO').length;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar isExpanded={isNavExpanded} onToggle={() => setIsNavExpanded(!isNavExpanded)} />
      <div style={{
        flex: 1,
        marginLeft: isNavExpanded ? '210px' : '70px',
        transition: 'margin-left 0.3s ease',
        backgroundColor: '#f9fafb',
        padding: '32px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '20px 24px',
            border: '1px solid #f3f4f6',
          }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 600, color: '#111827', margin: 0 }}>
                Resumen ejecutivo hídrico
              </h1>
              <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>
                Visión general del riesgo hídrico y nivel de riesgo de plantas.
              </p>
            </div>
            <LastUpdated fechaActualizacion={lastUpdate} onRefresh={() => fetchData(true)} loading={refreshing} />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fee2e2',
              borderLeft: '4px solid #ef4444',
              borderRadius: 6,
              marginBottom: '24px',
              color: '#991b1b',
              fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #f3f4f6',
          }}>
            <RiskGauge nivel={nivelRiesgoGeneral} regiones={totalPlantas > 0 ? 1 : 0} />
          </div>

          <div style={{
            marginBottom: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #f3f4f6',
          }}>
            <StatCards
              crisisActivas={crisisCount}
              plantasAltoRiesgo={resumen.alto}
              plantasMedioRiesgo={resumen.medio}
              plantasBajoRiesgo={resumen.bajo}
              totalPlantas={totalPlantas}
            />
          </div>

          <div style={{
            marginBottom: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #f3f4f6',
          }}>
            <MexicoRiskMap plantas={transformedPlantas} altura="400px" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            marginBottom: '32px',
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: '24px',
              border: '1px solid #f3f4f6',
            }}>
              <DonutChart alto={resumen.alto} medio={resumen.medio} bajo={resumen.bajo} />
            </div>

            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: '24px',
              border: '1px solid #f3f4f6',
            }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 16px' }}>
                Evolución del riesgo hídrico (Últimos 7 días)
              </h3>
              <RiskEvolutionChart data={transformedEvolution} />
            </div>
          </div>

          <div style={{
            marginBottom: '32px',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #f3f4f6',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: '0 0 16px' }}>
              Plantas por nivel de riesgo
            </h3>
            <PlantRiskList plants={transformedPlantas} />
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '24px',
            border: '1px solid #f3f4f6',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: '16px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#378ADD" aria-hidden="true">
                <path d="M11 2C6.03 2 2 6.03 2 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm3.5-9c.83 0 1.5-.67 1.5-1.5S15.33 6 14.5 6 13 6.67 13 7.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S8.33 6 7.5 6 6 6.67 6 7.5 6.67 9 7.5 9zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#111827', margin: 0 }}>
                Notificaciones activas por correo
              </h3>
            </div>
            <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px' }}>
              Recibe alertas inmediatas cuando se detecten niveles críticos o de sequia.
            </p>
            <AlertsList alerts={transformedAlerts} />
          </div>
        </div>
      </div>
    </div>
  );
}