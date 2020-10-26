const http = require('http');
const context = require('./context.js');
const request = require('./request.js');
const response = require('./response.js');

class Arrow {
  // 初始化中间件数据
  constructor() {
    this.middleware = [];
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res);
      // 创建上下文
      const ctx = this.createContext(req, res);
      // this.callback(ctx);
      // 中间件组合
      const fn = this.compose(this.middleware);
      // 执行
      await fn(ctx);
      // 响应
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  use(middleware) {
    this.middleware.push(middleware);
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

  /**
   * 中间件组合
   * @param {*} middlewares 
   */
  compose = middlewares => {
    return ctx => {
      const dispatch = i => {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        } else {
          const next = () => dispatch(i + 1);
          return Promise.resolve(
            // Promise 完成，再执行下一个
            fn(ctx, next)
          )
        }
      }
      return dispatch(0);
    }
  }
};

module.exports = Arrow;