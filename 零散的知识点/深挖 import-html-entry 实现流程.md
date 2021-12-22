

[toc]

#  揭开 import-html-entry 面纱

<div align='center'>
	<img src='./img/import-html-entry.png' />
</div>

摘要：import-html-entry 是 qiankun 中一个举足轻重的依赖，用于获取子应用的 HTML 和 JS，同时对 HTML 和 JS 进行了各自的处理，以便于子应用在父应用中加载，那它究竟做了些什么呢？下面就让我们一起来揭开它神秘的面纱吧！！

## 0. 本文使用示例说明

因文章将包含大量的代码和结果说明，纯粹的讲述代码实现的逻辑太过于空洞，因此，用一个示例来说明，对于理解将更加容易。

既然是拉取并处理某个 url 对应的内容，因此示例为 `http://example.com/index.html` 对应的全部内容，其中包括页级和外联 css， 页级和外联 js。接下来就让我们一起来看看这个库能实现什么功能以及如何实现的吧！！

> 此 url 仅为示例

```html
<head>
  <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/brands.css" rel="stylesheet">
  <style> h1 { font-size: 40px; } </style>
</head>

<body>
  <h1>Zhang Pao Pao</h1>
  
  <script src="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/js/brands.js"></script>
  <script>console.log('this is script in-line');</script>
</body>
```

## 1. 拉取 HTML 并处理

1. 在 `importHTML` 函数中，通过 fetch 获取到 url 对应的全部内容（即示例中 `index.html` 全部内容的字符串）

2. 从返回的结果中解析出以下内容：（解析过程在 `processTpl` 函数中，**整体思路是正则匹配**）

   1. 经过**初步处理后**的 html

      大致为以下处理过程，整个过程

      1. 去掉注释
      2. 注释所有的外联 js 以及删除掉所有的页级 js (当然都收集起来了)
      3. 注释所有的外联 css，保留页级 css

      得到的结果如下所示：

      > 这里为了清晰我格式化了，<font color='red'>实际上是一个长长的字符串</font>

      ```html
      <head>
        <!--  link https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/brands.css replaced by import-html-entry -->
        <style> h1 { font-size: 40px; } </style>
      </head>
      
      <body>
        <h1>Zhang Pao Pao</h1>
        <!--  script https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/js/brands.js replaced by import-html-entry -->
        <!-- inline scripts replaced by import-html-entry -->
        <!--  script http://localhost:7101/main.js replaced by import-html-entry -->
      </body>
      ```

   2. 由所有 "script" 组成的数组

      - 页级的 script 直接作为数组的元素
      - 外联的 script 对应的 src 作为数组的元素（以用于后续 fetch 获得对应的 js 内容）

      ```js
      [
        'https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/js/brands.js', 
        "<\script>console.log('this is script in-line');<\/script>",
      ]
      ```

   3. 由所有 "style" 组成的数组

      由所有的外联 style， 也就是 link 对应的 src 作为数组的元素（同样以用于后续 fetch 获得对应的 css 内容）

      ```js
      ['https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/brands.css'] 
      ```

3. 将所有的 css 嵌入到上述经过初步处理后的 html 中

   1.  通过 fetch 拉取到上述  "style" 数组里面对应的 css

   2. 将拉取到的每一个 href 对应的 css 通过 `<style> </style>` 包裹起来且嵌入到 html 中

      > 准确来说不是嵌入到 html 中。整个流程是这样：首先当解析 html 中的 stylesheet link  标签时，就会将这个标签注释起来 ，然后再通过 fetch 将此 href 对应的 css 获取到，然后再使用正则将这个被注释的标签替换成由 style 包裹 css 而成的标签，如此，所有的 css 全部都嵌入到了 html 中，并且由 style 包裹，因此全部生效。 

      如下的代码就是将所有的 stylesheet  href 对应的 css 嵌入到 html 后的结果，同样本身是字符串，在这里为了清晰做了格式化。

      ```html
      <head>
        <style>
          /* https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/css/brands.css */
          @font-face {
            font-family: 'Font Awesome 5 Brands';
           	...
          }
      
          .fab {
            font-family: 'Font Awesome 5 Brands';
            font-weight: 400;
          }
        </style>
        <style>
          h1 { font-size: 40px; }
        </style>
      </head>
      
      <body>
        <h1>Zhang Pao Pao</h1>
        <!--  script https://cdn.bootcdn.net/ajax/libs/font-awesome/5.15.3/js/brands.js replaced by import-html-entry -->
        <!-- inline scripts replaced by import-html-entry -->
        <!--  script http://localhost:7101/main.js replaced by import-html-entry -->
      </body>
      ```

   下面是拉取 HTML 并处理的主要代码，整体的内容可到 import-html-entry 中查看。

   ```js
   export default function importHTML(url, opts = {}) {
   	// 1. 通过 fetch 获取到 url 对应的 html
   	return embedHTMLCache[url] || (embedHTMLCache[url] = fetch(url)
   		.then(html => {
     // 2. 从返回的结果中解析出以下内容a.经过初步处理后的 html, b.由所有 "script" 组成的数组, c.由所有 "style" 组成的数组
   			const { template, scripts, entry, styles } = processTpl(getTemplate(html), assetPublicPath, postProcessTemplate);
   	// 3. 将所有的 css 嵌入到上述经过初步处理后的 html 中
   			return getEmbedHTML(template, styles, { fetch }).then(embedHTML => (...));
   		}));
   }
   ```

   ```js
   function getEmbedHTML(template, styles, opts = {}) {
     // 1. fetch "style" 数组里面对应的 css
   	return getExternalStyleSheets(styles, fetch)
   		.then(styleSheets => {
   			embedHTML = styles.reduce((html, styleSrc, i) => {
     // 2.  将拉取到的每一个 href 对应的 css 通过 `<style> </style>` 包裹起来且嵌入到 html 中
   				html = html.replace(genLinkReplaceSymbol(styleSrc), `<style>/* ${styleSrc} */${styleSheets[i]}</style>`);
   				return html;
   			}, embedHTML);
   		});
   }
   ```

