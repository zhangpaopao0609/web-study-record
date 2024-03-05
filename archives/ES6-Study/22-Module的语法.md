[toc]

# Module 的语法

## 1. 概述

历史上，JS一直没有模块（module）体系

在ES6之前，社区制定了一些模块加载方案，最主要的有CommonJS和AMD（异步模块定义）两种。前者用于服务器，后者用于浏览器。ES6在语言标准层面上，实现了模块功能，而且实现得相当简单，完全可以取代CommonIJ和AMD规范，成为浏览器和服务器通用的模块解决方案

ES6模块的设计思想是尽量的静态化，**使得编译时就能确定模块的依赖关系，以及输入和输出的变量**。CommonJS和AMD模块，都只能在运行时确定这些东西。比如，CommonJS模块就是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面的代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没有办法再编译时做“静态优化”

ES6模块不是对象，而是通过export命令显示指定输出的代码，再通过import命令输入

```javascript
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面的代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即ES6可以在编译时就完成模块加载，效率比CommonJS模块的加载方式高，当然，这也导致了没法引用ES6模块本身，因为它不是对象。

由于ES6模块是编译时加载,使得静态分析成为可能。有了它，就能进一步拓宽JS的语法，比如引入宏（macro）和类型检查（type system）这些只能靠静态分析实现的功能

除了静态加载带来的各种好处，ES6模块还有以下好处

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持ES6模块格式。目前，通过各种工具库，其实已经做到了这一点
- 将来浏览器的新API就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供

## 2. 严格模式

ES6的模块自动采用严格模式，不管你有没有在模块头部加上“use strict”;

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性
- 不能使用with语句
- 不能对只读属性赋值
- 不能删除不可删除的属性
- 不能删除变量delete prop， 只能删除属性delete global[prop]
- eval不会在它外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反映函数参数的变化
- 不能使用arguments.callee
- 不能使用arguments.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加保留字（比如protected static和interface）

上面这些限制，模块都必须遵守。由于严格模式是 ES5 引入的，不属于 ES6，

其中，尤其需要注意`this`的限制。ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

## 3. export命令

模块功能主要由两个命令构成，export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

ES6将其视为一个模块，里面用export命令对外输出了三个变量

export除了像上面那样写，还有另外一种

```javascript
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };
```

上面代码在export命令后面，使用大括号指定所要输出的一组变量。它与前一种写法（直接放置在var语句前）是等价的，但是应该优先考虑使用这种写法。因为这样就可以在脚本尾部，一眼看清楚输出了那些变量。

export命令除了输出变量，还可以输出函数或类（calss）

```javascript
export function multiply(x, y) {
  return x * y;
};
```

上面代码对外输出一个含糊multiply

通常情况下，export输出的变量就是本来的名字，但是可以使用as关键字重命名

```js
function v1() { }
function v2() { }

export {
	v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
}
```

上面代码使用`as`关键字，重命名了函数`v1`和`v2`的对外接口。重命名后，`v2`可以用不同的名字输出两次。

需要特别注意的是，export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系

```js
// 报错
export 1;

// 报错
var m = 1;
export m;
```

上面的两种写法都会报错，因为没有提供对外的接口。第一种写法直接输出1，第二种写法通过变量m，还是直接输出1.1只是一个值，不是接口，正确的写法应该是下面这样

```js
// way 1
export var m = 1;
// way 2
var m = 1;
export { m };
// way 3
var n = 1;
export { n as m };
```

上面三种写法才是正确的，规定了对外的接口m。其他脚本可以通过这个接口，取到值1。它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系。

同样的，function和calss的输出，也应该遵守这样的写法

```js
// error
function f() { }
export f;
//right
export function f() {}
// right
function f() {}
export { f }
```

另外，export语句输出的接口，与其对应的值是动态绑定的，即通过该接口，可以获取到模块内部实时的值

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500)
```

上面代码输出变量foo，值为bar，500毫秒后变成baz

这一点与CommonJS规范完全不用。CommonJS模块输出的是值得缓存，不存在动态更新

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域，就会报错，下一节的import命令也是如此，这是因为处于条件代码块之中，就没法做静态优化了，违背了ES6模块的设计初衷

