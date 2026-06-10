/**
 * Pruebas unitarias para AuditoriaDetailPanel.
 *
 * Valida:
 *  - Estado vacío cuando no hay log seleccionado.
 *  - Renderizado del detalle del evento.
 *  - Formato de valores JSON.
 *  - Manejo de valores vacíos o JSON inválido.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AuditoriaDetailPanel from '../../../components/Auditoria/AuditoriaDetailPanel';

describe('AuditoriaDetailPanel — unitarias', () => {
  const mockLog = {
    id: 1,
    accion: 'LOGIN',
    descripcion: 'Inicio de sesión exitoso',
    modulo: 'AUTH',
    entidad: 'Usuario',
    ip: '127.0.0.1',
    severidad: 'Media',
    valorAnterior: '{"estado":"inactivo"}',
    valorNuevo: '{"estado":"activo"}',
    hashIntegridad: 'hash-abc-123',
  };

  it('muestra mensaje vacío cuando no hay log seleccionado', () => {
    render(<AuditoriaDetailPanel log={null} />);

    expect(
      screen.getByText('Selecciona un evento de auditoría')
    ).toBeInTheDocument();
  });

  it('renderiza el detalle principal del evento', () => {
    render(<AuditoriaDetailPanel log={mockLog} />);

    expect(screen.getByText('Detalle de evento')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('Inicio de sesión exitoso')).toBeInTheDocument();
    expect(screen.getByText('AUTH')).toBeInTheDocument();
    expect(screen.getByText('Usuario')).toBeInTheDocument();
    expect(screen.getByText('127.0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('hash-abc-123')).toBeInTheDocument();
  });

  it('muestra las etiquetas del panel de detalle', () => {
    render(<AuditoriaDetailPanel log={mockLog} />);

    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Módulo')).toBeInTheDocument();
    expect(screen.getByText('Entidad')).toBeInTheDocument();
    expect(screen.getByText('IP')).toBeInTheDocument();
    expect(screen.getByText('Severidad')).toBeInTheDocument();
    expect(screen.getByText('Valor anterior')).toBeInTheDocument();
    expect(screen.getByText('Valor nuevo')).toBeInTheDocument();
    expect(screen.getByText('Hash integridad')).toBeInTheDocument();
  });

  it('formatea valorAnterior y valorNuevo cuando son JSON válidos', () => {
    const { container } = render(<AuditoriaDetailPanel log={mockLog} />);

    const preBlocks = container.querySelectorAll('pre');

    expect(preBlocks[0].textContent).toContain('"estado": "inactivo"');
    expect(preBlocks[1].textContent).toContain('"estado": "activo"');
  });

  it('muestra el valor original cuando el JSON es inválido', () => {
    const logConJsonInvalido = {
      ...mockLog,
      valorAnterior: 'valor plano anterior',
      valorNuevo: 'valor plano nuevo',
    };

    const { container } = render(<AuditoriaDetailPanel log={logConJsonInvalido} />);

    const preBlocks = container.querySelectorAll('pre');

    expect(preBlocks[0].textContent).toBe('valor plano anterior');
    expect(preBlocks[1].textContent).toBe('valor plano nuevo');
  });

  it('muestra objeto vacío cuando valorAnterior o valorNuevo no existen', () => {
    const logSinValores = {
      ...mockLog,
      valorAnterior: null,
      valorNuevo: undefined,
    };

    const { container } = render(<AuditoriaDetailPanel log={logSinValores} />);

    const preBlocks = container.querySelectorAll('pre');

    expect(preBlocks[0].textContent).toBe('{}');
    expect(preBlocks[1].textContent).toBe('{}');
  });
});