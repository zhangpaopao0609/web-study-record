const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/article/:id', (ctx, next) => {
  console.log(ctx.params);
  const {id} = ctx.params
  ctx.body = "test-dynamic" + id || "no-query";
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});