```javascript
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

## 4. import命令

使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块

```javascript
// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```javascript
import { lastName as surname } from './profile.js';
```

import命令输入的遍历都是只读的，因为他的本质是输入接口，也就是说，不允许在加载模块的脚本里，修改接口

```javascript
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

上面代码中，脚本加载了变量`a`，对其重新赋值就会报错，因为`a`是一个只读的接口。但是，如果`a`是一个对象，改写`a`的属性是允许的。

```javascript
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中，`a`的属性可以成功改写，并且其他模块也可以读到改写后的值。**不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性**。

`import`后面的`from`指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

```javascript
import {myMethod} from 'util';
```

上面代码中，`util`是模块文件名，由于不带有路径，必须通过配置，告诉引擎怎么取到这个模块。

注意：import命令具有提升效果，会提升到整个谋爱的头部，首先执行

```js
foo();

import { foo } from 'my_module';
```

上面的代码不会报错，因为import的执行早于foo调用，这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。由于import是静态执行的，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构

```javascript
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

上面三种写法都会报错，因为它们用到了表达式、变量和`if`结构。在静态分析阶段，这些语法都是没法得到值的。

最后，import语句会执行所加载的模块，因此可以有下面的写法

```js
import 'lodash'
```

上面的代码仅仅执行lodash模块，但是不输入任何值

如果多次重复执行同一句`import`语句，那么只会执行一次，而不会执行多次。

```javascript
import 'lodash';
import 'lodash';
```

上面代码加载了两次`lodash`，但是只会执行一次。

```javascript
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

上面代码中，虽然foo和bar在两个语句中加载，但是它们对应的是同一个模块，也就是说，import语句是 Singleton模式

目前阶段，通过 Babel 转码，CommonJS 模块的`require`命令和 ES6 模块的`import`命令，可以写在同一个模块里面，但是最好不要这样做。因为`import`在静态解析阶段执行，所以它是一个模块之中最早执行的。下面的代码可能不会得到预期结果。

```javascript
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

## 5. 模块的整体加载

除了制定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

面是一个`circle.js`文件，它输出两个方法`area`和`circumference`。

```javascript
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```

现在，加载这个模块。

```javascript
// main.js

import { area, circumference } from './circle';

console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```

上面写法是逐一指定要加载的方法，整体加载的写法如下。

```javascript
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象（上例是`circle`），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。

```javascript
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

## 6. Export default 命令

从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载，但是，一个陌生的模块，用户怎么知道拥有哪些属性和方法呢？

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到`export default`命令，**为模块指定默认输出**。

```js
export default function() {
  console.log('foo');
}
```

上面代码是一个模块文件，默认输出是一个函数

其他模块加载该模块时，import命令可以为该匿名函数指定任意名字

```js
import customName  from './export-default.js'
customName()
```

上面代码的`import`命令，可以用任意名称指向`export-default.js`输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时`import`命令后面，不使用大括号。

export default 命令用在非匿名函数前，也是可以的

```javascript
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
```

上面的代码中，foo函数的别名foo，在模块外部是无效的，加载的时候，视同匿名函数加载

```js
// one
export default function foo() {}

import foo from './foo'

// two
export function foo() {}

import { foo } from './foo'
```

因此，export default命令用于指定模块的默认输出，显然，一个模块只能有一个默认输出。本质上，export default就是输出一个叫做defalut的变量或者方法，然后系统允许你为它取任意名字

```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

正是因为export default命名其实只是输出一个叫做default的变量，所以他后面不能跟变量声明语句

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

同样地，因为`export default`命令的本质是将后面的值，赋给`default`变量，所以可以直接将一个值写在`export default`之后。

```javascript
// 正确
export default 42;

// 报错
export 42;
```

有了`export default`命令，输入模块时就非常直观了，以输入 lodash 模块为例。

```javascript
import _ from 'lodash';
```

如果想在一条`import`语句中，同时输入默认方法和其他接口，可以写成下面这样。

```javascript
import _, { each, forEach } from 'lodash';
```

对应上面代码的`export`语句如下。

```javascript
export default function (obj) {
  // ···
}

export function each(obj, iterator, context) {
  // ···
}

export { each as forEach };
```

`export default`也可以用来输出类。

```javascript
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

## 7. export 和 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起

