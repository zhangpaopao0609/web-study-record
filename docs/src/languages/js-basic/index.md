---
outline: deep
---

# JavaScript 基础

## 1. JavaScript 有哪些数据类型，它们的区别？

JavaScript 共有八种数据类型，分别是 Undefined、Null、Boolean、 Number、String、Object、Symbol、BigInt。 其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了 解决可能出现的全局变量冲突的问题。 
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数， 使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。 这些数据可以分为原始数据类型和引用数据类型： 
- 栈：原始数据类型（Undefined、Null、Boolean、Number、String） 
- 堆：引用数据类型（对象、数组和函数） 两种类型的区别在于存储位置的不同： 
- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间 小、大小固定，属于被频繁使用数据，所以放入栈中存储； 
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固 定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈 中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引 用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。 堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中： 
- 在数据结构中，栈中数据的存取方式为先进后出。 
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大 小来规定。 

在操作系统中，内存被分为栈区和堆区：
- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的 值等。其操作方式类似于数据结构中的栈。 
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可 能由垃圾回收机制回收

## 2. 数据类型检测的方式有哪些
1. typeof
  其中数组、对象、null 都会被判断为 object，其他判断都正确。

2. instanceof

   instanceof 可以正确判断对象的类型，其内部运行机制是判断在其 原型链中能否找到该类型的原型。

   可以看到，instanceof 只能正确判断引用数据类型，而不能判断基本数据类型。instanceof 运算符可以用来测试一个对象在其原型链 中是否存在一个构造函数的 prototype 属性

   > 手写 instanceof：有三种写法，这里仅写出一种
   >
   > ```js
   > function customInstanceOf(instance, constructor) {
   >   // 获取实例对象的原型
   >   let proto = Object.getPrototypeOf(instance);
   > 
   >   // 循环遍历原型链
   >   while (proto) {
   >     // 检查当前原型是否等于构造函数的prototype
   >     if (proto === constructor.prototype) {
   >       return true;
   >     }
   >     // 继续向上遍历原型链
   >     proto = Object.getPrototypeOf(proto);
   >   }
   > 
   >   // 如果没有找到匹配的原型，返回false
   >   return false;
   > }
   > ```

3. constructor

   constructor 有两个作用，一是判断数据的类型，二是对象实例通过 

   constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象 

   来改变它的原型，constructor 就不能用来判断数据类型了

4. `Object.prototype.toString.call() `

   `Object.prototype.toString.call()` 使用 Object 对象的原型方法  `toString` 来判断数据类型： 

   同样是检测对象 obj 调用 `toString` 方法，`obj.toString()` 的结果和 `Object.prototype.toString.call(obj)` 的结果不一样，这是为什 么？

   这是因为 `toString` 是 Object 的原型方法，而 Array、function 等类 型作为 Object 的实例，都重写了 toString 方法。不同的对象类型调 用 toString 方法时，根据原型链的知识，调用的是对应的重写之后的 toString 方法（function 类型返回内容为函数体的字符串，Array 类型返回元素组成的字符串…），而不会去调用 Object 上原型 toString 方法（返回对象的具体类型），所以采用 `obj.toString()` 不能得到其对象类型，只能将 obj 转换为字符串类型；因此，在想要 得到对象的具体类型时，应该调用 Object 原型上的 toString 方法。

## 3. **null 和 undefined 区别**

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型 分别都只有一个值，就是 undefined 和 null。 undefined 代表的含义是未定义，null 代表的含义是空对象。一般 变量声明了但还没有定义的时候会返回 undefined，null 主要用于 赋值给一些可能会返回对象的变量，作为初始化。 

undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会 影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。 

当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的 值进行比较时会返回 true，使用三个等号时会返回 false。

## 4. **intanceof 操作符的实现原理及实现**

上面已经给出一种写法在，这里给出另外两种

```js
function customInstanceOf(source, target) {
  if(!source.__proto__) return false;
  if(!target.prototype) return false;
  if(source.__proto__ === target.prototype) {
    return true
  }
  return customInstanceOf(source.__proto__, target)
}

// 示例使用
class Parent {}
class Child extends Parent {}

const child = new Child();

console.log(customInstanceOf(child, Child)); // true
console.log(customInstanceOf(child, Parent)); // true
console.log(customInstanceOf(child, Object)); // true
console.log(customInstanceOf(child, Array)); // false
```

