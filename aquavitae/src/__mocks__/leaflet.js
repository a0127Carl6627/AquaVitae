const layerStub = () => ({
  addTo: jest.fn().mockReturnThis(),
  setStyle: jest.fn(),
  bindTooltip: jest.fn(),
  on: jest.fn(),
  remove: jest.fn(),
});

const mapStub = {
  setView: jest.fn().mockReturnThis(),
  remove: jest.fn(),
};

const leafletMock = {
  __esModule: true,
  icon: () => ({}),
  Icon: {
    Default: {
      mergeOptions: () => {},
    },
  },
  map: jest.fn(() => mapStub),
  tileLayer: jest.fn(layerStub),
  geoJson: jest.fn(layerStub),
};

leafletMock.default = leafletMock;
module.exports = leafletMock;
