const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/board', {
      target: 'http://i7d211.p.ssafy.io:8081', //접속하려는 서버의 루트 URL
      changeOrigin: true,
    })
  );
};