```js
function customInstanceOf(instance, constructor) {
  // 获取实例对象的原型
  let proto = instance.__proto__;

  // 循环遍历原型链
  while (proto) {
    // 检查当前原型是否等于构造函数的prototype
    if (proto === constructor.prototype) {
      return true;
    }
    // 继续向上遍历原型链
    proto = proto.__proto__;
  }

  // 如果没有找到匹配的原型，返回false
  return false;
}

// 示例使用
class Parent {}
class Child extends Parent {}

const child = new Child();

console.log(customInstanceOf(child, Child)); // true
console.log(customInstanceOf(child, Parent)); // true
console.log(customInstanceOf(child, Object)); // true
console.log(customInstanceOf(child, Array)); // false
```

## 5. **如何获取安全的 undefined 值？**

因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值， 但是这样会影响 undefined 的正常判断。表达式 void ___ 没有返 

回值，因此返回结果是 undefined。void 并不改变表达式的结果， 只是让表达式不返回值。因此可以用 void 0 来获得 undefined。

## 6. **Object.is() 与比较操作符 “===”、“==” 的区别？**

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进 行强制类型转化后再进行比较。 

- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不 会做强制类型准换，直接返回 false。 

- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相 同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的

## 7. **什么是 JavaScript 中的包装类型？**

在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操 作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在 后台隐式地将基本类型的值转换为对象

在 访 问 'abc'.length 时 ， JavaScript 将 'abc' 在 后 台 转 换 成  String('abc')，然后再访问其 length 属性

JavaScript 也可以使用 Object 函数显式地将基本类型转换为包装类型：

也可以使用 valueOf 方法将包装类型倒转成基本类型：

## 8. **为什么会有 BigInt 的提案？**

JavaScript 中 Number.MAX_SAFE_INTEGER 表示最⼤安全数字，计算 结果是 9007199254740991，即在这个数范围内不会出现精度丢失（⼩ 数除外）。但是⼀旦超过这个范围，js 就会出现计算不准确的情况， 这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅提 出了 BigInt 来解决此问题。 

## 9. **如何判断一个对象是空对象** 

使用 JSON 自带的.stringify 方法来判断：

使用 ES6 新增的方法 Object.keys()来判断： 

## 10. **const 对象的属性可以修改吗**

const 保证的并不是变量的值不能改动，而是变量指向的那个内存地 址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值 就保存在变量指向的那个内存地址，因此等同于常量。 

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的 内存地址，保存的只是一个指针，const 只能保证这个指针是固定不 变的，至于它指向的数据结构是不是可变的，就完全不能控制了。 

## 11. **如果 new 一个箭头函数的会怎么样**

箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this 

指向，更不可以使用 arguments 参数，所以不能 New 一个箭头函数。

new 操作符的实现步骤如下： 

1. 创建一个对象 

2. 将构造函数的作用域赋给新对象（也就是将对象的`__proto__` 属性 指向构造函数的 prototype 属性）

3. 指向构造函数中的代码，构造函数中的 this 指向该对象（也就是 为这个对象添加属性和方法） 

4. 返回新的对象 

   所以，上面的第二、三步，箭头函数都是没有办法执行的。

## 12. **箭头函数的 this 指向哪⾥？**

箭头函数不同于传统 JavaScript 中的函数，箭头函数并没有属于⾃ ⼰的 this，它所谓的 this 是捕获其所在上下⽂的 this 值，作为⾃ ⼰的 this 值，并且由于没有属于⾃⼰的 this，所以是不会被 new 调⽤的，这个所谓的 this 也不会被改变。 

```js
// es6 
const obj = {
  getArrow() {
    return () => {
      console.log(this === obj);
    }
  }
}
```

babel 转化后：

```js
// es5
var obj = {
  getArrow: function getArrow() {
    var _this = this;
    return function () {
      console.log(_this === obj);
    };
  }
};
```

## 13. **扩展运算符的作用及使用场景**

1. 对象扩展运算符

   对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷 贝到当前对象之中

   需要注意：扩展运算符对对象实例的拷贝属于浅拷贝

2. 数组扩展运算符 

## 14. **Proxy 可以实现什么功能？**

在 Vue3.0 中通过 Proxy 来替换原本的 Object.defineProperty 来实现数据响应式。 

Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。



之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属 性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现 有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式 的数据改变，唯一缺陷就是浏览器的兼容性不好。

## 15. **常用的正则表达式有哪些？** 

