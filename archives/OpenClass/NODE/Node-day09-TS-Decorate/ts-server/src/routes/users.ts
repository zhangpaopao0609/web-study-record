import * as Koa from "koa";
import { get, post, middlewares } from "../utils/decorate";

@middlewares([
  async function guard(ctx: Koa.Context, next: () => Promise<any>) {
    if(ctx.header.token) {
      await next();
    }else {
      throw '请登录！'
    }
  }
])
export default class User {
  @get("/user")
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      data: {
        name: 'arrow'
      }
    }
  }
  @post('/user', {
    middlewares: [
      async function validation(ctx: Koa.Context, next: () => Promise<any>) {
        // 用户名必须
        const name = ctx.request.body.name;
        if(!name) {
          throw "请输入用户名！"
        }
        await next();
      }
    ]
  })
  public add(ctx: Koa.Context) {
    ctx.body = { ok: 1 };
  }
}