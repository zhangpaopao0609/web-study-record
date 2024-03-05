const express = require('express');
const app = express();
const {createProxyMiddleware} = require('http-proxy-middleware');

app.use(express.static(__dirname +  '/'));

app.use('/api', createProxyMiddleware({
  target: "http://localhost:6090"
}));

app.listen(6091);
