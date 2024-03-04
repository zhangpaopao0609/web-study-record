[toc]

# 2022 年 JavaScript 都有哪些更新? 

2023 已经快一半了，不知道对于 2022 年 JavaScript 的更新点大家是否都有所尝试或者已经在项目中使用起来了呢？

那本文来就和大家一起来回顾一下 2022 年 JavaScript 有哪些更新吧，看哪些点是能为我们开发带来便捷的、哪些点又是我们可以吐槽的。

> 文章所聊的均已进入 Stage4 的提案，换句话说，这都已是或即将是 ES 的标准

<img src="./img/ES2022.png" alt="ES2022" style="zoom:50%;" />

## 0. 写在前面的

1. TC39：JS 语言标准委员会(更新和推动 JS 发展)

   在 2015 年之前，整个 JS 的发展是这样的： ES3(1999) -> ES5(2005) -> ES6（ES2015, 2015) ，彼时 JS 的发展相对缓慢。自 2015 年起，JS 发展迅猛，每年 6 月都会发布 ES20XX。

   > ES 指 ECMAScript，ECMAScript 是标准语言， JavaScript 是 ECMAScript 的实现

2. 提案

   TC39 为了给不断发展 JavaScript，建立了提案的机制，协会成员或代表可提出新功能、新模块或新语法等的提案，经过层层投票（赞同进入或拒绝规范），最终成功进入 stage4 的将会作为 ECMAScript 规范

   > 1. 每一个提案都会从 stage1 开始，经过讨论投票然后进入下一个 stage 或直接拒绝
   >
   > 2. TC39 专门在 github 上建了 [proposals](https://github.com/tc39/proposals) 仓库，供提交提案及阅览

## 1. Error cause(ES2022)

1. 提案信息
   - 提案作者：吴成忠（@legendecas），阿里巴巴
   - 提案[详细内容传送门](https://github.com/tc39/proposal-error-cause)

2. 识别问题

   当前的错误信息在对外暴露时未提供规范方式。如果开发者直接暴露 catch 到的 error 信息，会存在以下问题：

   - 得到的是底层错误，自然错误无法直接表达业务意义
   - 函数中有多个 catch 时，无法知道具体是哪一个 catch 到的错误
   - 一般情况直接暴露底层操作的错误也不是很友好
   - 没有适当的异常设计模式：比如链式错误模式

   那么当前存在的这些问题开发者一般是怎么去解决的呢？如下代码所示：

   ```js
   async function doJob() {
     await fetch('//domain/resource-a')
       .catch(err => {
         // 开发者一般会如何包装这个错误呢?
         // 方式1. throw new Error('下载资源失败: ' + err.message);
         // 方式2. const wrapErr = new Error('下载资源失败');
         //    		wrapErr.cause = err;
         //    		throw wrapErr;
         // 方式3. class CustomError extends Error {
         //      		constructor(msg, cause) {
         //        		super(msg);
         //        		this.cause = cause;
         //      		}
         //    		}
         //    		throw new CustomError('下载资源失败', err);
       })
   }
   await doJob(); // => TypeError: Failed to fetch
   ```

   也就是说，上述所说的问题目前是可以由开发者自己去实现的，比如上面代码中的方式 1、2、3， 分别在抛出具体信息错误的同时携带了底层的 error 信息。

   但是：

   - 麻烦而且各有所不同
   - 缺乏标准的做法，日志和调试工具也无法提供帮助

3. 解决方案

   为 `Error` 增加一个参数，接收一个选项 `{cause: xxx}`，这样当上层在捕获错误时，就可以直接通过错误信息的 `cause` 属性获取传递的值。

   ```js
   sync function doJob() {
     await fetch('//domain/upload', { method: 'POST', body: jobResult })
       .catch(err => {
         throw new Error('上传资源失败', { cause: err });
       });
   }
   try {
     await doJob();
   } catch (e) {
     console.log(e);
     console.log('Caused by', e.cause);
   }
   // Error: 上传资源失败
   // Caused by TypeError: Failed to fetch
   ```

4. 个人评价

   **提案相对简单，但非常实用，工程实用价值很高**。错误捕获能极大地提高程序的鲁棒性。

   目前浏览器都已经支持了，在调试的时候就能看到对应的支持。



## 2. findLast`/`findLastIndex (ES2023)

1. 提案信息
   - 提案作者：王文璐（@Kingwl），前微软中国
   - 提案[详细内容传送门](https://github.com/tc39/proposal-array-find-from-last)

2. 识别问题 

   目前 ES 提供了`find` 和 `findIndex` ，即在数组中从前往后找，找出第一个符合条件的成员/成员位置，但没有提供从后往前找的方法。

   要实现从后往前找，也是有办法可以解决，比如将数组 reverse，再使用 `find` 和 `findIndex`，如下：。

   - 如果是查找成员，reverse 后 find 没问题
   - 如果是查找成员位置，就需要特别注意了：
     - 如果能查找到（即结果不是 -1），那么需要用数组长度减去位置才能得到结果
     - 如果未能查找到（即结果是 -1），那么返回 -1

   所以，虽然开发者能自己去实现这个动作，但相对是比较复杂的。

   ```js
   const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
   array.find(n => n.value % 2 === 1); // { value: 1 }
   array.findIndex(n => n.value % 2 === 1); // 0
   // find
   [...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }
   // findIndex
   array.length - 1 - [...array].reverse().findIndex(n => n.value % 2 === 1); // 2
   array.length - 1 - [...array].reverse().findIndex(n => n.value === 42); // 应该是 -1, 但得到了 4，所以结果还需要判断
   ```

3. 解决方案

   既然开发者能实现，那么规范当然也是可以的，所以就是将这两个方法添加到规范中即可。

   ```js
   // find
   array.findLast(n => n.value % 2 === 1); // { value: 3 }
   // findIndex
   array.findLastIndex(n => n.value % 2 === 1); // 2
   array.findLastIndex(n => n.value === 42); // -1
   ```

4. 个人评价

   不论是从使用频率还是说从API 完整性和性能等方面考虑，这两个方法都是必要的。所以加上是一个理所应当的事情。

## 3. RegExp Match Indices (ES2022)

1. 提案信息
   - 提案作者：Ron Buckton，微软
   - 提案[详细内容传送门](https://github.com/tc39/proposal-regexp-match-indices)

2. 识别问题

   当前的正则匹配无法获取到捕获组的索引位置，如下代码所示，正则能够获取到其匹配的起始位置信息，即返回的 `index`，但捕获组位置信息没有。

   ```js
   const arranges = `arranges:
     - 成都
       时间: 2023.5.1
       地点: 春熙路
     - 重庆
       时间: 2023.5.3
       地点: 朝天门
   `;
   
   for (const item of arranges.matchAll(/时间:\s*(.+)/g)) {
     console.log(item);
   }
   // [ '时间: 2023.5.1', '2023.5.1', index: 21, ... ]
   // [ '时间: 2023.5.3', '2023.5.3', index: 57, ... ]
   
   // 有什么问题呢？问题是没有捕获组的索引位置
   ```

   有什么场景会用到捕获组索引位置呢？举个例子，在文档或者编辑器中，希望对某个内容进行高亮，那么当用正则的捕获组匹配到时，就需要使用捕获组的索引信息。

3. 解决方案

   在 ES 中增加这个功能即可，本身能够捕获到，那么需要做的无非就是将位置信息返回。

   要使用这个功能，只需要在正则表达式后面加上 `d` 这个标识，用法跟其他的如 `g` `i` 是一样的。

   ```js
   for (const item of arranges.matchAll(/时间:\s*(.+)/dg)) {
     console.log(item);
   }
   // [ '时间: 2023.5.1', '2023.5.1', index: 21, indices: [ [ 57, 69 ], [ 61, 69 ] ], ... ]
   // [ '时间: 2023.5.3', '2023.5.3', index: 57, indices: [ [ 57, 69 ], [ 61, 69 ] ], ... ]
   
   // 增加一个 `indices: [ [ 57, 69 ], [ 61, 69 ] ]`
   ```

   加上 `d` 标识后，结果会增加一个 `indices: [ [ 57, 69 ], [ 61, 69 ] ]`，数组的第一项是正则匹配到的内容的起始位置，第二项是捕获组的起始位置。

   > 为什么不是直接加到正则方法中而是要用一个标识来设置呢？
   >
   > 原因很简单：性能。因为并不是所有时候都需要这个位置信息。

4. 个人评价

   有价值，但用得其实不多，本身场景就少。 

## 4. Object.hasOwn() (ES2022)

1. 提案信息
   - 提案作者：Jamie Kyle, Rome；Tierney Cyren, Microsoft
   - 提案[详细内容传送门](https://github.com/tc39/proposal-accessible-object-hasownproperty)

2. 识别问题

   JavaScript 对象的属性分成两种：自身的属性和继承的属性。现在对象实例有一个`hasOwnProperty()`方法，可以判断某个属性是否为自身的属性，但这个方法不够健壮，因为 `hasOwnProperty()`方法从原型上继承而来的，那么如果是以下这些情况，就会出现问题：

   - 如果创建的对象上覆盖了这个方法，如 `let o = { hasOwnProperty: "覆盖了原型上的方法" }`

   - 如果创建的对象是没有原型的，如 `Object.create(null)`

   ```js
   let o = { hasOwnProperty: "覆盖了原型上的方法" }
   o.hasOwnProperty("foo")
   // TypeError: o.hasOwnProperty is not a function
   Object.create(null).hasOwnProperty("foo")
   // Uncaught TypeError: hasOwnProperty is not a function
   ```

   那么想要写得相对健壮一些，可以写成如下这般：

   ```js
   // 健壮但繁琐的写法
   let hasOwnProperty = Object.prototype.hasOwnProperty
   if (hasOwnProperty.call(o, "foo")) {
     console.log("foo 是自身的属性")
   }
   // 或者
   if (Object.getOwnPropertyDescriptor(o, "foo")) {
   	console.log("foo 是自身的属性")
   }
   ```

   > 其实 `hasOwnProperty.call` 依旧不够健壮，因为 `call` 也是从原型来的

3. 解决方案

   增加 `Object.hasOwn` 这个静态方法。

   ```js
   if (Object.hasOwn(o, "foo")) {
     console.log("foo 是自身的属性")
   }
   ```

   > 有两个点可以插播一下
   >
   > 1. 为什么不直接用 `Object.getOwnPropertyDescriptor` 就好了
   >
   >    目的不一样，`Object.getOwnPropertyDescriptor` 是返回属性的描述对象，能够判断出是否为自有属性仅是开发者利用了它的机制。
   >
   > 2. 为什么不直接叫 `Object.hasOwnProperty` 
   >
   >    因为 `Object.hasOwnProperty` 已经有了，`Object` 也会指向 `Object.prototype` 的。

4. 个人评价

   在某些场景下是有使用价值的，但相对来说场景不多。而且现有的方法基本能够满足了，当然新的方法肯定更加健壮。



## 5. Array.at() (ES2022)

1. 提案信息
   - 提案作者：Tab Atkins, Shu-yu Guo, Google
   - 提案[详细内容传送门](https://github.com/tc39/proposal-relative-indexing-method)

2. 识别问题

   JavaScript 不支持数组的负索引，如果要引用数组的最后一个成员，不能写成 `arr[-1]`，只能使用 `arr[arr.length - 1]`。

3. 解决方案

   增加 `at` 方法，接受一个整数作为参数，返回对应位置的成员，支持负索引。

   ```js
   let last = array.at(-1)
   ```

4. 个人评价

   总结：实用价值较小，最好不要使用，有坑。

   原因：

   - `at` 方法只能获取，不能设置。

     假如要对数组的最后一项做一个累加。

     一般常用的写法如下，取出来然后设置

     ```js
     ++array[array.length - 1]
     ```

     如果使用 at，这就非常奇怪了，比之前还要麻烦。

     ```js
     array[array.length - 1] = array.at(-1) + 1
     ```

   -  `arr.at(i)` 和 `arr[i]` 在处理非索引时语义不同

     `at` 是位置，`[i]` 是属性，所以当参数是非索引时，`at` 会将其转为 number，不能转的认为是 0，`[i]` 就是属性的机制了

   - 当 `arr.at(-idx)` 中的 `idx` 是计算值时会有问题

     `arr.at(arr.length - 0)` 所要表达的意图是边界，可如果当 `arr.length` 恰好为 0 时，`arr.at(0 - 0)`  这时候程序的意图是数组的第一个了，意图上有所不同了。



## 5. Hashbang `#!` (ES2023)

1. 提案信息
   - 提案作者：Bradley Farias, Node.js
   - 提案[详细内容传送门](https://github.com/tc39/proposal-hashbang)

2. 识别问题

    为了能在 linux 环境下直接执行 js 脚本，而不需要使用 `node xxxx.js`  这样的方式来执行脚本，node 提供了 `Hashbang`，即在文件开头加上 `#!/usr/bin/env node`。

   ```js
   #!/usr/bin/env node
   console.log(1);
   ```

   虽然 `Hashbang` 现在是可以运行也可以使用的，但这却并不是 ES 的标准，而是 Node 做的特殊处理。

   既然是 Node 做的特殊处理，所以，`#!/usr/bin/env node` 在浏览器里是会报错的，当然一般情况我们并不会这样使用。

3. 解决方案

   所以解决方案就是将其纳入 ES 标准。这样浏览器、CLI 都可以认识，只是说对于浏览器来说没啥意义。

4. 个人评价

   **存在潜在风险。**

   在`hashbang` 进入标准之前，它只用于 Node 脚本，而当进入标准之后，很可能被滥用于同构脚本，从而导致一些无法预料的问题。原因如下：**`hashbang` 即`#!/usr/bin/env node` 只能放在脚本的开头，否者就会报错（即便 `hashbang` 前是空格也会报错）**。

   > 为什么只能放在脚本开头：因为提案作者认为 `hashbang` 仅在脚本开头才有意义，否者就是没有意义的，那么没有意义的事情就应该提前报错，详细可看[这里](https://github.com/tc39/proposal-hashbang)

   可在绝大部分 JS 同学看来，在 JS 脚本前后加空格或者注释是不会影响脚本行为的，这其实是一个共识，应该是从 JS 诞生到到这个这个提案出现之前，这就是一个共识，可是，这个提案算是彻底地打破了这个共识了。

   在 JS 脚本前或后加入注释的场景其实非常多，比如：

   - 批量在脚本前加入版权和许可证信息
   - 在脚本前加入调试信息
   - 脚本与脚本简单组合
   - 脚本格式的转换，如 `commjs` 转化为 `amd/umd`

   在这些场景下，如果开发者无意或者第三方库添加了 `hashbang`，那么就会直接报错。所以 `hashbang` 进入标准是存在潜在风险的。

   > 其实要解决这个潜在风险还是很简单的，如果 ES 并不强制报错，即当 `hashbang` 不在开头时不强制报错，直接将其认为是一个注释，那么就没啥了

## 6. Top-level Await (ES2022)

1. 提案信息
   - 提案作者：Myles Borins, Google; Yulia Startsev, Mozilla
   - 提案[详细内容传送门](https://github.com/tc39/proposal-top-level-await)

2. 识别问题

   某些场景下需要使用顶层的 `await`，如下示例：

   - `awaiting.mjs` 对外暴露了一个需要异步获取的值。因为是异步，所以写了一个 IIFE 来实现 `async await`

     ```js
     let output;
     (async () => {
       output = await new Promise((resolve) =>
         setTimeout(() => resolve(6), 500)
       );
     })();
     
     export { output };
     ```

   - `test.mjs` 引用 `awaiting.mjs` 暴露的值

     ```js
     // test.mjs
     import { output } from "./awaiting.mjs";
     
     console.log(output);  
     // 输出：undefined
     
     setTimeout(() => console.log(output), 1000); 
     // 1 秒钟后，输出 6 
     ```

   此时，就会出现问题，因为 `awaiting.mjs`  暴露的是一个异步值，所以直接输出时是没有值的 `undefined`，需要等待异步结束才会有值。这就是问题所在了，因为通常情况下，我们是希望暴露的就是异步后的值了。

   > 这里都只是模拟异步哈

3. 解决方案

   顶层 `await`。即直接可以在脚本中写顶层的 `await` 而不需要像 `awaiting.mjs` 那样麻烦，同时所有 `import` 了的模块，**都需要等到被引用文件的 `await` 执行完成才能执行**。

   如此不仅使得顶层使用 `await` 更方便了，同时还解决了引用的是异步值但立即执行时拿不到的情况。

4. 个人评价

   **对于 Node 项目还行，对于 Web 项目有大坑**。来看两个例子：

   - 示例 1

     有一个 Top-level Await 的模块（简称 TLA）

     ```js
     // awaiting.js
     let output = await new Promise((resolve) =>
       setTimeout(() => resolve(6), 500)
     );
     
     export { output };
     ```

     HTML 入口使用

     ```html
     <script type="module">
       localStorage.setItem("name", "zhangpaopao");
       import "./awaiting.js";
     </script>
     
     <script type="module">
       console.log(localStorage.getItem("name"));
       // 首次，打印的结果 null；刷新后打印的结果为 'zhangpaopao'
     </script>
     ```

     此时会发生一个什么情况呢？就是首次会打印 `null`， 刷新后打印的结果为 `zhangpaopao`，这是为什么呢？因为首次运行时，`"./awaiting.js"` 是一个 TLA，`localStorage.setItem("name", "zhangpaopao")` 会等到 TLA 中的 `await` 执行完成后才能执行，所以 `localStorage.getItem("name")` 为 `null`，刷新后有是因为已经存下来了。

   - 示例 2

     同样有一个 TLA 的模块，同示例 1 一致。

     然后，HTML 入口使用：

     ```html
     <script type="module">
       addEventListener('load', () => {
         // doSomething() 执行操作
       })
       import "./awaiting.js";
     </script>
     ```

     这里监听了 `load` 事件，因为页面加载所耗时间并不一致，受网络环境、页面资源等因素的影响，有可能很快就会触发  `load` 事件，也有可能很慢才能触发，而因引入了 TLA 的缘故， `addEventListener` 需要等到 TLA 中的 `await` 执行完成后才能执行，所以是否能够监听到 `load` 并不受控制，这坑可就太大了。

   从以上两个示例相信能够看出 TLA 存在很大的问题了，不仅如此，它还有如下的这些问题：

   - TLA 隐式传递，所有依赖 TLA 的模块都变成异步模块
   - TLA 可见性很差，以至于很容易无意间引入 TLA
   - 任何深层依赖的 TLA 都可以阻塞整个应用（异步）
   - 无意间引入的 TLA 可以改变代码的执行序（异步）



## 7. Class fields (ES2022)

1. 提案信息
   - 提案作者：Daniel Ehrenberg, Jeff Morrison
   - 提案[详细内容传送门](https://github.com/tc39/proposal-class-fields)

2. 识别问题

   主要是对 `class` 的一些优化和补充。

3. 解决方案

   - 属性声明优化

     之前实例属性只能定义在 `constructor()` 方法里的 `this` 上。新增的写法是可以直接定义在类内部的最顶层，这种新写法的好处是：

     - 所有实例对象自身的属性都定义在类的最外层，看上去比较整齐，一眼就能看出这个类有哪些实例属性。
     - 写起来也相较简化一些

   - 私有属性： 

     添加了私有属性，方法是在属性名之前使用`#`表示。私有属性，只能在类的内部使用。如果在类的外部使用，就会报错。

   - 静态块

     [静态块](https://github.com/tc39/proposal-class-static-block)（static block），允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。

   ```js
   class Test {
     // 属性新写法
     foo = 1;
     // 私有属性
     #bar = 2;
     // 私有方法
     #handle() {}
     // 静态属性
     static x = 3;
     static y;
     // 静态块，仅会在类生成时运行一次
     static {
       this.y = this.x / 2;
     }
   }
   ```

   

   ES2022 对于 `class` 所作的主要是这三点，当然还有一些，如公共属性、静态属性静态方法等。详细可点击[查看](https://github.com/tc39/proposal-class-fields)，这里就不赘述了。

4. 个人评价

   `class` 在 ES 中的发展一直相对缓慢，主要原因是 ES 的继承是用原型链来实现的，在 ES6 之前，要想生成实例对象的传统方法是构造函数。

   ```js
   function Animal(name) {
     this.name = name;
   }
   
   Animal.prototype.isWhat = function () {
     return `This is a ${this.name}`;
   };
   
   const dog = new Animal("dog");
   console.log(dog.isWhat());
   // This is a dog
   ```

   这种写法本身就与传统的面向对象语言有很大差异。

   直到 ES6 才有了与传统语言写法想进的 `class`，但它的底层实际上还是原型链，它只是一个糖罢了。所以原型链有的缺陷它都有，而且，新的这些特性还存在一些使用上的坑，TS 能做一些检查，但并不能保证完全避免， 至于这些坑，这里就不一一说明了，我会另起一篇文章来聊聊 `class` 使用上的坑点，一来因为多二来也是需要细细地讲才能清楚。

   所以，个人对此的评价是，正常地使用不会有太大的问题，如果能使用 TS 最好使用，确实 TS 能规避异步。



## 8. 聊点其它的

1. ES 的发展为什么感觉越来越慢了

   ECMAScript 发展至今已经二十多年了（1997 年首版），很多语言特性都已经被提案所覆盖，特别是 ES5、ES6，这两个版本所提内容不仅多而且都非常优质。

   那么为什么感觉发现到现在越来越少了呢？其实很简单，一些利好的、简单的已经被大家所提了，所以慢慢地就到了一个瓶颈期了。与此同时，历史的包袱和所需要考虑的点也就越来越多了，所以进度上慢下来了也是正常的发展。

2. 似乎 ES2022 新增的点都有很多的坑点，为什么最终还是进入了标准

   这个怎么说呢？很多时候一个提案是否能够最终进入 Stage4，并不是那么简单的，一般都是多方考虑和妥协的结果，比如有时候开发商（浏览器开发商）可能觉得这个特性很适合，那么他们可能拥有更大的话语权。

3. 开发者是否有机会提案

   能够参与 TC39 会议的代表，需要所在企业成为 TC39 的会员（当然也就是说要交钱了），然后才能有机会去参与。具体的会费和权益[点击查看](https://www.ecma-international.org/about-ecma/join-ecma/)。



**参考**

- https://github.com/tc39/proposals/blob/main/finished-proposals.md

- https://johnhax.net/2022/JS-is-dead/slide#125

- https://alexewerlof.medium.com/node-shebang-e1d4b02f731d
- https://www.ecma-international.org/about-ecma/join-ecma/