const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const render = require('koa-art-template');

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== "production"
})

router.get("/", ctx => {
  ctx.body = "text";
});

router.get("/login", async ctx => {
  await ctx.render("login", {msg: 1});
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});