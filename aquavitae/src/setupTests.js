// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom no implementa ResizeObserver ni layout real.
// Recharts usa ResizeObserver en ResponsiveContainer y lanza console.warn
// cuando el contenedor tiene width/height = 0. Se mockea globalmente aquí
// para que todos los tests que usen gráficas de Recharts no generen ese ruido.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// ResponsiveContainer de Recharts delega su tamaño al DOM vía ResizeObserver.
// En jsdom siempre reporta 0×0. Mockearlo para que pase width/height fijos
// evita los warnings en todos los archivos de prueba sin tocar cada uno.
jest.mock('recharts', () => {
  const Recharts = jest.requireActual('recharts');
  const React = require('react');
  return {
    ...Recharts,
    ResponsiveContainer: ({ children, height }) =>
      React.createElement(
        'div',
        { style: { width: 800, height: height || 300 } },
        React.cloneElement(
          React.Children.only(children),
          { width: 800, height: height || 300 },
        ),
      ),
  };
});
