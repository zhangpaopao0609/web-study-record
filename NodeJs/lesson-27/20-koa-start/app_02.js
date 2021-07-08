const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/article', (ctx, next) => {
  ctx.body = "what";
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});