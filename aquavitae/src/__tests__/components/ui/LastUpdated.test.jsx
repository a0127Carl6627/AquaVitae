import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LastUpdated from '../../../components/ui/LastUpdated';

describe('LastUpdated', () => {
  it('renderiza la etiqueta "Última actualización:"', () => {
    render(<LastUpdated fechaActualizacion={new Date()} />);
    expect(screen.getByText('Última actualización:')).toBeInTheDocument();
  });

  it('muestra el día y el año cuando se pasa una fecha válida', () => {
    // Se verifica estructura genérica (independiente del locale del runner)
    render(<LastUpdated fechaActualizacion={new Date('2024-03-20T10:30:00')} />);
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('muestra "—" cuando fechaActualizacion es una cadena inválida', () => {
    render(<LastUpdated fechaActualizacion="fecha-invalida" />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('muestra "—" cuando fechaActualizacion no se proporciona', () => {
    render(<LastUpdated />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('renderiza el botón de actualización', () => {
    render(<LastUpdated fechaActualizacion={new Date()} />);
    expect(
      screen.getByRole('button', { name: 'Actualizar datos' }),
    ).toBeInTheDocument();
  });

  it('llama a onRefresh al hacer clic en el botón', () => {
    const mockRefresh = jest.fn();
    render(
      <LastUpdated fechaActualizacion={new Date()} onRefresh={mockRefresh} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar datos' }));
    expect(mockRefresh).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón cuando loading === true', () => {
    render(
      <LastUpdated fechaActualizacion={new Date()} loading={true} />,
    );
    expect(
      screen.getByRole('button', { name: 'Actualizar datos' }),
    ).toBeDisabled();
  });

  it('habilita el botón cuando loading === false', () => {
    render(
      <LastUpdated fechaActualizacion={new Date()} loading={false} />,
    );
    expect(
      screen.getByRole('button', { name: 'Actualizar datos' }),
    ).not.toBeDisabled();
  });

  it('no llama a onRefresh cuando el botón está deshabilitado', () => {
    const mockRefresh = jest.fn();
    render(
      <LastUpdated fechaActualizacion={new Date()} onRefresh={mockRefresh} loading={true} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar datos' }));
    // El botón está disabled; el evento no debe propagarse al handler
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it('acepta un objeto Date como fechaActualizacion', () => {
    const fecha = new Date(2023, 5, 15, 9, 0); // 15 Jun 2023 09:00
    render(<LastUpdated fechaActualizacion={fecha} />);
    expect(screen.getByText(/15/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
  });
});
