# 原型模式
原型模式不单是一种设计模式，也被称为一种变成泛型。
原型模式
原型编程范式

原型变成范型
- 所有数据都是对象
- 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
- 对象会记住它的原型
- 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型

# JS 中的原型继承
1. 所有的数据都是对象
JS 在设计的时候，模范 Java 引入了两套类型机制：基本类型和对象类型。
??
基本类型通过包装类的方式来变成对象类型
2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
在 JS 中， 我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我们要做的只是显示地调用 `const obj1 = new Object()` 或者 `const obj2 = {}`。此时，引擎内部会从 Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。

一直强调 JS 中没有类的概念。但是我们常用 `new functionName()` 来得到一个对象。如:`new Person()`，这里的 Person 并不是类，而是函数构造器， JS 的函数既可以作为普通函数被调用，也可以作为构造器被掉用户。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。用 new 运算符来创建对象的过程，实际上也只是先克隆 `Object.prototype` 对象，再进行一些其他额外操作的过程（暂时认为是一个完完全全的克隆过程吧！）。

在 chrome 和 firefox 等向外暴露了对象 `__proto__` 属性的浏览器下，可通过以下代码来理解 new 运算的过程。
```js
function Person(name) {
  this.name = name;
};

Person.prototype.getName = function() {
  return this.name;
};

const objectFactory = function() {
  const obj = new Object();   // 从 Object.prototype 上克隆一个空的对象
  const Constructor = Array.prototype.shift.call(arguments);    // 取得外部传入的构造器，此例是 Person
  obj.__proto__ = Constructor.prototype;    // obj 的 __proto__ 属性指向构造函数的原型（prototype），这样可以继承到原型链上的属性和方法
  const ret = Constructor.apply(obj, arguments);    //  构造函数执行，但是 this 的指向了 obj，这样 obj 就获取到了 实例属性 
  return typeof ret === 'object' ? ret : obj;
};

const a = objectFactory(Person, 'sven');
console.log(a);
console.log(a.name);
console.log(a.getName());

const b = new Person('ardor');
console.log(b);
console.log(b.name);
console.log(b.getName());
```