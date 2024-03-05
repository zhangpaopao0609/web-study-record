const Arrow = require('./arrow.js');
const app = new Arrow();

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end('hi arrow');
// });

// app.use((ctx) => {
//   ctx.body = 'hi arrow 1';
// });

const delay = () => new Promise(resolve => setTimeout(resolve, 2000));

app.use(async (ctx, next) => {
  ctx.body = '1';
  await next();
  ctx.body += '5';
});

app.use(async (ctx, next) => {
  ctx.body += '2';
  await delay();
  await next();
  ctx.body += '4';
});

app.use(async (ctx, next) => {
  ctx.body += '3';
});

app.listen(6091, err => {
  if (err) {
    console.log(`服务启动失败： ${err}`);
  } else {
    console.log('服务启动成功：6091');
  };
})