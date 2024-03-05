[toc]

# Generator 函数的异步应用

由于JS的执行环境是“单线程”的，必须要用异步编程

## 1. 传统方法

ES6诞生以前，异步编程的方法，大概有以下四种

- 回调函数
- 事件监听
- 发布/订阅
- Promise对象

js 红皮

you dont know js

js 绿皮

## 2. 基本概念

### 异步

### 回调函数

callback

```javascript
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});
```

### Promise

Promise对象的出现解决了回调地狱，它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

Promise的最大问题就是代码冗余

## 3. Generator函数

### 协程

传统的编程语言，早就有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做“协程”（coroutine），意思是多个线程互相协作，完成异步任务

- 第一步，协程`A`开始执行。
- 第二步，协程`A`执行到一半，进入暂停，执行权转移到协程`B`。
- 第三步，（一段时间后）协程`B`交还执行权。
- 第四步，协程`A`恢复执行。

```javascript
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```

上面代码的函数`asyncJob`是一个协程，它的奥妙就在其中的`yield`命令。它表示执行到此处，执行权将交给其他协程。也就是说，`yield`命令是异步两个阶段的分界线。

协程遇到`yield`命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除`yield`命令，简直一模一样。

## 协程的Generator函数实现

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

### Generator 函数的数据交换和错误处理

Generator函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。

### 异步任务的封装

## 4. Thunk 函数

Thunk 函数是自动执行Generator函数的一种方法

传值调用

传名调用



### Thunk 函数的含义

编译器的“传名调用”实现，往往就是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做Thunk函数

```javascript
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

上面代码中，函数 f 的参数`x + 5`被一个函数替换了。凡是用到原参数的地方，对`Thunk`函数求值即可。

这就是 Thunk 函数的定义，它是“传名调用”的一种实现策略，用来替换某个表达式。

### JS语言的Thunk函数 

JS语言是传值调用

### Generator函数的流程管理

Thunk函数有什么用？

Generator函数可以自动执行

```js
function* gen() {
  // ...
}

var g = gen()；
var res = g.next();

while(!res.done) {
  console.log(res.value);
  res = g.next();
}
```

上面代码中，Generator函数gen会自动执行完所有步骤

但是，这不适合异步操作，

## 5. co模块

### 基于Promise对象的自动执行

```javascript
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

然后，手动执行上面的Generator函数

```js
var g = gen();
g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data)
  })
})
```

手动执行其实就是用then方法，层层添加回调函数，理解这一点，就可以写出一个自动执行器

```javascript
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
```

上面的代码中，只要Generator函数还没有执行到最后一步，next函数就调用自身，以此实现自动执行

### co模块的源码

co其实就是上面那个自动执行器的扩展

## 实例： 处理Stream



Node提供Stream模式读写数据，特点是一次只处理数据的一部分，数据被分成一块块依次处理，就好像“数据流”一样。这对于处理大规模数据非常有利。Stream模式使用EventEmitter API，会释放三个事件

- data事件：下一块数据块已经准备好了
- end事件，整个数据流处理完了
- error事件，发生错误

使用Promise.race()函数，可以判断这三个事件之中哪一个最先发生，只有当data事件最先发生时，才进入下一个数据块的处理。从而我们可以通过一个while循环，完成所有数据的读取

```javascript
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
```

上面代码采用 Stream 模式读取《悲惨世界》的文本文件，对于每个数据块都使用`stream.once`方法，在`data`、`end`、`error`三个事件上添加一次性回调函数。变量`res`只有在`data`事件发生时才有值，然后累加每个数据块之中`valjean`这个词出现的次数。

































