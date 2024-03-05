const Koa = require('koa');
const Router = require('koa-router');

// 第三方中间件
const views = require('koa-views');

const app = new Koa();
const router = new Router();

app.use(views(__dirname + '/views', { extension: 'ejs' }));

// 配置公共信息
app.use(async (ctx, next) => {
  ctx.state.name = "arrow";
  await next();
});

// post 的 body 数据
app.use(async (ctx, next) => {
  if(ctx.method.toLowerCase() === 'post' || ctx.method.toLowerCase() === 'put') {
    let res = await new Promise((resolve, reject) => {
      try {
        let res = "";
        ctx.req.on("data", chunk => {
          res += chunk;
        });
  
        ctx.req.on("end", () => {
          resolve(res);
        })
      } catch (error) {
        reject(error);
      }
    });
    ctx.request.body = res;
  }
  await next();
});

router.get("/", async ctx => {
  await ctx.render('index', { msg: "hello" });
});

router.get("/login", async ctx => {
  await ctx.render("login")
})

router.post("/doLogin", async ctx => {
  ctx.body = ctx.request.body;
})

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if (err) throw err;
  console.log(`app start at ${port}`);
});