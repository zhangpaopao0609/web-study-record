const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
const redisStore = require('koa-redis');
const redis = require('redis');
const redisClient = redis.createClient(6379, '134.175.53.155');

const wrapper = require('co-redis');
const client = wrapper(redisClient);

app.keys = ['some secret'];

app.use(session({
  key: 'arrow',
  store: redisStore({ client })
}, app));

app.use(async (ctx, next) => {
  const keys = await client.keys('*');
  keys.forEach(async key => {
    console.log(await client.get(key));
  });
  await next();
});

// 测试
app.use(ctx => {
  if(ctx.path === '/favicon.ico') return;
  // 获取
  let count = ctx.session.count || 0;
  let num = ctx.session.num || 0;
  // 设置
  ctx.session.count = ++count;
  ctx.session.num = ++num;
  ctx.body = `第${count}访问`;
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});
