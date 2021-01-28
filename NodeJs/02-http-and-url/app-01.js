// 引入 http 模块
const http = require('http');
const url = require('url');

/**
 * 创建一个 http 服务
 * req: 获取客户端传过来的信息
 * res: 给浏览器的响应信息
 */
http.createServer((req, res) => {
  const query = url.parse(req.url, true);
  res.writeHead(200, {"Content-Type": "text/html; charset='utf-8'"});
  res.end('test');
}).listen(8080);

