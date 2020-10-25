const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log(`start: ${ctx.url}`);
  await next(); 
  const end = new Date().getTime();
  console.log(`consumer time: ${end - start}`);
})

app.use(async (ctx, next) => {
  ctx.body = [
    {
      name: 'arrow'
    }
  ];
  await next();
});

app.listen(6090, err => {
  if (err) {
    console.log(`服务启动失败： ${err}`);
  } else {
    console.log('服务启动成功：6090');
  };
});