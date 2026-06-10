// Mock de Leaflet para tests en jsdom.
// Se activa vía moduleNameMapper en package.json.
//
// __esModule: true es CRÍTICO: evita que _interopRequireDefault/Wildcard de babel
// envuelva el módulo en { default: mockL }, lo que haría que L.map sea undefined
// cuando el componente llama a import('leaflet').then(L => { L.map(...) }).

const mockMapInstance = {
  setView: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  addLayer: jest.fn(),
};

const mockL = {
  __esModule: true,
  map: jest.fn(() => mockMapInstance),
  tileLayer: jest.fn(() => ({ addTo: jest.fn() })),
  geoJson: jest.fn(() => ({ addTo: jest.fn() })),
};

module.exports = mockL;
