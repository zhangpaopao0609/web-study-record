import * as Koa from "koa";
import { get } from "../utils/decorate"

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

  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}