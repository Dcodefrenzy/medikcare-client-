const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/app',
    proxy({
      target: 'http://192.168.33.12:3000/',
      changeOrigin: true,
    })
  );
};