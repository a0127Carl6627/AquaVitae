import { axiosInstance as api } from '../lib/axiosInstance';

export async function fetchAuditoriaResumen() {
  const { data } = await api.get('/admin/auditoria/resumen');
  return data;
}

export async function fetchAuditoriaLogs(filters = {}) {
  const params = new URLSearchParams();
  if (filters.limit) params.set('limit', filters.limit);
  if (filters.usuario) params.set('usuario', filters.usuario);
  if (filters.accion) params.set('accion', filters.accion);
  if (filters.modulo) params.set('modulo', filters.modulo);
  if (filters.severidad) params.set('severidad', filters.severidad);
  
  const query = params.toString();
  const url = `/admin/auditoria/logs${query ? `?${query}` : ''}`;
  const { data } = await api.get(url);
  return data;
}

export async function fetchAuditoriaDetail(id) {
  const { data } = await api.get(`/admin/auditoria/logs/${id}`);
  return data;
}