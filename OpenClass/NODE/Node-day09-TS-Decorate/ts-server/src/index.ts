import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";

import Users from "./routes/users";

const app = new Koa();

app.use(serve(`${__dirname}/public`));
app.use(bodify({
  multipart: true,
  //  使用非严格模式 允许 delete
  strict: false
}));

app.use((ctx: Koa.Context) => {
  ctx.body = 'Hello Koa';
});

const router = new Users();

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});