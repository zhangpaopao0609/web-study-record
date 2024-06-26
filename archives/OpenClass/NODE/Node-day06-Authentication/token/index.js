const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');
const cors = require('koa2-cors');
const static = require('koa-static');

const app = new Koa();

const secret = 'it\'s a secret';
app.keys = ['some secret'];

app.use(static(`${__dirname}/`));
app.use(bodyParser());

router.post('/users/login-token', async (ctx) => {
  const { body } = ctx.request;
  // 用户密码匹配

  const userinfo = body.username;
  ctx.body = {
    message: '登录成功！',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }, secret),
  };
});

router.get('/users/getUser-token', jwtAuth({
  secret,
}), async (ctx) => {
  console.log(ctx.state.user);
  ctx.body = {
    message: '获取成功！',
    userinfo: ctx.state.user.data,
  };
});

app.use(router.routes());

const port = 6090;
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`app start at ${port}`);
});
