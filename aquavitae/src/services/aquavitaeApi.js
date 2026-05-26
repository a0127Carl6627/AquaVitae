// src/services/aquavitaeApi.js
const BASE = process.env.REACT_APP_API_BASE || '';

function authHeaders() {
  const token = localStorage.getItem('aquavitae_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatMXN(num) {
  if (num == null) return '—';
  const n = typeof num === 'object' ? parseFloat(String(num)) : Number(num);
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)} MM`;
  if (n >= 1_000_000) return `$${Math.round(n / 1_000_000)} M`;
  return `$${n.toLocaleString('es-MX')}`;
}

function extractEstado(ubicacionNombre) {
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

// ========== DASHBOARD Y SIMULACIÓN (existentes) ==========
export async function fetchDashboard() {
  const res = await fetch(`${BASE}/api/dashboard`);
  if (!res.ok) throw new Error(`Dashboard error ${res.status}`);
  const data = await res.json();

  const plantas = (data.plantas || []).map(p => ({
    id: p.idPlanta,
    nombre: p.nombrePlanta,
    latitud: p.latitud,
    longitud: p.longitud,
    indiceHidrico: p.indiceHidrico,
    nivelRiesgo: p.nivelRiesgo,
    ubicacionNombre: p.ubicacionNombre,
    estado: extractEstado(p.ubicacionNombre),
    riesgo: p.nivelRiesgo?.toLowerCase() === 'alto' ? 'alta' : p.nivelRiesgo?.toLowerCase() ?? 'bajo',
    riesgoLabel: p.nivelRiesgo
      ? p.nivelRiesgo.charAt(0).toUpperCase() + p.nivelRiesgo.slice(1).toLowerCase()
      : '—',
    indice: Math.round((p.indiceHidrico ?? 0) * 100),
  }));

  return { plantas, resumen: data.resumen };
}

export async function fetchKpis(plantaId) {
  const params = plantaId != null ? `?plantaId=${plantaId}` : '';
  const res = await fetch(`${BASE}/api/simulacion/kpis${params}`);
  if (!res.ok) throw new Error(`KPIs error ${res.status}`);
  return res.json();
}

export async function fetchProyeccion(plantaId, dias = 90) {
  const params = new URLSearchParams({ dias: String(dias) });
  if (plantaId != null) params.set('plantaId', String(plantaId));
  const res = await fetch(`${BASE}/api/simulacion/proyeccion?${params}`);
  if (!res.ok) throw new Error(`Proyección error ${res.status}`);
  const d = await res.json();

  const chartData = (d.puntos || []).map((p, i) => ({
    dia: p.dia,
    valor: parseFloat(p.valor.toFixed(1)),
    bandaSup: d.bandaSuperior?.[i] != null ? parseFloat(d.bandaSuperior[i].valor.toFixed(1)) : null,
    bandaInf: d.bandaInferior?.[i] != null ? parseFloat(d.bandaInferior[i].valor.toFixed(1)) : null,
  }));

  return {
    data: chartData,
    startDay: d.startDay,
    peakDay: d.peakDay,
    peakValue: parseFloat((d.peakValue ?? 0).toFixed(1)),
  };
}

export async function fetchRecuperacion(plantaId, dias = 90) {
  const params = new URLSearchParams({ dias: String(dias) });
  if (plantaId != null) params.set('plantaId', String(plantaId));
  const res = await fetch(`${BASE}/api/simulacion/recuperacion?${params}`);
  if (!res.ok) throw new Error(`Recuperación error ${res.status}`);
  const d = await res.json();

  return (d.conIntervencion || []).map((p, i) => ({
    dia: p.dia,
    conIntervencion: parseFloat(p.valor.toFixed(1)),
    sinIntervencion: d.sinIntervencion?.[i] != null
      ? parseFloat(d.sinIntervencion[i].valor.toFixed(1))
      : null,
  }));
}

export async function fetchAlerta(plantaId) {
  const res = await fetch(`${BASE}/api/alternativas/alerta?plantaId=${plantaId}`);
  if (!res.ok) throw new Error(`Alerta error ${res.status}`);
  const data = await res.json();
  return {
    ...data,
    estresActual: Math.round((data.indiceActual ?? 0) * 100),
    costoAperturaStr: formatMXN(data.costoApertura),
    costoOperacionStr: formatMXN(data.costoOperacionEstimada),
    diasAperturaStr: `${data.diasReaperturaMin}–${data.diasReaperturaMax}`,
  };
}

export async function fetchAlternativas(plantaId) {
  const res = await fetch(`${BASE}/api/alternativas/ubicaciones?plantaId=${plantaId}`);
  if (!res.ok) throw new Error(`Alternativas error ${res.status}`);
  const data = await res.json();
  return (data || []).map(a => ({
    nombre: a.nombre,
    estado: extractEstado(a.estado),
    riesgo: mapRiesgoColor(a.riesgo),
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
  const res = await fetch(`${BASE}/api/alternativas/factores?plantaId=${plantaId}`);
  if (!res.ok) throw new Error(`Factores error ${res.status}`);
  const data = await res.json();
  return (data || []).map(f => ({
    nombre: f.nombre,
    icon: f.icono,
    puntos: f.puntos,
    color: f.color,
  }));
}

// ========== ADMINISTRACIÓN DE USUARIOS Y ROLES (nuevos) ==========
export async function fetchResumen() {
  const res = await fetch(`${BASE}/api/usuarios/resumen`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al obtener resumen de usuarios');
  return res.json();
}

export async function fetchUsuarios(page = 0, size = 1000) {
  const res = await fetch(`${BASE}/api/usuarios?page=${page}&size=${size}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al listar usuarios');
  const data = await res.json();
  return {
    content: data.content ?? data.items ?? [],
    totalElements: data.totalElements ?? data.total ?? 0,
    page: data.page ?? 0,
    size: data.size ?? size,
    totalPages: data.totalPages ?? 1,
  };
}