## 16. **对 JSON 的理解**

JSON.stringify

JSON.parse

## 17. **JavaScript 脚本延迟加载的方式有哪些？**

延迟加载就是等页面加载完成之后再加载 JavaScript 文件。js 延 迟加载有助于提高页面加载速度。 

defer 属性：给 js 脚本添加 defer 属性，这个属性会让脚本的加 载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文 件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是 这样。

async 属性：给 js 脚本添加 async 属性，这个属性会使脚本异步 加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次 执行

动态创建 DOM 方式：动态创建 DOM 标签的方式，可以对文档的加载 事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

使用 setTimeout 延迟方法：设置一个定时器来延迟加载 js 脚本文 件

让 JS 最后加载：将 js 脚本放在文档的底部，来使 js 脚本尽可能 的在最后来加载执行

## 18. **什么是 DOM 和 BOM？**

DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象 主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器**对象模型**，它指的是把浏览器当做一个对象来对待， 这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器 窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页 中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方 法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。

## 19. **escape、encodeURI、encodeURIComponent 的区别**

`escape`, `encodeURI`, 和 `encodeURIComponent` 是 JavaScript 中用于编码字符串的三个不同的函数，它们在处理字符串时有不同的用途和行为。

1. **escape()**:
   - `escape` 函数是早期 JavaScript 中用于编码字符串的方法，它已经被废弃，不推荐在现代Web开发中使用。
   - 它主要用于对字符串中的某些字符进行编码，比如非拉丁字符和特殊字符。
   - 它不会对 ASCII 字母和数字进行编码，但会对空格转换为 `%20`，对特殊字符（如 `@`、`*`、`/`、`+`、`-`、`.` 和 `_`）不进行编码。
   - 对于 Unicode 字符，`escape` 会产生一个 `%uXXXX` 格式的编码，其中 `XXXX` 是 Unicode 码点的四位十六进制数。

2. **encodeURI()**:
   - `encodeURI` 函数用于对整个 URI 进行编码，它不会对属于 URI 的特殊字符进行编码，如冒号 `:`、正斜杠 `/`、问号 `?` 和井号 `#` 等。
   - 它主要用于编码一个完整的 URI，而不会破坏 URI 的结构。
   - 它会编码大多数非 ASCII 字符和一些特殊字符，但不会编码用于分隔 URI 组件的字符。

3. **encodeURIComponent()**:
   - `encodeURIComponent` 函数用于对 URI 组件或参数进行编码，它会编码 URI 中的特殊字符，包括用于分隔 URI 组件的字符，如 `&`、`=`、`+`、`?` 和 `/` 等。
   - 它主要用于编码 URI 的某个部分，比如查询字符串的键值对，以确保这些字符不会被解释为 URI 的控制字符。
   - 它会编码几乎所有的非字母数字字符，除了 `-`、`_`、`.`、`!`、`~`、`*`、`'` 和 `(`、`)`。
   
   示例:
   
   ```javascript
   var uri = "http://example.com/参数?name=测试&age=30";
   
   // escape 已废弃，不推荐使用
   console.log(escape(uri)); // 输出: http%3A//example.com/%u53C2%u6570%3Fname%3D%u6D4B%u8BD5%26age%3D30
   
   // encodeURI 不会编码 URI 的特殊分隔符
   console.log(encodeURI(uri)); // 输出: http://example.com/%E5%8F%82%E6%95%B0?name=%E6%B5%8B%E8%AF%95&age=30
   
   // encodeURIComponent 会编码 URI 的特殊分隔符
   console.log(encodeURIComponent(uri)); // 输出: http%3A%2F%2Fexample.com%2F%E5%8F%82%E6%95%B0%3Fname%3D%E6%B5%8B%E8%AF%95%26age%3D30
   ```
   
   在实际应用中，应该使用 `encodeURI` 来编码整个 URI，而使用 `encodeURIComponent` 来编码 URI 的组件，如查询字符串中的参数值。由于 `escape` 已经废弃，应避免使用它，并且在可能的情况下使用 `encodeURI` 或 `encodeURIComponent` 替代。

## 20. **对 AJAX 的理解，实现一个 AJAX 请求**

AJAX（Asynchronous JavaScript and XML）是一种在无需重新加载整个页面的情况下，能够发送和接收数据的技术。它允许网页在后台与服务器进行数据交换，从而能够动态地更新部分网页内容。AJAX 不是一种新的编程语言，而是一种使用现有标准的新方法。

