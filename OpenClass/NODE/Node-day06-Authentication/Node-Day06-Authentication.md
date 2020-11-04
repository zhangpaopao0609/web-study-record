# Node-Day06-Authentication
Koa 实战 - 登录认证
- Session/Cookie
- Token
- OAuth
- SSO

在技术上为全栈实现了一种可能

# 鉴权
- cookie-session 模式
- token jwt 模式
- Oauth2 模式
- SSO 单点登录

# sesson-cookie 模式
```js
// 观察 cookie
  console.log(req.headers.cookie);

  // 设置 cookie
  res.setHeader('Set-Cookie', 'cookie1=arrow');
```
每次发送请求，浏览器都会将所有 cookie 放到 req 中
cookie 的不足：
1. 容量小
2. 不安全
  利用js直接都可以获取，用 curl 都能够获取

因此，最好有一个能够直接东西能够把数据存在后端，前端只用某个字段来后端取对应的数据即可，而不是由前端来保存对应的数据
```js
const http = require('http');
const { Session } = require('inspector');
const session = {};

const app = http.createServer((req, res) => {
  // 设置 cookie
  const sessionKey = 'arrow';
  const cookie = req.headers.cookie;
  if(cookie && cookie.indexOf(sessionKey) > -1) {
    res.end('come back');
    const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
    const sid = pattern.exec(cookie)[1];
    console.log('session', sid, session, session[sid]);
  }else {
    const sid = (Math.random() * 99999).toFixed();
    // 设置cookie
    res.setHeader('Set-Cookie', `${sessionKey}=${sid}`);
    session[sid] = { name: 'arrow' };
    res.end('hello!');
  }
});
```
这样做，数据保存在了后端，不仅不需要前端保存数据了，同时也没有了安全风险，前端永远也拿不到对应的敏感数据
这也就是session的原理的解析

# 哈希 HASH -SHA MD5
- 把一个不定长摘要成定长结果
- 摘要
- 雪崩效应
hash算法

# redis
键值服务器， 存储session
