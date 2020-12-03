import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as path from 'path';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
  /**
   * 路由⽂件扩展名，默认值是`.{js,ts}`
   */
  extname?: string;
};
type RouteOptions = {
  /**
   * 适⽤于某个请求⽐较特殊，需要单独制定前缀的情形
   */
  prefix?: string;
  /**
   * 给当前路由添加⼀个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();

const decorate = (method: HTTPMethod, path: string, options: RouteOptions, router: KoaRouter) => {
  return (target, property, descriptor) => {
    const url = options && options.prefix ? options.prefix + path : path;
    return router[method](url, descriptor.value);
  }
};

const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router);

export const get = method('get');
export const post = method('post');
export const put = method('put');
export const del = method('del');
export const patch = method('patch');

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}';
  glob.sync(path.join(folder, `./**/*${extname}`)).forEach(item => {
    require(item);
  });
  return router;
}