AJAX 的核心是 `XMLHttpRequest` 对象（简称 XHR），它是浏览器提供的一个 API，可以用来在 JavaScript 中发起 HTTP 请求。虽然 AJAX 的名字中包含 XML，但实际上数据格式可以是 JSON、HTML、纯文本或其他任何服务器支持的格式。

以下是一个简单的 AJAX 请求的实现：

```javascript
function ajaxRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest(); // 创建 XMLHttpRequest 对象

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) { // 请求完成
        if (xhr.status === 200) { // 请求成功
          resolve(xhr.responseText); // 解析 Promise，返回响应数据
        } else {
          reject(new Error('Request failed with status code ' + xhr.status)); // 拒绝 Promise，返回错误信息
        }
      }
    };

    xhr.open(method, url, true); // 初始化请求

    if (method === 'POST' && data) {
      xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头
      xhr.send(JSON.stringify(data)); // 发送请求体
    } else {
      xhr.send(); // 发送请求
    }
  });
}

// 使用 ajaxRequest 函数发起 GET 请求
ajaxRequest('GET', 'https://jsonplaceholder.typicode.com/posts/1')
  .then(data => {
    console.log('GET Response:', data);
  })
  .catch(error => {
    console.error('GET Error:', error);
  });

// 使用 ajaxRequest 函数发起 POST 请求
var postData = { title: 'foo', body: 'bar', userId: 1 };
ajaxRequest('POST', 'https://jsonplaceholder.typicode.com/posts', postData)
  .then(data => {
    console.log('POST Response:', data);
  })
  .catch(error => {
    console.error('POST Error:', error);
  });
```

在这个例子中，`ajaxRequest` 函数接受四个参数：HTTP 方法（`method`）、请求的 URL（`url`）、一个回调函数（`callback`）以及可选的请求数据（`data`）。函数内部创建了一个 `XMLHttpRequest` 对象，并设置了 `onreadystatechange` 事件处理程序来监听请求的状态变化。当请求完成并且成功时（状态码为 200），回调函数会被调用，并传入响应文本。如果请求失败，回调函数会被调用，并传入错误信息。

请注意，现代前端开发中，`XMLHttpRequest` 已经逐渐被新的 `fetch` API 所取代，因为 `fetch` 提供了更简洁的语法和基于 Promise 的接口。但是，了解和使用 `XMLHttpRequest` 仍然是学习 AJAX 的一个重要部分。

## 21. **什么是尾调用，使用尾调用有什么好处？**

尾调用指的是函数的最后一步调用另一个函数。代码执行是基于执行 栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上 下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话， 因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上 下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优 化只在严格模式下开启，正常模式是无效的

## 22. **ES6 模块与 CommonJS 模块有什么异同？**

它们有三个重大差异。

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口(静态)。
- CommonJS 模块的`require()`是同步加载模块，ES6 模块的`import`命令是异步加载，有一个独立的模块依赖的解析阶段。

第二个差异是因为 CommonJS 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

下面重点解释第一个差异。

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件`lib.js`的例子。

```js
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量`counter`和改写这个变量的内部方法`incCounter`。然后，在`main.js`里面加载这个模块。

```javascript
// main.js
var mod = require('./lib');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明，`lib.js`模块加载以后，它的内部变化就影响不到输出的`mod.counter`了。这是因为`mod.counter`是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动后的值。

```javascript
// lib.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中，输出的`counter`属性实际上是一个取值器函数。现在再执行`main.js`，就可以正确读取内部变量`counter`的变动了。

```bash
$ node main.js
3
4
```

ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

还是举上面的例子。

```javascript
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明，ES6 模块输入的变量`counter`是活的，完全反应其所在模块`lib.js`内部的变化。

## 23. **for...in 和 for...of 的区别** 

for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口 

的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 for… in 的区别如下 

for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名

for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 

for … of 只遍历当前对象不会遍历原型链； 

对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原 型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值； 

总结：

- for...in 循环主要是为了遍历对象而生，不适用于遍历数组； 

- for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以 及 Generator 对象

## 24. **ajax、axios、fetch 的区别**

`ajax`、`axios` 和 `fetch` 是三种在 JavaScript 中发起 HTTP 请求的不同方式。它们各自有不同的特点和使用场景：

1. AJAX (XMLHttpRequest):