## 2. 拉取 JS 并支持执行

通过 1.2.b 可以获取到 url 文件下对应的由所有 "script" 组成的数组 ，其中包含两部分内容：

- 页级的 script 
- 外联的 script 对应的 src 

1. 获取到所有的 script code

   1. 如果是页级 script，直接返回即可

   2. 如果不是，那么通过 fetch 获取

      ```js
      export function getExternalScripts(scripts, fetch) {
        // 根据 script src 的 url fetch js 
      	const fetchScript = scriptUrl => fetch(scriptUrl).then(response => (...)));
      		return Promise.all(scripts.map(script => {
            // 如果是页级 script ，直接返回
      			if (isInlineCode(script)) {
      				return getInlineCode(script);
      			} else {
            // 如果不是，那么通过 fetch 获取
      				return fetchScript(script);
      			}
      		},
      	));
      }
      ```

2. 将获取到的 js code **处理成 IIFE 字符串**，并且为后续实现应用与应用之间隔离做处理

   > 其实这里描述成 “处理成 IIFE 字符串” 不是非常正确，因为 IIFE 指的是立即执行函数，是一个函数，而这里只是把 js code 包裹在 `(function(xxx){ code })(xxx)` 中，但的确没有想到更好的描述方式，所以暂时这样描述吧！！

   ```js
   function getExecutableScript(scriptSrc, scriptText, proxy, strictGlobal) {
   	const sourceUrl = isInlineCode(scriptSrc) ? '' : `//# sourceURL=${scriptSrc}\n`;
   	// 通过这种方式获取全局 window，具体原因可参考源码在这里的注释
   	const globalWindow = (0, eval)('window');
     // 如果这里的 proxy 为 window 沙箱，那么就可以实现应用隔离
   	globalWindow.proxy = proxy;
     // 利用 IIFE 将 code 里会使用到的 window, self, globalThis 传递进去，为后续的应用与应用之间隔离做处理
   	return strictGlobal
   		? `;(function(window, self, globalThis){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`
   		: `;(function(window, self, globalThis){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);`;
   }
   ```

   > 这里的代码非常的有意思（但实际开发千万不要用，感觉用了要挨锤）
   >
   > 1. `(0, eval)('window')` 获取全局 window
   > 2. `(function(window, self, globalThis){...}.bind(window.proxy))(window.proxy,window.proxy,window.proxy,)`， 这里首先实现了 `window, self, globalThis ` 的传递，同时还 `bind` 的 code 的 `this` 
   > 3. `strictGlobal` 为真时的 `with` 语法，可实现拦截作用域

   示例中页级 script 得到的 IIFE 字符串（同样本身是字符串，在这里为了清晰做了格式化） 

   ```js
   ;(
     function(window, self, globalThis){
       ;console.log('this is script in-line');
     }
   ).bind(window.proxy)
   (window.proxy, window.proxy, window.proxy);
   ```

   当然，外联的 script 得到的也是同样 IIFE 字符串，只是其中内容不同。

3. 执行上述的  **IIFE 字符串**，实际上就是执行所有的 js code

   ```js
   export function evalCode(scriptSrc, code) {
   	const key = scriptSrc;
   	if (!evalCache[key]) {
       // 将 IIFE 字符串包裹在 function 中
   		const functionWrappedCode = `window.__TEMP_EVAL_FUNC__ = function(){${code}}`;
   		// window.__TEMP_EVAL_FUNC__ = function(){...} eval 将上面的字符串转换成代码
       (0, eval)(functionWrappedCode);
   		evalCache[key] = window.__TEMP_EVAL_FUNC__;
   		delete window.__TEMP_EVAL_FUNC__;
   	}
   	const evalFunc = evalCache[key];
     // 执行上面得到的匿名函数，其中内容为第二点的 IIFE ，因此也就是执行了 js code
     // 这里是真正的执行
   	evalFunc.call(window);
   }
   ```

   

## 3. 总结

到此，import-html-entry 这个库的所有功能都探究完成了。主要是实现了以下几个能力

1. 拉取 url 对应的 html 并且对 html 进行了一系列的处理
2. 拉取上述 html 中所有的外联 css 并将其包裹在 `style` 标签中然后嵌入到上述的 html 中
3. 支持执行页级 js 脚本 以及 拉取上述 html 中所有的外联 js 并支持执行

因此，在微前端中，使用此依赖可以直接获取到子应用 （某 url ） 对应的 html 且此 html 上已经嵌好了所有的 css，同时还可以直接执行子应用的所有 js 脚本且此脚本还为 js 隔离（避免污染全局）做了预处理。

本文有很多的术语还需要再斟酌，因此，如果您有好的建议，请不吝赐教，谢谢。

对了，点击可查看 [import-html-entry](https://github.com/kuitos/import-html-entry)  的 github 仓库，感兴趣的都可以去看看。

仔细读完这个依赖的源码才知道，其实 qiankun 的实现原理并不是那么深奥的，继续探究，希望有一天自己也能够像这些大神们一样开源出自己的框架。













































































