const path = require('path');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const serve = require('koa-static');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');

const usersRouter = require("./routes/users");

const app = new Koa();
const router = new KoaRouter();

app.use(serve(__dirname + '/public'));
app.use(bodyParser());

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== "production"
});

// 导出的路由需要采用中间件的方式
app.use(usersRouter.routes());

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});