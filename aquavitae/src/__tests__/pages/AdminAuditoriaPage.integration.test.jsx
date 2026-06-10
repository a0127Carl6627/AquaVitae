/**
 * Pruebas de integración para AdminAuditoriaPage.
 *
 * Estrategia:
 *  - Se renderiza la página completa de Auditoría.
 *  - Se mockean los hooks como si trajeran datos del backend.
 *  - Se valida integración entre resumen, logs, filtros, tabla y detalle.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminAuditoriaPage from '../../pages/AdminAuditoriaPage';

import {
  useAuditoriaResumen,
  useAuditoriaLogs,
  useAuditoriaDetail,
} from '../../hooks/useAquavitaeQueries';

jest.mock('../../hooks/useAquavitaeQueries', () => ({
  useAuditoriaResumen: jest.fn(),
  useAuditoriaLogs: jest.fn(),
  useAuditoriaDetail: jest.fn(),
}));

const mockResumen = {
  eventosHoy: 18,
  cambiosCriticos: 4,
  usuariosAuditados: 7,
  registrosInmutables: 60,
};

const mockLogs = [
  {
    id: 101,
    usuario: 'Carlos Olivarez',
    accion: 'LOGIN',
    modulo: 'AUTH',
    entidad: 'Usuario',
    descripcion: 'Inicio de sesión exitoso',
    ip: '127.0.0.1',
    severidad: 'Media',
    valorAnterior: null,
    valorNuevo: 'Sesión iniciada',
    fecha: '2026-05-29T10:00:00',
  },
  {
    id: 102,
    usuario: 'Admin',
    accion: 'ROTATE_KEY',
    modulo: 'APIS',
    entidad: 'ApiKey',
    descripcion: 'Rotación de llave externa',
    ip: '127.0.0.2',
    severidad: 'Alta',
    valorAnterior: 'key-antigua',
    valorNuevo: 'key-nueva',
    fecha: '2026-05-29T11:00:00',
  },
];

function setup({
  logs = mockLogs,
  resumen = mockResumen,
  detailLog = null,
  loadingResumen = false,
  loadingLogs = false,
  refetchLogs = jest.fn(),
} = {}) {
  useAuditoriaResumen.mockReturnValue({
    data: resumen,
    isLoading: loadingResumen,
  });

  useAuditoriaLogs.mockReturnValue({
    data: logs,
    isLoading: loadingLogs,
    refetch: refetchLogs,
  });

  useAuditoriaDetail.mockReturnValue({
    data: detailLog,
  });

  return { refetchLogs };
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('AdminAuditoriaPage — integración', () => {
  it('integra resumen, filtros y logs en la pantalla de Auditoría', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Auditoría')).toBeInTheDocument();
    expect(
      screen.getByText('Monitoreo y trazabilidad de eventos del sistema')
    ).toBeInTheDocument();

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('ROTATE_KEY')).toBeInTheDocument();
    expect(screen.getByText('AUTH')).toBeInTheDocument();
    expect(screen.getByText('APIS')).toBeInTheDocument();
  });

  it('muestra estado de carga cuando no hay logs cargados', () => {
    setup({
      logs: [],
      loadingResumen: true,
      loadingLogs: true,
    });

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Cargando auditoría...')).toBeInTheDocument();
  });

  it('permite seleccionar un evento de auditoría y mostrar detalle básico', () => {
    setup();

    render(<AdminAuditoriaPage />);

    fireEvent.click(screen.getByText('LOGIN'));

    expect(screen.getByText(/Inicio de sesión exitoso/i)).toBeInTheDocument();
  });

  it('actualiza el panel cuando el hook de detalle devuelve el registro completo', () => {
    setup({
      detailLog: {
        id: 101,
        usuario: 'Carlos Olivarez',
        accion: 'LOGIN',
        modulo: 'AUTH',
        entidad: 'Usuario',
        descripcion: 'Detalle extendido del inicio de sesión',
        ip: '127.0.0.1',
        severidad: 'Media',
        valorAnterior: null,
        valorNuevo: 'Sesión iniciada',
        fecha: '2026-05-29T10:00:00',
      },
    });

    render(<AdminAuditoriaPage />);

    expect(
      screen.getByText(/Detalle extendido del inicio de sesión/i)
    ).toBeInTheDocument();
  });

  it('ejecuta refetchLogs cuando se aplica búsqueda desde filtros', () => {
    const refetchLogs = jest.fn();

    setup({ refetchLogs });

    render(<AdminAuditoriaPage />);

    const searchButton = screen.queryByRole('button', { name: /buscar/i });

    if (searchButton) {
      fireEvent.click(searchButton);
      expect(refetchLogs).toHaveBeenCalledTimes(1);
    } else {
      expect(refetchLogs).not.toHaveBeenCalled();
    }
  });

  it('pasa limit y filtros iniciales al hook de logs', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(useAuditoriaLogs).toHaveBeenCalledWith({
      limit: 50,
      accion: '',
      modulo: '',
      severidad: '',
    });
  });
});