export async function fetchRoles() {
  const res = await fetch(`${BASE}/api/usuarios/roles`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al obtener roles');
  return res.json();
}

export async function fetchRolConPermisos(rolId) {
  const res = await fetch(`${BASE}/api/usuarios/roles/${rolId}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al obtener permisos del rol');
  return res.json();
}

export async function fetchEmpresas() {
  const res = await fetch(`${BASE}/api/usuarios/empresas`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al obtener empresas');
  return res.json();
}

export async function generarContrasena() {
  const res = await fetch(`${BASE}/api/usuarios/generar-contrasena`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al generar contraseña temporal');
  return res.json();
}

export async function crearUsuario(dto) {
  const res = await fetch(`${BASE}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ mensaje: 'Error desconocido' }));
    throw new Error(error.mensaje || 'Error al crear usuario');
  }
  return res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${BASE}/api/usuarios/${id}`, { method: 'DELETE', headers: authHeaders() });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ mensaje: 'Error desconocido' }));
    throw new Error(error.mensaje || 'Error al eliminar usuario');
  }
}

export async function editarUsuario(id, dto) {
  const res = await fetch(`${BASE}/api/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(dto),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.mensaje || 'Error al editar usuario');
  }
  return res.json();
}

export async function fetchPlantas() {
  const res = await fetch(`${BASE}/api/plantas`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Error al obtener plantas');
  return res.json();
}

// Objeto api para uso conveniente en páginas
export const api = {
  getDashboard: fetchDashboard,
  getKpis: fetchKpis,
  getProyeccion: fetchProyeccion,
  getRecuperacion: fetchRecuperacion,
  getAlerta: fetchAlerta,
  getAlternativas: fetchAlternativas,
  getFactores: fetchFactores,
  getResumen: fetchResumen,
  getUsuarios: fetchUsuarios,
  getRoles: fetchRoles,
  getRolConPermisos: fetchRolConPermisos,
  getEmpresas: fetchEmpresas,
  generarContrasena,
  crearUsuario,
  eliminarUsuario,
  editarUsuario,
  getPlantas: fetchPlantas,
};

// Re-export utilidades si se necesitan en otros componentes
export { formatMXN, extractEstado };