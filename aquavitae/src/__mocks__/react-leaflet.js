const React = require('react');
module.exports = {
  MapContainer: ({ children }) => React.createElement('div', { 'data-testid': 'map' }, children),
  TileLayer: () => null,
  Marker: ({ children }) => React.createElement('div', null, children),
  Popup: ({ children }) => React.createElement('div', null, children),
  useMap: () => ({}),
};