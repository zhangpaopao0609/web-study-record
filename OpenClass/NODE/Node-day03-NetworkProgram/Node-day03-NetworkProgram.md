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



