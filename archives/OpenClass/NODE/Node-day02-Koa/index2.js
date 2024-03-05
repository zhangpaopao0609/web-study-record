const Koa = require('koa');
const app = new Koa();
const Router = require('./router/index.js');
const router = new Router();

// 使⽤
const static = require('./static')
app.use(static(__dirname + '/public'));

router.get('/index', async ctx => {
  console.log('index-arrow');
  ctx.body = 'index-arrow';
});

router.get('/list', async ctx => { ctx.body = 'list-arrow' });

app.use(router.routes());

app.listen(6091, err => {
  if (err) {
    console.log(`服务启动失败： ${err}`);
  } else {
    console.log('服务启动成功：6091');
  };
});