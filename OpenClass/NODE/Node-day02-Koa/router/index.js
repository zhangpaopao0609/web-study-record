class Router {
  constructor() {
    this.stack = [];
  }

  regieter(path, methods, middleware) {
    let route = { path, methods, middleware };
    this.stack.push(route);
  }

  // 现在只支持get和post，其他的同理
  get(path, middleware) {
    this.regieter(path, 'get', middleware);
  }

  post(path, middleware) {
    this.regieter(path, 'post', middleware);
  }

  routes() {
    const stock = this.stack;
    return async (ctx, next) => {
      const currentPath = ctx.url;
      let route;
      for (let i = 0; i < stock.length; i++) {
        const item = stock[i];
        if(currentPath === item.path && item.methods.indexOf(ctx.method.toLowerCase()) >= 0) {
          // 判断 path 和 method
          route = item.middleware;
          break;
        }
      };
      if(typeof route === 'function') {
        route(ctx, next);
        return;
      }
      await next();
    };
  };
};

module.exports = Router;
