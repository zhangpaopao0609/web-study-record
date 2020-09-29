[toc]

# Module 的加载实现

## 1. 浏览器加载

### 1.1 传统方法

HTML网页中，浏览器通过script标签加载js脚本

默认情况下，浏览器是同步加载js脚本，即渲染引擎遇到script标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载时间

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户就会感觉到浏览器卡死了，没有任何的响应。所以浏览器允许脚本异步加载，下面就是两种异步加载的语法

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

上面代码中，`<script>`标签打开`defer`或`async`属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer`与`async`的区别是：`defer`要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；`async`一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defet是渲染完再执行，async是下载完就执行。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的

### 1.2 加载规则

浏览器加载ES6模块，也使用script标签，但是要加入type=‘module’属性

```html
<script type="module" src="./foo.js"></script>
```

上面代码在网页中插入一个模块`foo.js`，由于`type`属性设为`module`，所以浏览器知道这是一个 ES6 模块。

浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会造成堵塞浏览器，**即等到整个页面渲染完，再执行模块脚本**，等同于打开了`<script>`标签的`defer`属性。

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

如果网页有多个`<script type="module">`，它们会按照在页面出现的顺序依次执行。

script标签的async属性也可以打开，这是只要加载完成，渲染引擎就会中断渲染然后立即执行，执行完成后，再恢复渲染。

```html
<script type="module" src="./foo.js" async></script>
```

一旦使用了`async`属性，`<script type="module">`就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```html
<script type="module">
  import utils from "./utils.js";

  // other code
</script>
```

举例来说，jQuery 就支持模块加载。

```html
<script type="module">
  import $ from "./jquery/src/jquery.js";
  $('#message').text('Hi from jQuery!');
</script>
```

对于外部的模块脚本（上例是`foo.js`），有几点需要注意。

- 代码是在模块作用域之中运行，而不是在全局作用域运行，模块内部的顶层变量，外部不可见
- 模块脚本自动采用严格模式
- 模块之中，可以受用import命令加载其他模块，也可以使用export命令输出对外接口
- 模块之中，顶层的this关键字返回undefined，而不是指向window
- 同一个模块如果加载多次，只会执行一次

利用顶层的`this`等于`undefined`这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```javascript
const isNotModuleScript = this !== undefined;
```

## 2. ES6模块与CommonJS模块的差异

三大差异

1. CommonJS模块输出的是一个值得拷贝，ES6模块输出的是值得引用
2. CommonJS模块是运行时加载，ES6是编译时输出接口
3. CommonJS模块的require是同步加载模块，ES6模块的import命令是异步加载，有一个独立的模块依赖的解析阶段

第二个差异是因为CommonJS加载的是一个对象（module.exports属性），该对象只有在脚本运行时才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成

## 3. Node.js 的模块加载方法

### 3.1 概述

JS现在有两种模块。一种ES6模块，简称ESM；另一种CommonJS模块，简称CJS。

CommonJS模块是Node.js专用的，与ES6模块不兼容，语法上面改，两者最明显的差异是，CommonJS模块使用require()和 module.exports，ES6使用import和export

nodejs要求ES6模块采用.mjs后缀文件名，也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。NodeJs遇到.mjs文件，就认为它是ES6模块，默认启用严格模式

如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`。

```javascript
{
   "type": "module"
}
```

一旦设置了以后，该目录里面的 JS 脚本，就被解释用 ES6 模块。

果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成`.cjs`。如果没有`type`字段，或者`type`字段为`commonjs`，则`.js`脚本会被解释成 CommonJS 模块。

总结为一句话：`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置。

注意，ES6 模块与 CommonJS 模块尽量不要混用。`require`命令不能加载`.mjs`文件，会报错，只有`import`命令才可以加载`.mjs`文件。反过来，`.mjs`文件里面也不能使用`require`命令，必须使用`import`。

### 3.2 package.json 的 main 字段

package.json文件有两个字段可以指定模块的入口文件：main和exports。比较简单的模块，可以只使用main字段，指定模块加载的入口文件

```javascript
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}
```

上面代码指定项目的入口脚本为./src/index.js ,它的格式为ES6模块。如果没有type字段，index.js就会被解释为CommonJS模块。

然后，import命令就可以加载这个模块

```javascript
// ./my-app.mjs

