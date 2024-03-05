const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const app = new Koa();

// 配置 session 的中间件
app.use(cors({
  credentials: true
}));

app.keys = ['arrow'];

app.use(static(__dirname + '/'));
app.use(bodyParser());
app.use(session(app));

// 鉴权方法
app.use((ctx, next) => {
  if(ctx.url.indexOf('login') > -1) {
    next();
  }else {
    if(!ctx.session.userinfo) {
      ctx.body = '登录失败！';
    }else {
      next();
    };
  };
});

router.post('/users/login', async ctx => {
  const { body } = ctx.request;
  // 用户名密码匹配

  // 设置session 
  ctx.session.userinfo = body.username;

  ctx.body = {
    message: '登录成功'
  };
});

router.post('/users/logout', async ctx => {
  // 删除 userinfo
  delete ctx.session.userinfo;

  ctx.body = {
    message: '登出成功！'
  };
});

router.get('/users/getUser', async ctx => {
  ctx.body = {
    message: '获取成功！',
    userinfo: ctx.session.userinfo
  };
});

app.use(router.routes());

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});