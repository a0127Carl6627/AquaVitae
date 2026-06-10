/**
 * Pruebas unitarias para AuditoriaFilters.
 *
 * Valida:
 *  - Renderizado de inputs y select.
 *  - Valores iniciales de filtros.
 *  - Actualización de filtros al escribir o seleccionar severidad.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuditoriaFilters from '../../../components/Auditoria/AuditoriaFilters';

describe('AuditoriaFilters — unitarias', () => {
  const mockFilters = {
    accion: '',
    modulo: '',
    severidad: '',
  };

  it('renderiza los campos de acción, módulo y severidad', () => {
    render(<AuditoriaFilters filters={mockFilters} onChange={jest.fn()} />);

    expect(screen.getByPlaceholderText('Acción')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Módulo')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('muestra los valores iniciales recibidos por props', () => {
    render(
      <AuditoriaFilters
        filters={{
          accion: 'LOGIN',
          modulo: 'AUTH',
          severidad: 'ALTA',
        }}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Acción')).toHaveValue('LOGIN');
    expect(screen.getByPlaceholderText('Módulo')).toHaveValue('AUTH');
    expect(screen.getByRole('combobox')).toHaveValue('ALTA');
  });

  it('llama onChange al modificar el filtro de acción', () => {
    const onChange = jest.fn();

    render(<AuditoriaFilters filters={mockFilters} onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText('Acción'), {
      target: {
        name: 'accion',
        value: 'LOGIN',
      },
    });

    expect(onChange).toHaveBeenCalledWith({
      accion: 'LOGIN',
      modulo: '',
      severidad: '',
    });
  });

  it('llama onChange al modificar el filtro de módulo', () => {
    const onChange = jest.fn();

    render(
      <AuditoriaFilters
        filters={{
          accion: 'LOGIN',
          modulo: '',
          severidad: '',
        }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Módulo'), {
      target: {
        name: 'modulo',
        value: 'AUTH',
      },
    });

    expect(onChange).toHaveBeenCalledWith({
      accion: 'LOGIN',
      modulo: 'AUTH',
      severidad: '',
    });
  });

  it('llama onChange al seleccionar una severidad', () => {
    const onChange = jest.fn();

    render(
      <AuditoriaFilters
        filters={{
          accion: 'LOGIN',
          modulo: 'AUTH',
          severidad: '',
        }}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: {
        name: 'severidad',
        value: 'ALTA',
      },
    });

    expect(onChange).toHaveBeenCalledWith({
      accion: 'LOGIN',
      modulo: 'AUTH',
      severidad: 'ALTA',
    });
  });

  it('incluye las opciones de severidad disponibles', () => {
    render(<AuditoriaFilters filters={mockFilters} onChange={jest.fn()} />);

    expect(screen.getByRole('option', { name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'INFO' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'MEDIA' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'ALTA' })).toBeInTheDocument();
  });
});