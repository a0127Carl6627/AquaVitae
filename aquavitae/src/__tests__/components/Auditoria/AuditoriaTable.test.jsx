/**
 * Pruebas unitarias para AuditoriaTable.
 *
 * Valida:
 *  - Renderizado de encabezados.
 *  - Renderizado de filas.
 *  - Selección de logs.
 *  - Severidades alta, media e info.
 *  - Manejo de fecha vacía.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuditoriaTable from '../../../components/Auditoria/AuditoriaTable';

describe('AuditoriaTable — unitarias', () => {
  const mockLogs = [
    {
      id: 101,
      fecha: '2026-05-29T10:00:00',
      accion: 'LOGIN',
      modulo: 'AUTH',
      entidad: 'Usuario',
      severidad: 'Media',
      ip: '127.0.0.1',
    },
    {
      id: 102,
      fecha: '2026-05-29T11:00:00',
      accion: 'ROTATE_KEY',
      modulo: 'APIS',
      entidad: 'ApiKey',
      severidad: 'Alta',
      ip: '127.0.0.2',
    },
    {
      id: 103,
      fecha: null,
      accion: 'VIEW_DASHBOARD',
      modulo: 'DASHBOARD',
      entidad: 'Vista',
      severidad: 'Info',
      ip: '127.0.0.3',
    },
  ];

  it('renderiza los encabezados de la tabla', () => {
    render(<AuditoriaTable logs={mockLogs} />);

    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Acción')).toBeInTheDocument();
    expect(screen.getByText('Módulo')).toBeInTheDocument();
    expect(screen.getByText('Entidad')).toBeInTheDocument();
    expect(screen.getByText('Severidad')).toBeInTheDocument();
    expect(screen.getByText('IP')).toBeInTheDocument();
  });

  it('renderiza las filas de logs recibidas', () => {
    render(<AuditoriaTable logs={mockLogs} />);

    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('AUTH')).toBeInTheDocument();
    expect(screen.getByText('Usuario')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('127.0.0.1')).toBeInTheDocument();

    expect(screen.getByText('ROTATE_KEY')).toBeInTheDocument();
    expect(screen.getByText('APIS')).toBeInTheDocument();
    expect(screen.getByText('ApiKey')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();
    expect(screen.getByText('127.0.0.2')).toBeInTheDocument();
  });

  it('llama onSelectLog al hacer click en una fila', () => {
    const onSelectLog = jest.fn();

    render(<AuditoriaTable logs={mockLogs} onSelectLog={onSelectLog} />);

    fireEvent.click(screen.getByText('LOGIN'));

    expect(onSelectLog).toHaveBeenCalledTimes(1);
    expect(onSelectLog).toHaveBeenCalledWith(mockLogs[0]);
  });

  it('marca visualmente la fila seleccionada', () => {
    render(<AuditoriaTable logs={mockLogs} selectedLogId={102} />);

    const selectedRow = screen.getByText('ROTATE_KEY').closest('tr');

    expect(selectedRow.className).toContain('bg-[#eef4ff]');
  });

  it('muestra guion cuando la fecha no existe', () => {
    render(<AuditoriaTable logs={mockLogs} />);

    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('muestra severidad info como valor por defecto cuando no es alta ni media', () => {
    render(<AuditoriaTable logs={mockLogs} />);

    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('renderiza la tabla aunque no existan logs', () => {
    render(<AuditoriaTable logs={[]} />);

    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Acción')).toBeInTheDocument();
    expect(screen.queryByText('LOGIN')).not.toBeInTheDocument();
  });
});