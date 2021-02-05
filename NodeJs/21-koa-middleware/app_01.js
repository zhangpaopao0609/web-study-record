const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 应用级中间件
app.use((ctx, next) => {
  console.log(new Date().toLocaleString());
  next();
});

router.get("/", ctx => {
  ctx.body = "get/"
})

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});