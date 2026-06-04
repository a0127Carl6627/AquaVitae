import React from 'react';
import { render, screen } from '@testing-library/react';
import MexicoRiskMap from '../../../components/maps/MexicoRiskMap';

// El GeoJSON puede ser muy grande; se sustituye por stub mínimo.
jest.mock('../../../components/maps/assets/mexico-geojson.json', () => ({
  type: 'FeatureCollection',
  features: [],
}));

// Leaflet inicializa el mapa de forma asíncrona (import('leaflet').then(...)).
// En jsdom esa promesa rechaza porque Canvas/WebGL no están disponibles.
// El handler vacío evita que el worker de Jest colapse; los tests solo verifican
// el HTML estático (leyenda, testid) que se renderiza de forma síncrona.
const suppressLeafletRejection = () => {};
beforeAll(() => {
  process.on('unhandledRejection', suppressLeafletRejection);
});
afterAll(() => {
  process.removeListener('unhandledRejection', suppressLeafletRejection);
});

const plantasMock = [
  {
    idPlanta: 1,
    nombre: 'Planta Jalisco',
    estado: 'Jalisco',
    riesgo: 'alta',
    riesgoLabel: 'Alto',
  },
  {
    idPlanta: 2,
    nombre: 'Planta Sonora',
    estado: 'Sonora',
    riesgo: 'bajo',
    riesgoLabel: 'Bajo',
  },
];

describe('MexicoRiskMap', () => {
  it('renderiza el contenedor raíz sin romper', () => {
    render(<MexicoRiskMap />);
    expect(screen.getByText('Riesgo bajo')).toBeInTheDocument();
  });

  it('muestra los 4 chips de la leyenda', () => {
    render(<MexicoRiskMap />);
    expect(screen.getByText('Riesgo bajo')).toBeInTheDocument();
    expect(screen.getByText('Riesgo medio')).toBeInTheDocument();
    expect(screen.getByText('Riesgo alto')).toBeInTheDocument();
    expect(screen.getByText('Seleccionada')).toBeInTheDocument();
  });

  it('aplica la altura como estilo inline al div del mapa', () => {
    render(<MexicoRiskMap height={500} />);
    expect(screen.getByTestId('map-container')).toHaveStyle({ height: '500px' });
  });

  it('usa la altura por defecto (340) cuando no se proporciona', () => {
    render(<MexicoRiskMap />);
    expect(screen.getByTestId('map-container')).toHaveStyle({ height: '340px' });
  });

  it('renderiza con array de plantas sin romper', () => {
    render(<MexicoRiskMap plantas={plantasMock} />);
    expect(screen.getByText('Riesgo alto')).toBeInTheDocument();
  });

  it('renderiza con array vacío de plantas', () => {
    render(<MexicoRiskMap plantas={[]} />);
    expect(screen.getByText('Riesgo bajo')).toBeInTheDocument();
  });

  it('renderiza con selectedEstado sin romper', () => {
    render(<MexicoRiskMap plantas={plantasMock} selectedEstado="Jalisco" />);
    expect(screen.getByText('Seleccionada')).toBeInTheDocument();
  });

  it('renderiza con onSelectPlanta callback sin romper', () => {
    const handleSelect = jest.fn();
    render(<MexicoRiskMap plantas={plantasMock} onSelectPlanta={handleSelect} />);
    expect(screen.getByText('Riesgo bajo')).toBeInTheDocument();
  });
});
