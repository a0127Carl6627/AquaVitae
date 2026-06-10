import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAuditoriaResumen, fetchAuditoriaLogs, fetchAuditoriaDetail } from '../services/auditoriaApi';
import { fetchApiStatus, fetchApiAlerts, triggerApiCheck } from '../services/apiAlertsService';

import * as api from '../services/aquavitaeApi';

// DASHBOARD 
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: api.fetchDashboard,
  });
}

export function useAlertas(limit = 10) {
  return useQuery({
    queryKey: ['alertas', limit],
    queryFn: () => api.fetchAlertas(limit),
  });
}

export function useEvolucion(dias = 7) {
  return useQuery({
    queryKey: ['evolucion', dias],
    queryFn: () => api.fetchEvolucion(dias),
  });
}

// SIMULACIÓN 
export function useKpis(plantaId) {
  return useQuery({
    queryKey: ['kpis', plantaId],
    queryFn: () => api.fetchKpis(plantaId),
    enabled: !!plantaId,
  });
}

export function useProyeccion(plantaId, dias = 90) {
  return useQuery({
    queryKey: ['proyeccion', plantaId, dias],
    queryFn: () => api.fetchProyeccion(plantaId, dias),
    enabled: !!plantaId,
  });
}

export function useRecuperacion(plantaId, dias = 90) {
  return useQuery({
    queryKey: ['recuperacion', plantaId, dias],
    queryFn: () => api.fetchRecuperacion(plantaId, dias),
    enabled: !!plantaId,
  });
}

// ALTERNATIVAS 
export function useAlerta(plantaId) {
  return useQuery({
    queryKey: ['alerta', plantaId],
    queryFn: () => api.fetchAlerta(plantaId),
    enabled: !!plantaId,
  });
}

export function useAlternativas(plantaId) {
  return useQuery({
    queryKey: ['alternativas', plantaId],
    queryFn: () => api.fetchAlternativas(plantaId),
    enabled: !!plantaId,
  });
}

export function useFactores(plantaId) {
  return useQuery({
    queryKey: ['factores', plantaId],
    queryFn: () => api.fetchFactores(plantaId),
    enabled: !!plantaId,
  });
}

// USUARIOS Y ROLES 
export function useResumenUsuarios() {
  return useQuery({
    queryKey: ['resumenUsuarios'],
    queryFn: api.fetchResumenUsuarios,
  });
}

export function useUsuarios(page = 0, size = 5) {
  return useQuery({
    queryKey: ['usuarios', page, size],
    queryFn: () => api.fetchUsuarios(page, size),
    keepPreviousData: true,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: api.fetchRoles,
  });
}

export function useRolConPermisos(rolId) {
  return useQuery({
    queryKey: ['rolPermisos', rolId],
    queryFn: () => api.fetchRolConPermisos(rolId),
    enabled: !!rolId,
  });
}

export function usePlantas() {
  return useQuery({
    queryKey: ['plantas'],
    queryFn: api.fetchPlantas,
  });
}

// MUTATIONS 
export function useCrearUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.crearUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['resumenUsuarios'] });
    },
  });
}

export function useEditarUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }) => api.editarUsuario(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['resumenUsuarios'] });
    },
  });
}

export function useEliminarUsuario() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.eliminarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['resumenUsuarios'] });
    },
  });
}

// AUDITORÍA 
export const useAuditoriaResumen = () => useQuery({
  queryKey: ['auditoriaResumen'],
  queryFn: fetchAuditoriaResumen,
  staleTime: 2 * 60 * 1000, // 2 minutos
});

export const useAuditoriaLogs = (filters = {}) => useQuery({
  queryKey: ['auditoriaLogs', filters],
  queryFn: () => fetchAuditoriaLogs(filters),
  keepPreviousData: true,
});

export const useAuditoriaDetail = (id) => useQuery({
  queryKey: ['auditoriaDetail', id],
  queryFn: () => fetchAuditoriaDetail(id),
  enabled: !!id,
});

// API ALERTS 
export const useApiStatus = () => useQuery({
  queryKey: ['apiStatus'],
  queryFn: fetchApiStatus,
  staleTime: 60 * 1000,
});

export const useApiAlerts = () => useQuery({
  queryKey: ['apiAlerts'],
  queryFn: fetchApiAlerts,
  staleTime: 60 * 1000,
});

export const useTriggerApiCheck = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: triggerApiCheck,
    onSuccess: () => {
      queryClient.invalidateQueries(['apiStatus']);
      queryClient.invalidateQueries(['apiAlerts']);
    },
  });
};