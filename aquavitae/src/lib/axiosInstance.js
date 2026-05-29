// Instancia de axios compartida por todo el proyecto.
// Agrega el token JWT automáticamente en cada request.
// Maneja el 401 redirigiendo al login.

import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:8080',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

// inyecta el Bearer token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('aquavitae_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// manejo centralizado de errores
axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('aquavitae_token');
      localStorage.removeItem('aquavitae_user');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);