- **AJAX** 是 Asynchronous JavaScript and XML 的缩写，它不是一个库或框架，而是一种使用 `XMLHttpRequest` 对象进行异步通信的技术。
- `XMLHttpRequest` 是一个浏览器内置对象，允许 JavaScript 发起 HTTP 请求。
- AJAX 请求可以手动处理，包括设置请求头、监听事件、处理响应等。
- AJAX 请求可以是同步的（不推荐，因为会阻塞用户界面）或异步的。
- AJAX 不支持 Promise，通常需要通过回调函数来处理异步结果。

2. Fetch API:

- **Fetch API** 提供了一个更现代、更强大、更灵活的方式来发起网络请求。
- `fetch` 是一个全局方法，返回一个 Promise，这使得它可以很容易地与 JavaScript 的异步特性（如 async/await）结合使用。
- `fetch` 提供了一个更简洁的 API，只需要提供 URL 和一个可选的配置对象。
- `fetch` 默认不会发送或接收 cookies，除非你明确设置 `credentials` 选项。
- `fetch` 不会自动处理 HTTP 错误状态（如 404 或 500），而是需要开发者手动检查响应的 `ok` 状态。

3. Axios:

- **Axios** 是一个基于 Promise 的 HTTP 客户端，可以在浏览器和 Node.js 中使用。
- Axios 提供了一些有用的特性，如自动转换 JSON 数据、客户端支持防御 XSRF。
- Axios 有拦截器功能，允许你在请求或响应被 then 或 catch 处理之前拦截它们。
- Axios 可以处理请求和响应数据的转换，允许你轻松地配置如何将数据发送到服务器或如何将响应数据传递给 then 或 catch。
- Axios 会自动处理 HTTP 错误状态，并且当响应状态码不在 2xx 范围内时，Promise 会被 reject。

### 比较:
- **兼容性**: `XMLHttpRequest` 是最早的 HTTP 通信技术，所有现代浏览器都支持它。`fetch` 是较新的 API，大多数现代浏览器都支持，但在一些旧浏览器中可能需要 polyfill。`axios` 是一个第三方库，需要额外引入，但它可以在所有支持 Promise 的浏览器中工作。
- **语法和易用性**: `fetch` 提供了更现代和简洁的 API，但需要手动处理一些情况（如 HTTP 错误状态）。`axios` 提供了更多的特性和默认行为，这可能使得它在某些情况下更容易使用。
- **性能**: `fetch` 和 `XMLHttpRequest` 的性能相当，因为它们都是浏览器内置的。`axios` 作为一个额外的库，可能会有轻微的性能开销，但通常这不会成为一个问题。

在选择使用哪种技术时，你应该考虑你的项目需求、浏览器兼容性、以及你对 API 的个人偏好。如果你需要更多的功能和更简单的错误处理，`axios` 可能是一个好选择。如果你更倾向于使用原生 API 并且不介意处理一些额外的细节，`fetch` 可能更适合你。如果你正在维护一个需要支持旧浏览器的项目，那么使用 `XMLHttpRequest` 可能是必要的。



## 25. **对原型、原型链的理解**

在 JavaScript 中是使用构造函数来新建一个对象的，每一个构造函 数的内部都有一个 prototype 属性，它的属性值是一个对象，这个 对象包含了可以由该构造函数的所有实例共享的属性和方法。当使用 构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个 指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针 被称为对象的原型。一般来说不应该能够获取到这个值的，但是现在 浏览器中都实现了 __proto__ 属性来访问这个属性，但是最好不要 使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，可以通过这个方法来获取对象的原 型。

当访问一个对象的属性时，如果这个对象内部不存在这个属性，那么 它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原 型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一 般来说都是 Object.prototype 所以这就是新建的对象为什么能够 使用 toString() 等方法的原因。 

特点：JavaScript 对象是通过引用来传递的，创建的每个新对象实 体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对 象也会继承这一改变

## 26. **原型链的终点是什么？如何打印出原型链的终点？**

由于 Object 是构造函数，原型链终点 `Object.prototype.__proto`__， 而 `Object.prototype.__proto__=== null // true`，所以，原型链 的终点是 null。原型链上的所有原型都是对象，所有的对象最终都 是由 Object 构造的，而 `Object.prototype` 的下一级是 `Object.prototype.__proto__`。 

## 27. **对作用域、作用域链的理解**

你不知道的 Javascript 上讲得最好

