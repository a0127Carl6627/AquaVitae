const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const CLOUD = 'https://aquavitae-backend-1005047638592.us-central1.run.app';
  // API (incluye ARIMA): default nube, override local con REACT_APP_PROXY_TARGET.
  const apiTarget = process.env.REACT_APP_PROXY_TARGET || CLOUD;

  // Login SIEMPRE contra la nube, para usar cuentas reales (ej. Director).
  app.use('/auth', createProxyMiddleware({ target: CLOUD, changeOrigin: true, secure: false }));
  // El resto de la API contra el target configurado (local en la demo de ARIMA).
  app.use('/api', createProxyMiddleware({ target: apiTarget, changeOrigin: true, secure: false }));
};
