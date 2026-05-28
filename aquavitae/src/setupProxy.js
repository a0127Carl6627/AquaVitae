const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth'],
    createProxyMiddleware({
      target: 'https://aquavitae-backend-1005047638592.us-central1.run.app',
      changeOrigin: true,
      secure: false,
    })
  );
};
