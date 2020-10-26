const http = require('http');
const context = require('./context.js');
const request = require('./request.js');
const response = require('./response.js');

class Arrow{
  listen(...args) {
    const server = http.createServer((req, res) => {
      // this.callback(req, res);
      // 创建上下文
      const ctx = this.createContext(req, res);
      this.callback(ctx);
      // 相应
      res.end(ctx.body)
    });
    server.listen(...args);
  }
  use(callback) {
    this.callback = callback;
  }
  /**
   * 构建上下文
   */
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object(request);
    ctx.response = Object(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.request.res = res;

    return ctx;
  }
};

module.exports = Arrow;