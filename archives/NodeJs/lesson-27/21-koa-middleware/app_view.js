const Koa = require('koa');
const Router = require('koa-router');

// 第三方中间件
const views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(views(__dirname+'/views', { extension: 'ejs' }));

// 配置公共信息
app.use(async (ctx, next) => {
  ctx.state.name = "arrow";
  await next();
})

router.get("/", async ctx => {
  await ctx.render('index', { msg: "hello" });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});