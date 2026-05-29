import { axiosInstance as api } from '../lib/axiosInstance';

export async function fetchApiStatus() {
  const { data } = await api.get('/admin/apis/status');
  return data;
}

export async function fetchApiAlerts() {
  const { data } = await api.get('/admin/apis/alerts');
  return data;
}

export async function triggerApiCheck() {
  const { data } = await api.post('/admin/apis/check');
  return data;
}