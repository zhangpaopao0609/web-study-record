[toc]

# Vite 实现原理

## 1. vite 简介

vite 开发环境基于浏览器支持 dynamic import，使得启动速度快得惊人，同时支持任意类型文件的解析（提供解析loder即可）；生成环境使用 Rollup打包。因此我们的尤大神说，2021年前端有什么新的的变化就是 “会有很多人抛弃webpack开始使用 vite”。

那么到底 vite 是怎么实现的，难道说直接 import 就可以了吗？vue文件又是如何解析的呢？下面就来一步步揭开神秘的面纱。

## 2. vite 的实现原理

这里先给出结论：**dynamic import 会对每一个 import 都发起网络请求**，vite 通过拦截网络请求来解析和返回文件。

### 2.1 本地服务

因为每一个 import 都会发起网络，如存在以下代码：

```js
import relative from "./relative.js";
```

那么浏览器就会发起一个请求，如下

```bash
http://domain:port/relative
```

因为，为了拦截请求，vite 通过 node 搭建一个本地服务，为展示原理，这里使用 koa 搭建后端服务。

```js
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  const { url, query } = ctx.request;
  if(url === '/') {
    let html = fs.readFileSync("./index.html", 'utf-8');
    ctx.type = "text/html";
    ctx.body = html;
  }
}

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});
```

这里搭建一个后端服务，访问 localhost:6090 时就返回index.html文件，在index.html 的script中，为了支持dynamic import, 需要添加 type="module",如下；

```html
<body>
  <div id="app"></div>
  <script src="./main/index.js" type="module"></script>
</body>
```

### 2.2 非node_modules 的文件的引用

dynamic import 发起的网络请求直接支持文件 ESM 引用，**相对路径，绝对路径都会根据路径发起对应的请求**，只要是符合 ESM 的文件，直接就支持了模块化。

### 2.3 node_modules 依赖的引用

如下，我们一定会使用很多依赖，这些依赖都是放在node_modules里面的，dynamic import 发起的网络请求是不支持这种非 `"/", "./", or "../".`开头的，如果直接这样，浏览器会报如下错误；

```js
import { createApp } from 'vue';
```

```js
(index):1 Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".
```

那怎么做呢？很简单，既然只支持 ` "/", "./", or "../".`，那就把它改造成这些开头的，而且，给一个标识，这个标识标识这种请求我是从 node_modules里面获取文件的。

1. 改造

   这里对所有文件都改造一次，只要那些需要从node_module获取的，都改造成 `/@modules/xxx`就可以了，那么请求也就是自然可以发起了，同时也有了一个标识。

```js
module.exports = function rewriteImport(content) {
  // 目的是改造 .js 文件内容， 不是 "/", "./", or "../" 开头的 import，替换成 /@modules/ 开头
  return content.replace(/\s+from\s+['|"]([^'"]+)['|"]/g, ($0, $1) => {
    if($1[0] !== '.' && $1[0] !== '/') {
      return ` from "/@modules/${$1}"`
    }else {
      return $0
    }
  })
};
```

2. 文件获取

   如果是以 `/@modules`开头的请求，那么就是需要从 node_modules获取文件并放回，同时别忘记对这个文件也进行改造，因为这里面也有可能存在从node_modules获取文件的依赖。

```js
else if(url.startsWith('/@modules/')) {
    // 这个模块，不是本地文件，而是 node_modules 连查找
    const prefix = path.resolve(__dirname, 'node_modules', url.replace("/@modules/", ""));
    const module = require(`${prefix}/package.json`).module;
    const file = fs.readFileSync(path.resolve(prefix, module), 'utf-8');
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(file);
}
```

### 2.4 `.vue` 文件的解析和返回

这里需要提一下，dynamic import 只支持 js 文件，也就是说除了js文件，其它的文件如果直接返回的话浏览器是不认识的。

所以类似 `.vue` 文件都需要进行解析成 js 文件，然后返回给浏览器，那么如何解析呢？这时候就需要用到 vue 中解析 vue 文件的能力了， `compiler`模块，如下所示；

这里有一块儿比较难懂，为什么要分两部分解析， 这就需要理解vue是如何解析单文件的了，他会将单文件解析成两块，一块是 `sript` 脚本，一块是 template 解析而成的 `render`函数，所以需要分成两块解析和返回。并且在`script`一块中添加引用 `render`函数和导出的模板。

```js
const compilerSfc = require('@vue/compiler-sfc');
const compilerDom = require('@vue/compiler-dom');


else if(url.indexOf(".vue") !== -1) {
    // import xx from 'xx.vue';
    // 1. 单文件组件解析
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    // 解析单文件组件，需要官方的库   @vue/compiler-sfc
    const { descriptor } =  compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
    if(!query.type) {
      // js内容
      ctx.type = "application/javascript";
      ctx.body = `
      ${rewriteImport(descriptor.script.content.replace("export default ", 'const __script = '))};

import { render as __render } from "${url}?type=template";
__script.render = __render;
export default __script;
      `
    }else if(query.type === 'template'){
      // 解析我们的 template 变成 render 函数 @vue/compiler-dom
      const template = descriptor.template;
      const render = compilerDom.compile(template.content, { mode: "module" }).code;
      ctx.type = "application/javascript";
      ctx.body = rewriteImport(render);
    }
  }
```

### 2.5 `.css`文件的解析和返回

相信有了 `.vue`文件解析的引导，解析 `.css`文件自然就简单了，也就只需要将 css 文件转换成 js文件并且dom操作插入到html中即可。

```js
else if(url.endsWith('.css')) {
    // 浏览器 import 仅支持 js，因此，将 css 转换成 js 即可
    const p = path.resolve(__dirname, url.slice(1));
    const file = fs.readFileSync(p, "utf-8");
    const content = `
      const css = "${file.replace(/\n/g, '')}";
      const style = document.createElement("style");
      style.innerHTML = css;
      style.setAttribute('type', 'text/css');
      document.head.appendChild(style);
      export default css;
    `;
    ctx.type = "application/javascript";
    ctx.body = content;
  }
```

## 3. 总结

vite 的基本原理：开发环境利用浏览器支持 dynamic import 的特性，进行网络拦截，使得开发时不再需要构建，真正实现按需加载。

既然vite是通过拦截解析文件，那么任何文件都可以使用了，只要有对应的loader即可，比如 `scss`文件，只需要将 scss转成js然后返回即可。开发者也可以自己定义任意文件，同时提供loader解析即可。
[点击可查看本文对应的源码，也是博主自己实现的一个 mini-vite](https://github.com/Arrow-zb/mini-vite)


