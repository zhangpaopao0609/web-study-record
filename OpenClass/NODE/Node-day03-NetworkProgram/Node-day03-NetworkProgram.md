# Node-day02-NetworkProgram
- 掌握 HTTP 协议
- 掌握跨域 CORS
- 掌握 bodyparser 原理
- 掌握上传原理
- 了解 socketio 实现实时聊天程序
- 爬虫

# 网络

<table>
  <tr>
    <td>OSI参考模型，网络七层协议</td>
    <td>TCP/IP协议</td>
  </tr>
  <tr>
    <td>7. 应用层</td>
    <td rowspan="3"><应用层><br />TELENT,SSH,HTTP,SMTP,POP,SSL/TLS,FTP,MIME,HTML,SNMP,MIB,SIP,RTP...</td>
  </tr>
  <tr>
    <td>6. 表示层</td>
  </tr>
  <tr>
    <td>5. 会话层</td>
  </tr>
  <tr>
    <td>4. 传输层</td>
    <td><传输层><br />TCP、UDP、UDP-Lite、SCTP、DCCP</td>
  </tr>
  <tr>
    <td>3. 网络层</td>
    <td><网络层><br/>ARP、IPv4、IPv6、ICMP、IPsec</td>
  </tr>
  <tr>
    <td>2. 数据链路层</td>
    <td rowspan="2">以太网、无线LAN、PPP...<br />（双绞线电缆、无线、光纤）</td>
  </tr>
  <tr>
    <td>1. 物理层</td>
  </tr>
</table>

TCP协议，三次握手，协商之后才能通信，面向可靠连接的协议
TCP协议，书包，TCP是一个可靠连接的协议，不丢包，所以包上写 TCP 是不丢包的， 因为它想见到美女就三次握手
UDP协议，不可靠连接，那么为什么要做这样一个协议呢，原因很简单，虽然不可靠，但是反应速度相对较快，一般用于游戏之中

TELENT: 远古的传输协议，但是问题是明文传输，慢慢得就被 SSH 给替代了，

SMTP: 发邮件
POP: 收邮件

SSL/TLS： 加密

# HTTP 协议
1. 特点
  - 无连接
  - 无状态
  - 简单快速
  - 灵活

2. request —— 上行报文
请求行: GET / HTTP/1.1
- method
- requestUrl
- httpVersion
消息报头:
> Host: www.baidu.com       
> User-Agent: curl/7.64.1   用户代理
> Accept: */*               我想要接收什么类型的数据，通常MIME
请求正文

3. response —— 消息报头
状态行
消息报头
响应正文

后端请求

```js
(async () => {
  const res = await axios.get('/api/users');
  console.log(res);
  document.writeln(`Response ${JSON.stringify(res)}`)
})()

// 埋点
const img = new Image();
img.src = '/api/users?button=123'
```

# 跨域
浏览器同源策略引起的接口调用问题
协议，URL，端口任意一个不同皆为跨域

https://www.jianshu.com/p/b55086cbd9af

# 反向代理
以前：普通代理，访问某台服务器然后代理上网，靠近浏览器端的
现在：请求越来越复杂，动态和静态的最好别放在同一台机器上，靠近服务器端的
https://www.cnblogs.com/taostaryu/p/10547132.html
正向代理：代理的是客户端，服务端不知道真实的客户端信息，比如科学上网，我们客户端请求某台服务器，这台服务器充当客户端去访问另一台服务器（google）
1. 可访问无法访问的资源，如google
2. 可做缓存
3. 对客户端访问授权，上网进行认证
4. 代理可记录用户访问记录（上网行为管理），对外隐藏用户信息
反向代理：代理的是服务端，客户端不知道真实的服务端信息，比如外部访问内网，客户端请求的是代理服务器（公网访问地址就是这台代理服务器）
1. 保证内网的安全，大型网站，通常将反向代理作为公网访问地址，web服务是内网
2. 负载均衡，通过反向代理服务器来优化网站负载

两种VPN
1. 科学上网 VPN， 这是正向代理， 这是对用户来说的， 用户在正向代理一个客户端（请求）
2. 上公司内网 VPN， 这是反向代理，这是对公司来说的， 公司在反向代理一个服务端（响应）

# BodyParser
利用流的机制来收到post请求传过来的body

```js
  else if (method === "POST" && url === "/api/save") {
    let reqData = [];
    let size = 0;
    req.on('data', data => {
      console.log('>>>req on', data);
      reqData.push(data);
      size += data.length;
    });
    req.on('end', () => {
      console.log('end');
      const data = Buffer.concat(reqData, size);
      console.log('data:', size, data.toString())
      res.end(`formdata:${data.toString()}`)
    });
  }
```

# 上传文件
断点续传  分包