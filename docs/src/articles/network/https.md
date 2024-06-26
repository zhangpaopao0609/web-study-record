真的写得好： https://segmentfault.com/a/1190000021494676

说实话，这个 ca 证书里面还有很多门道呀

https://xiehongfeng100.github.io/2016/08/27/security-why-do-we-need-digital-certificate/

### HTTPS 是什么？

HTTPS（全称：HyperText Transfer Protocol Secure）是 HTTP（超文本传输协议）的安全版本。它用于在互联网上安全地传输数据，确保数据在传输过程中的隐私性和完整性。HTTPS 在 HTTP 的基础上通过 SSL/TLS 协议提供了数据加密、数据完整性验证和身份验证的功能。

### HTTPS 的原理

HTTPS 的工作原理基于 SSL（Secure Sockets Layer）或其继任者 TLS（Transport Layer Security）协议。这些协议使用公钥和私钥的组合来实现加密和身份验证。

1. **密钥交换**：客户端和服务器之间首先进行密钥交换，这通常涉及到一个叫做“握手”的过程。在握手过程中，客户端和服务器协商加密算法，并交换可以生成对称加密密钥的信息。

2. **服务器身份验证**：服务器会向客户端提供一个数字证书，通常由第三方信任机构（CA，Certificate Authority）签发。客户端验证证书的有效性，确保服务器是合法的。

3. **数据传输加密**：一旦密钥交换和服务器身份验证完成，客户端和服务器之间的所有数据传输都会使用对称加密算法进行加密。这确保了数据在传输过程中的安全性和隐私性。

### HTTPS 的实现

要在网站上实现 HTTPS，网站管理员需要做以下几个步骤：

1. **获取 SSL/TLS 证书**：从 CA 获取一个数字证书。这通常需要生成一个公钥和私钥对，并将公钥发送给 CA。CA 会验证请求者的身份，并签发一个证书。

2. **安装证书**：将获取的证书安装到服务器上。这通常涉及到配置服务器软件（如 Apache、Nginx）以使用证书。

3. **配置 HTTPS**：确保服务器配置正确，以便可以通过 HTTPS 提供服务。这包括配置端口（通常是 443）、证书和密钥文件的位置等。

4. **重定向 HTTP 到 HTTPS**：为了确保用户始终通过 HTTPS 访问网站，可以设置 HTTP 请求自动重定向到 HTTPS。

### HTTPS 加密了哪些内容

在 HTTPS 连接中，以下内容被加密：

- **URL 路径**：访问的页面路径部分被加密。
- **查询参数**：URL 中的查询字符串（如 `?id=123`）也被加密。
- **请求和响应正文**：发送和接收的所有数据，包括表单提交、API 请求等。
- **HTTP 头部**：大部分 HTTP 头部信息也被加密，如 `Authorization`、`Cookie` 等。

以下内容没有被加密：

- **主机名和端口**：由于 DNS 查询和 TCP 连接需要知道服务器的地址和端口，因此这部分信息是公开的。
- **证书信息**：服务器的证书是公开的，以便客户端可以验证服务器的身份。

### 如何使用 HTTPS

对于用户来说，使用 HTTPS 很简单：

1. **在浏览器中访问 HTTPS 网站**：在浏览器的地址栏输入以 `https://` 开头的 URL，或者点击一个 HTTPS 链接。

2. **浏览器验证证书**：浏览器会自动验证网站证书的有效性。如果证书有效，浏览器会显示一个锁形图标，表示连接是安全的。

3. **安全浏览**：如果证书验证通过，用户可以放心地浏览网站，知道他们的数据是安全传输的。

对于网站管理员，需要确保服务器正确配置了 SSL/TLS 证书，并且所有的网站内容都通过 HTTPS 提供。

总之，HTTPS 是一种保护数据在互联网上传输安全的协议，它通过加密和身份验证机制来确保数据的安全和隐私。
