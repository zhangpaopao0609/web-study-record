[toc]

# Generator 函数的语法

## 简介

### 基本概念

ES6 提供的一种异步编程解决方案

Genetarator 函数的是一个普通的函数，有两个特征：

1. function关键字与函数名之间有一个星号；
2. 函数体内使用yield表达式，定义不同的内部转态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上述函数内部有两个yield表达式，即该函数有三个状态，hello，world和return语句

### yield 表达式

Generator 函数可以不同yield表达式，这时就变成了一个单纯的暂缓执行函数

```javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
```

上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是函数f是一个generator函数，就会变成只有调用next方法时，函数f才会执行

### 与Iterator 接口的关系

## 2. next方法的参数

yield 表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当做上一个yield表达式的返回值

```javascript
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

上面g.next() 方法返回值{ value: 0, done: false }， 这个值是yield表达式运行完成后的值，和yield表达式是两个概念，yield本身是没有返回值的，有值的是g.next()这个方法返回

Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行后，继续向函数体内注入数据，也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为

## for...of 循环

for...of 可以自动遍历generatr函数生成的iterator对象，而且此时不需要调用next方法

```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

一旦next方法上返回的值done为true，for...of就会直接中断，所以上面的6没有打印出

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

利用generator和for...of循环实现斐波那契数列，很有意思的，可以仔细看看

原生的JS对象不支持for...of遍历，只能使用for...in 遍历，通过Generator函数为对象加上接口，就可以使用了

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

除了for...of循环，扩展运算符，解构赋值和Array.from()方法内部调用的都是遍历器接口。这意味着，他们都可以将Generator函数返回的Iterator对象，作为参数。

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

## 4. Generator.prototype.throw()

## 5. Generator.prototype.return()

Generator函数返回的遍历器对象，还有一个return对象，可以返回给定的值，并且终结遍历Generator函数

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

调用return方法时不提供参数，则返回值得value属性为undefined

## 6. next() throw() return() 的共同点

本质上是一件事情，作用都是让generator函数回复执行，并且使用不同的语句替换yield表达式

next()是将yield表达式替换成一个值

```javascript
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

上面代码中，第二个`next(1)`方法就相当于将`yield`表达式替换成一个值`1`。如果`next`方法没有参数，就相当于替换成`undefined`。

throw() 是将yield表达式替换成一个throw语句

return() 是将yied表达式替换成一个return语句

## 7. yield* 表达式

如果在generator函数内部调用另一个generator函数，需要在前者的函数体内部，自己手动完成遍历

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y
```

如果多层嵌套，就麻烦了

ES6 提供了 yield* 表达式，作为解决办法，用来在一个generator函数里面执行另一个generator函数

```javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

```javascript
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
```



## 8. 作为对象属性的generator函数

如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

```javascript
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```

```javascript
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

## 9. Gneerator 函数的this

Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，也继承了Generator函数的prototype对象上的方法

```javascript
function* g() {}

g.prototype.hello = function () {
  return 'hi!';
};

let obj = g();

obj instanceof g // true
obj.hello() // 'hi!
```

上面的代码表明，Generator函数g返回的遍历器ibj是g的实例，而且继承了g.prototype。但是，如果把g当成普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象

```javascript
function* g() {
  this.a = 11;
}

let obj = g();
obj.next();
obj.a // undefined
```

也不能new

可以采用变通方法。首先，生成一个空对象，使用call方法绑定generator函数内部的this。这样，构造函数调用以后，这个空对象就是generator函数的实例对象了

```javascript
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

obj.a // 1
obj.b // 2
obj.c // 3
```

上面的代码中，执行的是遍历器对象f，但是生成的对象实例时obj，有没有办法将这两个对象统一呢？

一个办法就是讲obj换成F.prototype

```javascript
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

再将F改成构造函数，就可以对它执行nex命令了

```javascript
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
```

## 10. 含义

### Generator与状态机

### Generator与协程

这种可以并行执行、交换执行权的线程（或函数），就称为协程

JavaScript是单线程语言，只能保持一个调用栈

## 11. 应用

### （1） 异步操作的同步化表达

```javascript
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

### （2）控制流管理

### （3）部署Iterator接口

### （4）作为数据结构





























