# Node-day02-Koa
首先原生http的不足
- if else 来区分 url, 最好是有一个 router 来解决
- response.end() 流的操作， response是一个流 stream
- 描述复杂业务的时候
  流程描述
  切面描述AOP

1. 令人困惑的request和response
  res.end() —— response是一个流
  res.writeHead
2. 难以描述复杂的业务逻辑
  流程描述
  切面描述AOP（切面描述就是在做什么之前或之后要做什么，比如在发起请求之前要做鉴权）

所以需要框架来解决这些问题
# Koa
概述：Koa是一个新的 web 框架，致力于成为 web 应用和 API开发领域中的一个更小、更富有表现力、更健壮的基石
Koa 是 express 的下一代基于 Node.js 的 web 框架（因为es5出现了generator语法，koa也是基于generator来写的）
Koa2 完全使用 Promise 并配合 async 来实现异步
- 特点
  - 轻量，无捆绑
  - 中间件架构
  - 优雅的 API 设计
  - 增强的错误处理

```js
const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = [
    {
      name: 'arrow'
    }
  ]
});

app.listen(6090, err => {
  if (err) {
    console.log(`服务启动失败： ${err}`);
  } else {
    console.log('服务启动成功：6090');
  };
});
```

ctx: context 就是对 request， response 的封装
next() : 执行下一个中间件
![midway](./img/01-midway.png)
