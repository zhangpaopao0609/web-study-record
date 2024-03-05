const Koa = require('koa');
const KoaRouter = require('koa-router');
const session = require('koa-session');

const app = new Koa();
const router = new KoaRouter();

app.keys = ['arrow'];

app.use(session({ maxAge: 60000 }, app));

router.get("/", ctx => {
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + 'views';
});

// router.get("/aa", ctx => {
//   ctx.body = "cookie";
// });

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});