```javascript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

上面代码中，`export`和`import`语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。

模块的接口改名和整体输出，也可以采用这种写法。

```javascript
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

## 8. 模块的继承

## 9. 跨模块常量

本书介绍`const`命令的时候说过，`const`声明的常量只在当前代码块有效。如果想设置跨模块的常量（即跨多个文件），或者说一个值要被多个模块共享，可以采用下面的写法。

```javascript
// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3
```

## 10. Import()

### 简介

前面介绍过，`import`命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（`import`命令叫做“连接” binding 其实更合适）。所以，下面的代码会报错。

```javascript
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

上面代码中，引擎处理`import`语句是在编译时，这时不会去分析或执行`if`语句，所以`import`语句放在`if`代码块之中毫无意义，因此会报句法错误，而不是执行时错误。也就是说，`import`和`export`命令只能在模块的顶层，不能在代码块之中（比如，在`if`代码块之中，或在函数之中）。

这样的设计，固然有利于编译器提高效率，但也导致无法在运行时加载模块。在语法上，条件加载就不可能实现。如果`import`命令要取代 Node 的`require`方法，这就形成了一个障碍。因为`require`是运行时加载模块，`import`命令无法取代`require`的动态加载功能。

```javascript
const path = './' + fileName;
const myModual = require(path);
```

上面的语句就是动态加载，`require`到底加载哪一个模块，只有运行时才知道。`import`命令做不到这一点。

[ES2020提案](https://github.com/tc39/proposal-dynamic-import) 引入`import()`函数，支持动态加载模块。

```javascript
import(specifier)
```

上面代码中，`import`函数的参数`specifier`，指定所要加载的模块的位置。`import`命令能够接受什么参数，`import()`函数就能接受什么参数，两者区别主要是后者为动态加载。

`import()`返回一个 Promise 对象。下面是一个例子

```javascript
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()`函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，`import()`函数与所加载的模块没有静态连接关系，这点也是与`import`语句不相同。`import()`类似于 Node 的`require`方法，区别主要是前者是异步加载，后者是同步加载。

### 适用场景

1. 按需加载

   `import()`可以在需要的时候，再加载某个模块。

   ```javascript
   button.addEventListener('click', event => {
     import('./dialogBox.js')
     .then(dialogBox => {
       dialogBox.open();
     })
     .catch(error => {
       /* Error handling */
     })
   });
   ```

   上面代码中，`import()`方法放在`click`事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

2. 条件加载

   `import()`可以放在`if`代码块，根据不同的情况，加载不同的模块。

   ```javascript
   if (condition) {
     import('moduleA').then(...);
   } else {
     import('moduleB').then(...);
   }
   ```

   上面代码中，如果满足条件，就加载模块 A，否则加载模块 B。

3. 动态的模块路径

   `import()`允许模块路径动态生成。

   ```javascript
   import(f())
   .then(...);
   ```

   上面代码中，根据函数`f`的返回结果，加载不同的模块。

   ### 注意点

   `import()`加载模块成功以后，这个模块会作为一个对象，当作`then`方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

   ```javascript
   import('./myModule.js')
   .then(({export1, export2}) => {
     // ...·
   });
   ```

   上面代码中，`export1`和`export2`都是`myModule.js`的输出接口，可以解构获得。

   如果模块有`default`输出接口，可以用参数直接获得。

   ```javascript
   import('./myModule.js')
   .then(myModule => {
     console.log(myModule.default);
   });
   ```

   上面的代码也可以使用具名输入的形式。

   ```javascript
   import('./myModule.js')
   .then(({default: theDefault}) => {
     console.log(theDefault);
   });
   ```

   如果想同时加载多个模块，可以采用下面的写法。

   ```javascript
   Promise.all([
     import('./module1.js'),
     import('./module2.js'),
     import('./module3.js'),
   ])
   .then(([module1, module2, module3]) => {
      ···
   });
   ```

   `import()`也可以用在 async 函数之中。

   ```javascript
   async function main() {
     const myModule = await import('./myModule.js');
     const {export1, export2} = await import('./myModule.js');
     const [module1, module2, module3] =
       await Promise.all([
         import('./module1.js'),
         import('./module2.js'),
         import('./module3.js'),
       ]);
   }
   main();
   ```























