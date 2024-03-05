const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 路由级中间件
router.get("/news", (ctx, next) => {
  console.log("路由级中间件！");
  next();
})

router.get("/news", ctx => {
  ctx.body = "get/"
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});