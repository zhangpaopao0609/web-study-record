const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const render = require('koa-art-template');

const DB = require('./module/db');

const app = new Koa();
const router = new KoaRouter();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== "production"
})

router.get("/", async ctx => {
  const res = await DB.find("users", {});
  console.log(res);
  ctx.body = "text";
});

router.get("/login", async ctx => {
  const res = await DB.insert("users", {name: 'zhang', age: 10});
  console.log(res);
  await ctx.render("login", {msg: 1});
});

router.get("/update", async ctx => {
  const res = await DB.update("users", {name: 'zhang'}, {$set: {name: "zhang1"}});
  console.log(res);
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