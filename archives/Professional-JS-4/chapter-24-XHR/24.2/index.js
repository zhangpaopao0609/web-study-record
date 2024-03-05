const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');

app.use(static(__dirname + '/'))
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log(ctx);
  next();
});

router.get('/test', async ctx => {
  ctx.body = {
    arrow: 'bullet'
  };
})

app.use(router.routes());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});