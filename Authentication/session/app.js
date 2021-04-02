const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

app.keys = ['my keys'];

// 配置
const SESSION_CONFIG = {
  key: 'arrow:sess',
  maxAge: 86400000,
  httpOnly: true,
  signed: true
};

// 注册
app.use(session(SESSION_CONFIG, app));

app.use(ctx => {
  if(ctx.url === '/favicon.ico') {
    return;
  }
  // 获取 session
  let n = ctx.session.count || 0;
  // 设置
  ctx.session.count = ++n;
  ctx.body = `第${n}次`
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});