import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js
import { something } from './node_modules/es-module-package/src/index.js'
```

### 3.3 package.json 的 exports 字段

exports字段的优先级高于main字段，有很多用用法

1. 子目录别名

   package.json文件的exports字段可以指定脚本或子目录的别名

   ```javascript
   // ./node_modules/es-module-package/package.json
   {
     "exports": {
       "./submodule": "./src/submodule.js"
     }
   }
   ```

   上面的代码指定`src/submodule.js`别名为`submodule`，然后就可以从别名加载这个文件。

   ```javascript
   import submodule from 'es-module-package/submodule';
   // 加载 ./node_modules/es-module-package/src/submodule.js
   ```

   下面是子目录别名的例子。

   ```javascript
   // ./node_modules/es-module-package/package.json
   {
     "exports": {
       "./features/": "./src/features/"
     }
   }
   
   import feature from 'es-module-package/features/x.js';
   // 加载 ./node_modules/es-module-package/src/features/x.js
   ```

   如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

   ```javascript
   // 报错
   import submodule from 'es-module-package/private-module.js';
   
   // 不报错
   import submodule from './node_modules/es-module-package/private-module.js';
   ```

2. main的别名

   exports字段的别名如果是"."，就代表模块的主入口，优先级高于main字段，并且可以直接写成exports字段的值。

   ```javascript
   {
     "exports": {
       ".": "./main.js"
     }
   }
   
   // 等同于
   {
     "exports": "./main.js"
   }
   ```

   由于`exports`字段只有支持 ES6 的 Node.js 才认识，所以可以用来兼容旧版本的 Node.js。

   ```javascript
   {
     "main": "./main-legacy.cjs",
     "exports": {
       ".": "./main-modern.cjs"
     }
   }
   ```

   上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是`main-legacy.cjs`，新版本的 Node.js 的入口文件是`main-modern.cjs`。

3. 条件加载

   利用`.`这个别名，可以为ES6模块和CommonJS指定不同的入口，目前，这个功能需要在Node.js运行的时候，打开`--expertmental-conditional-exports`标志

   ```json
   {
     "type": "module",
     "exports": {
       ".": {
         "require": "./main.cjs",
         "default": "./main.js"
       }
     }
   }
   ```

   上面代码中，别名`.`的`require`条件指定`require()`命令的入口文件（即 CommonJS 的入口），`default`条件指定其他情况的入口（即 ES6 的入口）。

   上面的写法可以简写如下。

   ```javascript
   {
     "exports": {
       "require": "./main.cjs",
       "default": "./main.js"
     }
   }
   ```

### 3.4 CommonJS模块加载ES6模块

CommonJS 的`require()`命令不能加载 ES6 模块，会报错，只能使用`import()`这个方法加载。

```javascript
(async () => {
  await import('./my-app.mjs');
})();
```

上面代码可以在 CommonJS 模块中运行。

`require()`不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层`await`命令，导致无法被同步加载。

### 3.5 ES6模块加载CommonJS模块

### 3.6 Node.js的内置模块

Node.js 的内置模块可以整体加载，也可以加载指定的输出项。

```javascript
// 整体加载
import EventEmitter from 'events';
const e = new EventEmitter();

// 加载指定的输出项
import { readFile } from 'fs';
readFile('./foo.txt', (err, source) => {
  if (err) {
    console.error(err);
  } else {
    console.log(source);
  }
});
```

### 3.7 加载路径

### 3.8 内部变量

ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

首先，就是`this`关键字。ES6 模块之中，顶层的`this`指向`undefined`；CommonJS 模块的顶层`this`指向当前模块，这是两者的一个重大差异。

其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

- `arguments`
- `require`
- `module`
- `exports`
- `__filename`
- `__dirname`

## 4. 循环加载

“循环加载”（circular dependency）指的是，`a`脚本的执行依赖`b`脚本，而`b`脚本的执行又依赖`a`脚本。

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现`a`依赖`b`，`b`依赖`c`，`c`又依赖`a`这样的情况。这意味着，模块加载机制必须考虑“循环加载”的情况。

对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，处理“循环加载”的方法是不一样的，返回的结果也不一样。

### 4.1 CommonJS模块的加载原理

介绍 ES6 如何处理“循环加载”之前，先介绍目前最流行的 CommonJS 模块格式的加载原理。

CommonJS 的一个模块，就是一个脚本文件。`require`命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

```javascript
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

上面代码就是 Node 内部加载模块后生成的一个对象。该对象的`id`属性是模块名，`exports`属性是模块输出的各个接口，`loaded`属性是一个布尔值，表示该模块的脚本是否执行完毕。其他还有很多属性，这里都省略了。

以后需要用到这个模块的时候，就会到`exports`属性上面取值。即使再次执行`require`命令，也不会再次执行该模块，而是到缓存之中取值。也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

### 4.2 CommonJS模块的循环加载

### 4.3 ES6模块的循环加载







































































