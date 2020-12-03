import * as Koa from "koa";
import { get } from "../utils/decorate";

export default class Product {
  @get('/detail')
  public detail(ctx: Koa.Context) {
    ctx.body = {
      code: 100,
      data: 'detail'
    }
  }
}