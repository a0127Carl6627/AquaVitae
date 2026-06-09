import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlantRiskList from '../../../components/dashboard/PlantRiskList';

const makePlant = (id, nombre, nivelRiesgo, tendencia = 'ESTABLE', indiceHidrico = 0.5) => ({
  idPlanta: id,
  nombrePlanta: nombre,
  ubicacionNombre: `Ubicación ${id}`,
  nivelRiesgo,
  tendencia,
  indiceHidrico,
});

// 6 plantas para activar paginación (itemsPerPage = 5)
const plants6 = [
  makePlant(1, 'Planta Alpha',   'ALTO',  'SUBIENDO', 0.82),
  makePlant(2, 'Planta Beta',    'MEDIO', 'ESTABLE',  0.45),
  makePlant(3, 'Planta Gamma',   'BAJO',  'BAJANDO',  0.20),
  makePlant(4, 'Planta Delta',   'ALTO',  'SUBIENDO', 0.90),
  makePlant(5, 'Planta Epsilon', 'MEDIO', 'ESTABLE',  0.50),
  makePlant(6, 'Planta Zeta',    'BAJO',  'BAJANDO',  0.15),
];

describe('PlantRiskList', () => {
  // ── Estado vacío ───────────────────────────────────────────────────────────
  it('muestra "No hay datos de plantas." cuando plants es []', () => {
    render(<PlantRiskList plants={[]} />);
    expect(screen.getByText('No hay datos de plantas.')).toBeInTheDocument();
  });

  it('no renderiza la tabla cuando plants es []', () => {
    render(<PlantRiskList plants={[]} />);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  // ── Renderizado básico ─────────────────────────────────────────────────────
  it('renderiza los encabezados de la tabla', () => {
    render(<PlantRiskList plants={[plants6[0]]} />);
    expect(screen.getByText('Planta')).toBeInTheDocument();
    expect(screen.getByText('Ubicación')).toBeInTheDocument();
    expect(screen.getByText('Nivel de riesgo')).toBeInTheDocument();
    expect(screen.getByText('Tendencia')).toBeInTheDocument();
  });

  it('muestra el nombre de la planta en la tabla', () => {
    render(<PlantRiskList plants={[plants6[0]]} />);
    expect(screen.getByText('Planta Alpha')).toBeInTheDocument();
  });

  it('muestra la ubicación de la planta', () => {
    render(<PlantRiskList plants={[plants6[0]]} />);
    expect(screen.getByText('Ubicación 1')).toBeInTheDocument();
  });

  it('muestra "—" para planta sin ubicacionNombre', () => {
    const plantSinUbicacion = { ...plants6[0], ubicacionNombre: undefined };
    render(<PlantRiskList plants={[plantSinUbicacion]} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  // ── Filtro por nivel de riesgo ─────────────────────────────────────────────
  // Nota: el <input type="text" list="plant-names"> también tiene rol "combobox"
  // en ARIA, por lo que getByRole('combobox') es ambiguo. Usamos getByDisplayValue
  // para apuntar específicamente al <select> por su opción seleccionada.

  it('filtra por nivel ALTO: solo muestra plantas ALTO', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByDisplayValue('Todos los niveles'), { target: { value: 'ALTO' } });
    expect(screen.getByText('Planta Alpha')).toBeInTheDocument();
    expect(screen.getByText('Planta Delta')).toBeInTheDocument();
    expect(screen.queryByText('Planta Beta')).not.toBeInTheDocument();
    expect(screen.queryByText('Planta Gamma')).not.toBeInTheDocument();
  });

  it('filtra por nivel MEDIO', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByDisplayValue('Todos los niveles'), { target: { value: 'MEDIO' } });
    expect(screen.getByText('Planta Beta')).toBeInTheDocument();
    expect(screen.getByText('Planta Epsilon')).toBeInTheDocument();
    expect(screen.queryByText('Planta Alpha')).not.toBeInTheDocument();
  });

  it('filtra por nivel BAJO', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByDisplayValue('Todos los niveles'), { target: { value: 'BAJO' } });
    expect(screen.getByText('Planta Gamma')).toBeInTheDocument();
    expect(screen.queryByText('Planta Alpha')).not.toBeInTheDocument();
  });

  // ── Filtro por búsqueda ────────────────────────────────────────────────────
  it('filtra por término de búsqueda (case-insensitive)', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre...'), {
      target: { value: 'alpha' },
    });
    expect(screen.getByText('Planta Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Planta Beta')).not.toBeInTheDocument();
  });

  it('muestra mensaje cuando la búsqueda no tiene resultados', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre...'), {
      target: { value: 'XXXXXX' },
    });
    expect(
      screen.getByText('No se encontraron plantas con los criterios seleccionados.'),
    ).toBeInTheDocument();
  });

  // ── Botón "Limpiar filtros" ────────────────────────────────────────────────
  it('muestra "Limpiar filtros" cuando hay filtro de nivel activo', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByDisplayValue('Todos los niveles'), { target: { value: 'ALTO' } });
    expect(screen.getByText('Limpiar filtros')).toBeInTheDocument();
  });

  it('muestra "Limpiar filtros" cuando hay término de búsqueda activo', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre...'), {
      target: { value: 'Alpha' },
    });
    expect(screen.getByText('Limpiar filtros')).toBeInTheDocument();
  });

  it('limpiar filtros restaura la vista completa', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.change(screen.getByDisplayValue('Todos los niveles'), { target: { value: 'ALTO' } });
    fireEvent.click(screen.getByText('Limpiar filtros'));
    expect(screen.getByText('Planta Beta')).toBeInTheDocument();
    expect(screen.getByText('Planta Gamma')).toBeInTheDocument();
  });

  it('no muestra "Limpiar filtros" cuando no hay filtros activos', () => {
    render(<PlantRiskList plants={plants6} />);
    expect(screen.queryByText('Limpiar filtros')).not.toBeInTheDocument();
  });

  // ── Paginación ─────────────────────────────────────────────────────────────
  it('muestra controles de paginación cuando hay más de 5 plantas', () => {
    render(<PlantRiskList plants={plants6} />);
    expect(screen.getByText(/Página 1 de/)).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
    expect(screen.getByText('Anterior')).toBeInTheDocument();
  });

  it('no muestra controles de paginación con 5 o menos plantas', () => {
    render(<PlantRiskList plants={plants6.slice(0, 5)} />);
    expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
  });

  it('navega a la página 2 al hacer clic en "Siguiente"', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.click(screen.getByText('Siguiente'));
    expect(screen.getByText(/Página 2 de/)).toBeInTheDocument();
    expect(screen.getByText('Planta Zeta')).toBeInTheDocument();
  });

  it('regresa a la página 1 al hacer clic en "Anterior"', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.click(screen.getByText('Siguiente'));
    fireEvent.click(screen.getByText('Anterior'));
    expect(screen.getByText(/Página 1 de/)).toBeInTheDocument();
    expect(screen.getByText('Planta Alpha')).toBeInTheDocument();
  });

  it('"Anterior" está deshabilitado en la primera página', () => {
    render(<PlantRiskList plants={plants6} />);
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });

  it('"Siguiente" está deshabilitado en la última página', () => {
    render(<PlantRiskList plants={plants6} />);
    fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
  });

  // ── Selección de planta ────────────────────────────────────────────────────
  it('llama a onSelectPlanta al hacer clic en una fila', () => {
    const mockSelect = jest.fn();
    render(<PlantRiskList plants={[plants6[0]]} onSelectPlanta={mockSelect} />);
    fireEvent.click(screen.getByRole('row', { name: /Planta Alpha/ }));
    expect(mockSelect).toHaveBeenCalledWith(plants6[0]);
  });

  it('resalta la fila de la planta seleccionada (selectedId)', () => {
    render(<PlantRiskList plants={[plants6[0]]} selectedId={1} />);
    expect(screen.getByRole('row', { name: /Planta Alpha/ })).toHaveClass('border-l-[#2563eb]');
  });

  it('no resalta otras filas cuando hay una planta seleccionada', () => {
    render(
      <PlantRiskList plants={plants6.slice(0, 2)} selectedId={1} />,
    );
    expect(screen.getByRole('row', { name: /Planta Beta/ })).not.toHaveClass('border-l-[#2563eb]');
  });
});
