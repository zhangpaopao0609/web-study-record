const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();


router.get("/", ctx => {
  let name = Buffer.from("张三").toString("base64");
  ctx.cookies.set('aa', name, { maxAge: 1000*60*60 })
  ctx.body = "text";
});

router.get("/aa", ctx => {
  console.log(Buffer.from(ctx.cookies.get("aa"), "base64").toString());
  ctx.body = "cookie";
});


app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});