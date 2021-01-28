// 引入 http 模块
const http = require('http');

/**
 * 创建一个 http 服务
 * req: 获取客户端传过来的信息
 * res: 给浏览器的响应信息
 */
http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {"Content-Type": "text/html; charset='utf-8'"});
  // 返回 并且 结束响应
  res.write('<head><meta charset="UTF-8"></head>')
  res.write('你好 nodejs');
  res.end();
}).listen(8080);

