// Capa de acceso a datos. Todas las llamadas al backend van aquí.
// Usa axios. Los componentes y páginas nunca llaman axios directamente 

import { axiosInstance as api } from '../lib/axiosInstance';

// Helpers de presentación 
export function formatMXN(num) {
  if (num == null) return '—';
  const n = typeof num === 'object' ? parseFloat(String(num)) : Number(num);
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)} MM`;
  if (n >= 1_000_000) return `$${Math.round(n / 1_000_000)} M`;
  return `$${n.toLocaleString('es-MX')}`;
}

export function extractEstado(ubicacionNombre) {
  if (!ubicacionNombre) return '';
  const parts = ubicacionNombre.split(',');
  return parts.length > 1 ? parts[parts.length - 1].trim() : ubicacionNombre;
}

function mapRiesgoColor(riesgo) {
  const r = (riesgo || '').toLowerCase();
  if (r === 'alto' || r === 'alta') return 'red';
  if (r === 'medio') return 'amber';
  return 'green';
}

// DASHBOARD (Director)
export async function fetchDashboard() {
  const { data } = await api.get('/api/dashboard');
  const plantas = (data.plantas || []).map(p => {
    const nivelRiesgo = p.nivelRiesgo || 'BAJO';   // ← fallback
    const riesgoLabel = nivelRiesgo.charAt(0).toUpperCase() + nivelRiesgo.slice(1).toLowerCase();
    
    return {
      // Nuevos campos (para compatibilidad con componentes antiguos)
      idPlanta: p.idPlanta,
      nombrePlanta: p.nombrePlanta,
      // Campos modernos
      id: p.idPlanta,
      nombre: p.nombrePlanta,
      latitud: p.latitud,
      longitud: p.longitud,
      indiceHidrico: p.indiceHidrico,
      nivelRiesgo: nivelRiesgo,
      ubicacionNombre: p.ubicacionNombre,
      estado: extractEstado(p.ubicacionNombre),
      riesgo: nivelRiesgo.toLowerCase() === 'alto' ? 'alta' : nivelRiesgo.toLowerCase(),
      riesgoLabel: riesgoLabel,
      indice: Math.round((p.indiceHidrico ?? 0) * 100),
    };
  });
  return { plantas, resumen: data.resumen };
}

export async function fetchAlertas(limit = 10) {
  const { data } = await api.get('/api/alertas', { params: { limit } });
  return data;
}

export async function fetchEvolucion(dias = 7) {
  const { data } = await api.get('/api/evolucion', { params: { dias } });
  return data;
}


// SIMULACIÓN
export async function fetchKpis(plantaId) {
  // KPIs derivados del pronóstico ARIMA (días a umbral, prob. de escasez, pérdida esperada)
  const { data } = await api.get('/api/predicciones/kpis', { params: { plantaId: plantaId ?? 1 } });
  return data;
}

export async function fetchProyeccion(plantaId, dias = 90) {
  // Proyección generada por el modelo ARIMA (microservicio batch -> Prediccion_Hidrica)
  const { data } = await api.get('/api/predicciones/proyeccion', {
    params: { plantaId: plantaId ?? 1, dias },
  });
  const chartData = (data.puntos || []).map((p, i) => ({
    dia: p.dia,
    valor: parseFloat(p.valor.toFixed(1)),
    bandaSup: data.bandaSuperior?.[i] != null ? parseFloat(data.bandaSuperior[i].valor.toFixed(1)) : null,
    bandaInf: data.bandaInferior?.[i] != null ? parseFloat(data.bandaInferior[i].valor.toFixed(1)) : null,
  }));
  return { data: chartData, startDay: data.startDay, peakDay: data.peakDay, peakValue: parseFloat((data.peakValue ?? 0).toFixed(1)) };
}

export async function fetchRecuperacion(plantaId, dias = 90) {
  const { data } = await api.get('/api/simulacion/recuperacion', {
    params: { plantaId: plantaId ?? 1, dias },
  });
  return (data.conIntervencion || []).map((p, i) => ({
    dia: p.dia,
    conIntervencion: parseFloat(p.valor.toFixed(1)),
    sinIntervencion: data.sinIntervencion?.[i] != null ? parseFloat(data.sinIntervencion[i].valor.toFixed(1)) : null,
  }));
}


// ALTERNATIVAS
export async function fetchAlerta(plantaId) {
  const { data } = await api.get('/api/alternativas/alerta', { params: { plantaId } });
  return {
    ...data,
    estresActual: Math.round((data.indiceActual ?? 0) * 100),
    costoAperturaStr: formatMXN(data.costoApertura),
    costoOperacionStr: formatMXN(data.costoOperacionEstimada),
    diasAperturaStr:`${data.diasReaperturaMin}–${data.diasReaperturaMax}`,
  };
}

export async function fetchAlternativas(plantaId) {
  const { data } = await api.get('/api/alternativas/ubicaciones', { params: { plantaId } });
  return (data || []).map(a => ({
    nombre: a.nombre,
    estado: extractEstado(a.estado),
    riesgo:  mapRiesgoColor(a.riesgo),
    riesgoLabel: a.riesgoLabel,
    costoCierre: formatMXN(a.costoCierre),
    tiempoCierre: `${a.tiempoCierreDias} días`,
    costoApertura: formatMXN(a.costoApertura),
    tiempoApertura: `${a.tiempoAperturaMin}–${a.tiempoAperturaMax} días`,
    costoTotal: formatMXN(a.costoTotal),
    recommended: a.recomendada,
  }));
}

export async function fetchFactores(plantaId) {
  const { data } = await api.get('/api/alternativas/factores', { params: { plantaId } });
  return (data || []).map(f => ({ nombre: f.nombre, icon: f.icono, puntos: f.puntos, color: f.color }));
}


// USUARIOS (Admin)
export async function fetchResumenUsuarios() {
  const { data } = await api.get('/api/usuarios/resumen');
  return data;
}

export async function fetchUsuarios(page = 0, size = 5) {
  const { data } = await api.get('/api/usuarios', { params: { page, size } });
  // El back devuelve PagedResponse: { items, total, page, size, totalPages }
  return {
    items: data.items ?? data.content ?? [],
    total: data.total ?? data.totalElements ?? 0,
    page: data.page ?? page,
    size: data.size ?? size,
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchRoles() {
  const { data } = await api.get('/api/usuarios/roles');
  return data;
}

export async function fetchRolConPermisos(rolId) {
  const { data } = await api.get(`/api/usuarios/roles/${rolId}`);
  return data;
}

export async function fetchEmpresas() {
  const { data } = await api.get('/api/usuarios/empresas');
  return data;
}

export async function generarContrasena() {
  const { data } = await api.get('/api/usuarios/generar-contrasena');
  return data.contrasena;
}

export async function crearUsuario(dto) {
  const { data } = await api.post('/api/usuarios', dto);
  return data;
}

export async function editarUsuario(id, dto) {
  const { data } = await api.put(`/api/usuarios/${id}`, dto);
  return data;
}

export async function eliminarUsuario(id) {
  await api.delete(`/api/usuarios/${id}`);
}

export async function fetchPlantas() {
  try {
    const { data } = await api.get('/api/plantas');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}