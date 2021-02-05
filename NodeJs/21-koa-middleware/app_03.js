const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 错误处理中间件  
// 这很有意思耶，洋葱圈模式
app.use((ctx, next) => {
  console.log("这里应用级中间件！");
  next();
  if(ctx.status === 404) {
    ctx.status = 404;
    ctx.body = "这是一个404页面哟！";
  }else {
    console.log(ctx.url);
  }
})

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