const Koa = require('koa');
const app = new Koa();
// const bodyparser = require('koa-bodyparser');
const router = require('koa-router')();

app.use(require('koa-static')(__dirname + '/'));

app.use(async (ctx, next) => {
  console.log('body-parser......');
  const req = ctx.request.req;
  const reqData = [];
  let size = 0;
  await new Promise((resolve, reject) => {
    req.on('data', data => {
      console.log(`>>>>req ${data}`);
      reqData.push(data);
      size += data.length;
    });

    req.on('end', () => {
      console.log('>>>>end');
      const data = Buffer.concat(reqData);
      console.log(`data: ${size} ${data.toString()}`);
      ctx.request.body = data.toString();
      resolve();
    })
  })
  await next();
});

router.post('/add', async (ctx, next) => {
  console.log(`body ${ctx.request.body}`);
  ctx.body = ctx.request.body;
  await next();
});

app.use(router.routes());

app.listen(6090);