## 28. **对 this 对象的理解**

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的 对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

第一种是函数调用模式，当一个函数不是一个对象的属性时，直接作 为函数来调用时，this 指向全局对象。 

第二种是方法调用模式，如果一个函数作为一个对象的方法来调用时， this 指向这个对象。 

第三种是构造器调用模式，如果一个函数用 new 调用时，函数执行 前会新创建一个对象，this 指向这个新创建的对象。 

第四种是 apply 、 call 和 bind 调用模式，这三个方法都可以显 示的指定调用函数的 this 指向。其中 apply 方法接收两个参数： 一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数， 第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。 也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举 出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对 象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其 他情况下都不会改变。 这四种方式，使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。 

## 29. **call() 和 apply() 的区别？** 

它们的作用一模一样，区别仅在于传入参数的形式的不同。 apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向， 第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类 数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。 call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是 代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依 次传入函数。

## 30. **异步编程的实现方式**

JavaScript 中的异步机制可以分为以下几种： 

- 回调函数 的方式，使用回调函数的方式有一个缺点是，多个回调函 数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦 合度太高，不利于代码的可维护。 

  > 最大的问题还是信任问题

- Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。 

- generator 的方式，它可以在函数的执行过程中，将函数的执行权转 移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行 的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权 给转移回来。因此在 generator 内部对于异步操作的方式，可以以 同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控 制权转移回来，因此需要有一个自动执行 generator 的机制，比如 说 co 模块等方式来实现 generator 的自动执行。 

- async 函数 的方式，async 函数是 generator 和 promise 实现的 一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将 会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此 可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动 执行。 

## 31. **对 Promise 的理解**

主要是 Promise 的出现到底解决了什么问题。

回调地狱

- 信任问题，因为所谓的回调函数，本质上就是控制反转了，那么回调函数是否会调用，什么时候调用，调用几次，这是控制不了的

Promise 怎么解决的呢？因为它是承诺机制，状态只会改变一次，并且无法逆转，而且状态改变时一定会触发对应的 then 或者 catch 函数

状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在 异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原 型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的 改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的 末尾执行。 

注意：在构造 Promise 的时候，构造函数内部的代码是立即执行的

## 32. **Promise 解决了什么问题**

如上

## 33. **对 async/await 的理解**

async/await 其实是 Generator 的语法糖，

```js
function* generatorFn() {
  console.log('start');
  const result1 = yield request('aaa')  // result1结果是'aaa'
  const result2 = yield request(result1 + 'bbb') // result2结果是'aaabbb'
  const result3 = yield request(result2 + 'ccc')
  console.log(result3)  // 'aaabbbccc'
  console.log('done');
}

function autoGenerator(generatorFn) {
  // 执行传递进来的生成器函数，得到生成器
  const gen = generatorFn();
  
  // 定义递归函数
  function recurse(params) {
    // 调用next并传递参数，得到迭代器
    const g = gen.next(params);
    // 判断迭代器的done的状态
    if(!g.done) {
      // 生成器未结束
      g.value.then((res)=> {
        // 递归调用
        recurse(res);
      })
    }
  }

  recurse()
}

autoGenerator(generatorFn)
```

## 34. **对象创建的方式有哪些？** 

- 第一种是工厂模式
- 第二种是构造函数模式
- 第三种模式是原型模式
- 第四种模式是组合使用构造函数模式和原型模式
- 第五种模式是动态原型模式
- 第六种模式是寄生构造函数模式

## 35. **对象继承的方式有哪些？**

- 第一种是以原型链的方式来实现继承
- 第二种方式是使用借用构造函数的方式
- 第三种方式是组合继承
- 第四种方式是原型式继承
- 第五种方式是寄生式继承
- 第六种方式是寄生式组合继承

## 36. **哪些情况会导致内存泄漏**

以下四种情况会造成内存的泄漏：

- 意外的全局变量：由于使用未声明的变量，而意外的创建了一个全局 变量，而使这个变量一直留在内存中无法被回收。 

- 被遗忘的计时器或回调函数：设置了 setInterval 定时器，而忘记 取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被 一直留在内存中，而无法被回收。 

- 脱离 DOM 的引用：获取一个 DOM 元素的引用，而后面这个元素被删 除，由于一直保留了对这个元素的引用，所以它也无法被回收。 

- 闭包：不合理的使用闭包，从而导致某些变量一直被留在内存当中。