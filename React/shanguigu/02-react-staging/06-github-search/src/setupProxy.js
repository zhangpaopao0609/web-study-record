const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(
      '/api_1', {
        target: 'http://localhost:6090',
        pathRewrite: { '^/api_1': '' },
      }
    ),
    createProxyMiddleware(
      '/api_2', {
        target: 'http://localhost:6090',
        pathRewrite: { '^/api_2': '' },
      }
    ),
  )
};