const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

function authHeaders() {
  const token = localStorage.getItem('aquavitae_token');

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

export async function fetchAuditoriaResumen() {
  const res = await fetch(
    `${BASE}/admin/auditoria/resumen`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Error cargando resumen auditoría'
    );
  }

  return res.json();
}

export async function fetchAuditoriaLogs(
  filters = {}
) {
  const params = new URLSearchParams();

  if (filters.limit) {
    params.set('limit', filters.limit);
  }

  if (filters.usuario) {
    params.set('usuario', filters.usuario);
  }

  if (filters.accion) {
    params.set('accion', filters.accion);
  }

  if (filters.modulo) {
    params.set('modulo', filters.modulo);
  }

  if (filters.severidad) {
    params.set(
      'severidad',
      filters.severidad
    );
  }

  const query = params.toString();

  const res = await fetch(
    `${BASE}/admin/auditoria/logs${
      query ? `?${query}` : ''
    }`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Error cargando logs de auditoría'
    );
  }

  return res.json();
}

export async function fetchAuditoriaDetail(
  id
) {
  const res = await fetch(
    `${BASE}/admin/auditoria/logs/${id}`,
    {
      headers: authHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error(
      'Error cargando detalle de auditoría'
    );
  }

  return res.json();
}