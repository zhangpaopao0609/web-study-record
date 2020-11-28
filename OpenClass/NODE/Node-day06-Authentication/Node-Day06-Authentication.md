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

# Token 验证
- session 不足
  - 服务器有状态
  - 不灵活如果 APP 该怎么办， 跨域怎么办
![token-process](./img/token-process.png)
1. 客户端使用用户名跟密码请求登录
2. 服务端收到请求，去验证用户名和密码
3. 验证成功后，服务端会签发一个令牌（Token）,再把这个 Token 发送给客户端
4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里面
5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
6. 服务端接收到请求，然后去验证客户端请求里面带着的Token，如果验证成功，就想客户端返回请求的数据

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdCIsImV4cCI6MTYwNjU1ODk2MCwiaWF0IjoxNjA2NTU1MzYwfQ.OdiZ-tJfQ1-X3PcG2hl7OKmU-gOF-jB6DG49xIwZwBw
```
Bearer Token 包含三个组成部分： 令牌头、payload、哈希

第一段： base64 编码   
头部、申明部分
![jwt-01](./img/jwt-01.png)

第二段： base64 编码
body， 密文结果
![jwt-02](./img/jwt-02.png)

第三段： 不是base64编码， 哈希
也就是对前面部分的一个签名，防止整个令牌被篡改，进行伪造

**也就是说，前面两个部分和后面一部分是一一对应的，是存在对应关系的，这个对应关系有一个中间件，就是设置的secret， 加密的密钥**，也就是说，后面部分的哈希是通过前面两个部分和一个密钥通过加密算法计算出来的，那么jwt在验证的时候，就用前面两部分和密钥使用加密算法进行加密，然后计算出结果，如果结果和后面的哈希相同，那说明验证通过，反之。当然，在payload里面是存在有效期，验证成功后，自然也就可以根据有效期来返回结果了，如果没有验证通过，直接就可以返回结果false了