import * as Koa from "koa";
import { get, post } from "../utils/decorate"

const users = [{
  name: 'arrow'
}];

export default class User {
  @get("/user")
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      data: users
    }
  }
  @post('/user')
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}