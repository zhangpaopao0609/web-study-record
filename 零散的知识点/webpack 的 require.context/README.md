# 一个旧物件 —— webpack 的 require.context 

项目模块化开发，经常需要大量的 import 或者 export 各种模块，如下：

```js
import A from "./modules/a";
import B from "./modules/b";
import C from "./modules/c";
import D from "./modules/d";

export { A, B, C, D };
```

一般引用一两个模块没什么麻烦的，但当需要引用的模块特别多时，就有些蛋疼了。

所以吧，这时候就需要用到 webpack 的 [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) 了，能够极大的简化这种大量引用操作，下面我们就来细细的看看吧！

## require.context

### 1. 基本语法

```ts
require.context(
  directory,
  (useSubdirectories = true),
  (regExp = /^\.\/.*$/),
  (mode = 'sync')
);
```

- directory: 要引用的文件的目录

  > 以开篇例子为例，此处的 directory 为： './modules'

- useSubdirectories: 是否查找子目录

  > 此处 'modules' 没有子目录，因此可以设置为 false，当然，不设置，默认为 true 也可

- regExp: 要匹配文件的正则

  > 并不一定 directory 下所有的文件都要引用，支持正则匹配

- mode: 加载模式

  > 可选项："sync" | "eager" | "weak" | "lazy" | "lazy-once"
  >
  > 每一项代表的含义可见此处：[import-1](https://webpack.docschina.org/api/module-methods/#import-1)

### 2. 简单使用

```js
const context = require.context("./modules", true, /\.ts$/, "sync");
```

上面调用方法，到底返回的是什么？

```js
var map = {
	"./a.ts": "./src/modules/modules/a.ts",
	"./b.ts": "./src/modules/modules/b.ts",
	"./c.ts": "./src/modules/modules/c.ts",
	"./d.ts": "./src/modules/modules/d.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/modules/modules sync recursive \\.ts$";
```

代码很简单，require.context执行后，返回一个方法webpackContext，这个方法又返回一个__webpack_require__，这个__webpack_require__就相当于require或者import。同时webpackContext还有二个静态方法keys与resolve，一个id属性。

1. keys: 返回匹配成功模块的名字组成的数组
2. resolve: 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
3. id: 执行环境的id，返回的是一个字符串，主要用在module.hot.accept，应该是热加载

看下keys是作用

```js
const ctx = require.context('./components/', true, /\.js$/)
console.log(ctx.keys())
// ["./A.js", "./B.js", "./C.js", "./D.js"]
```

其实就是

```js
var map = {
	"./A.js": "./src/components/test/components/A.js",
	"./B.js": "./src/components/test/components/B.js",
	"./C.js": "./src/components/test/components/C.js",
	"./D.js": "./src/components/test/components/D.js"
};

Object.keys(map)
```



```js
function importAll(context: __WebpackModuleApi.RequireContext) {
  return context.keys().reduce((modules: Record<string, any>, modulePath) => {
    const moduleName = modulePath.replace(/^.\/([^.]+).ts$/, "$1");
    modules[moduleName] = context(modulePath).default;
    return modules;
  }, {});
}

const context = require.context("./modules", true, /\.ts$/, "sync");
export default importAll(context);

```