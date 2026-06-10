/**
 * Pruebas unitarias para AuditoriaKpis.
 *
 * Valida:
 *  - Renderizado de los 4 KPIs.
 *  - Valores recibidos desde resumen.
 *  - Valores por defecto en cero.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import AuditoriaKpis from '../../../components/Auditoria/AuditoriaKpis';

describe('AuditoriaKpis — unitarias', () => {
  it('renderiza los títulos de los KPIs', () => {
    render(<AuditoriaKpis resumen={{}} />);

    expect(screen.getByText('Eventos totales')).toBeInTheDocument();
    expect(screen.getByText('Usuarios auditados')).toBeInTheDocument();
    expect(screen.getByText('Eventos hoy')).toBeInTheDocument();
    expect(screen.getByText('Eventos críticos')).toBeInTheDocument();
  });

  it('renderiza los subtítulos de los KPIs', () => {
    render(<AuditoriaKpis resumen={{}} />);

    expect(screen.getByText('Registros protegidos')).toBeInTheDocument();
    expect(screen.getByText('Con actividad registrada')).toBeInTheDocument();
    expect(screen.getByText('Actividad reciente')).toBeInTheDocument();
    expect(screen.getByText('Requieren atención')).toBeInTheDocument();
  });

  it('muestra los valores recibidos en el resumen', () => {
    render(
      <AuditoriaKpis
        resumen={{
          registrosInmutables: 60,
          usuariosAuditados: 7,
          eventosHoy: 18,
          cambiosCriticos: 4,
        }}
      />
    );

    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('muestra cero cuando no recibe datos en resumen', () => {
    render(<AuditoriaKpis resumen={{}} />);

    expect(screen.getAllByText('0')).toHaveLength(4);
  });

  it('muestra cero cuando resumen no viene definido', () => {
    render(<AuditoriaKpis />);

    expect(screen.getAllByText('0')).toHaveLength(4);
  });
});