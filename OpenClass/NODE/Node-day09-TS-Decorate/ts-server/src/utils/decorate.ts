import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';

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

export const get = (path: string, options?: RouteOptions) => (
  (target, name, descriptor) => {
    return router.get(path, descriptor.value)
  }
)





