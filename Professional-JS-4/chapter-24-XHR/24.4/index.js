const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);


app.use(static(__dirname + '/'))
app.use(bodyParser());

app.use(async (ctx, next) => {
  next();
});

router.get('/test', async ctx => {
  ctx.body = {
    arrow: 'bullet'
  };
})

router.post('/send-me-params', async ctx => {
  ctx.body = ctx.request.body
})

// router.get('/image', async ctx => {
//   const data = await readFile('./test.png');
//   ctx.body = data;
// })

router.get('/image', async ctx => {
  const data = fs.readFileSync('./test.png');
  console.log(data);
  ctx.body = data;
})

app.use(router.routes());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});