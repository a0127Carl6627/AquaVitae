/**
 * Pruebas unitarias para AdminAuditoriaPage.
 *
 * Estrategia:
 *  - Se mockean los hooks de React Query.
 *  - Se mockean los componentes hijos de Auditoría.
 *  - Se valida renderizado, carga, filtros, selección de logs y detalle.
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

jest.mock('../../components/Auditoria/AuditoriaKpis', () => {
  return function MockAuditoriaKpis({ resumen }) {
    return (
      <div data-testid="auditoria-kpis">
        KPIS: {resumen.eventosHoy} eventos hoy
      </div>
    );
  };
});

jest.mock('../../components/Auditoria/AuditoriaFilters', () => {
  return function MockAuditoriaFilters({ filters, onChange, onSearch }) {
    return (
      <div data-testid="auditoria-filters">
        <span>Filtro acción: {filters.accion}</span>

        <button
          type="button"
          onClick={() =>
            onChange({
              accion: 'LOGIN',
              modulo: 'AUTH',
              severidad: 'Alta',
            })
          }
        >
          Cambiar filtros
        </button>

        <button type="button" onClick={onSearch}>
          Buscar
        </button>
      </div>
    );
  };
});

jest.mock('../../components/Auditoria/AuditoriaTable', () => {
  return function MockAuditoriaTable({ logs, selectedLogId, onSelectLog }) {
    return (
      <div data-testid="auditoria-table">
        <span>Seleccionado: {selectedLogId || 'ninguno'}</span>

        {logs.map((log) => (
          <button key={log.id} type="button" onClick={() => onSelectLog(log)}>
            {log.accion} - {log.modulo}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('../../components/Auditoria/AuditoriaDetailPanel', () => {
  return function MockAuditoriaDetailPanel({ log }) {
    return (
      <div data-testid="auditoria-detail">
        {log ? `Detalle: ${log.descripcion}` : 'Sin detalle'}
      </div>
    );
  };
});

const mockResumen = {
  eventosHoy: 12,
  cambiosCriticos: 3,
  usuariosAuditados: 5,
  registrosInmutables: 20,
};

const mockLogs = [
  {
    id: 1,
    usuario: 'Carlos',
    accion: 'LOGIN',
    modulo: 'AUTH',
    severidad: 'Media',
    descripcion: 'Inicio de sesión exitoso',
  },
  {
    id: 2,
    usuario: 'Admin',
    accion: 'ROTATE_KEY',
    modulo: 'APIS',
    severidad: 'Alta',
    descripcion: 'Rotación de llave API',
  },
];

function setup({
  resumen = mockResumen,
  logs = mockLogs,
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

describe('AdminAuditoriaPage — unitarias', () => {
  it('muestra estado de carga cuando todavía no hay logs', () => {
    setup({
      logs: [],
      loadingResumen: true,
      loadingLogs: true,
    });

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Cargando auditoría...')).toBeInTheDocument();
  });

  it('renderiza título y descripción principal', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Auditoría')).toBeInTheDocument();
    expect(
      screen.getByText('Monitoreo y trazabilidad de eventos del sistema')
    ).toBeInTheDocument();
  });

  it('renderiza KPIs, filtros, tabla y panel de detalle', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByTestId('auditoria-kpis')).toBeInTheDocument();
    expect(screen.getByTestId('auditoria-filters')).toBeInTheDocument();
    expect(screen.getByTestId('auditoria-table')).toBeInTheDocument();
    expect(screen.getByTestId('auditoria-detail')).toBeInTheDocument();
  });

  it('envía resumen al componente de KPIs', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('KPIS: 12 eventos hoy')).toBeInTheDocument();
  });

  it('renderiza los logs recibidos en la tabla', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('LOGIN - AUTH')).toBeInTheDocument();
    expect(screen.getByText('ROTATE_KEY - APIS')).toBeInTheDocument();
  });

  it('permite seleccionar un log y mostrarlo en el detalle', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Sin detalle')).toBeInTheDocument();

    fireEvent.click(screen.getByText('LOGIN - AUTH'));

    expect(screen.getByText('Detalle: Inicio de sesión exitoso')).toBeInTheDocument();
  });

  it('usa el detalle consultado cuando useAuditoriaDetail devuelve información', () => {
    setup({
      detailLog: {
        id: 1,
        usuario: 'Carlos',
        accion: 'LOGIN',
        modulo: 'AUTH',
        severidad: 'Media',
        descripcion: 'Detalle completo del evento de login',
      },
    });

    render(<AdminAuditoriaPage />);

    expect(
      screen.getByText('Detalle: Detalle completo del evento de login')
    ).toBeInTheDocument();
  });

  it('actualiza filtros desde AuditoriaFilters', () => {
    setup();

    render(<AdminAuditoriaPage />);

    expect(screen.getByText('Filtro acción:')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cambiar filtros'));

    expect(screen.getByText('Filtro acción: LOGIN')).toBeInTheDocument();
  });

  it('ejecuta refetchLogs al buscar y limpia el detalle seleccionado', () => {
    const refetchLogs = jest.fn();

    setup({ refetchLogs });

    render(<AdminAuditoriaPage />);

    fireEvent.click(screen.getByText('LOGIN - AUTH'));
    expect(screen.getByText('Detalle: Inicio de sesión exitoso')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Buscar'));

    expect(refetchLogs).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Sin detalle')).toBeInTheDocument();
  });

  it('manda los filtros iniciales al hook useAuditoriaLogs', () => {
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