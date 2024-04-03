const Koa = require('koa');

const app = new Koa();
const session = require('koa-session');

app.keys = ['some secret'];

// 配置
const SESSION_CONFIG = {
  key: 'arrow',
  maxAge: 86400000,
  httpOnly: true, // 仅能服务器端修改，JS无法读取
  // signed: false     // 防止session被篡改
  signed: true, // 防止session被篡改， 签名 cookie
};

// 注册
app.use(session(SESSION_CONFIG, app));

// 测试
app.use((ctx) => {
  if (ctx.path === '/favicon.ico') {
    return;
  }
  // 获取
  let count = ctx.session.count || 0;
  let num = ctx.session.num || 0;
  console.log(ctx.session, count);
  // 设置
  ctx.session.count = ++count;
  ctx.session.num = ++num;
  ctx.body = `第${count}访问`;
});

const port = 6090;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app start at ${port}`);
});
