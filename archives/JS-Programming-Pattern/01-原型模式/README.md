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
3. 对象会记住它的原型
一直在讨论"对象的原型"，就 JS 的真正实现来说，其实并不能说对象有原型，而只能说对象的构造器有原型。对于"对象把请求委托给它自己的原型"这句话，更多的说法是对象把请求委托给它的构造器的原型。那么对象如何把请求顺利转交给它的构造函数的原型的呢？

JS 给对象提供了一个名为 `__proto__` 的隐藏属性，某个对象的 `__proto__` 属性默认会指向它的构造器的原型对象，即 `{Constructor}.prototype`。可在 chrome 或者 firefox 上验证：
```js
const a = new Object();
console.log(a.__proto__ === Object.prototype)  // true
```
实际上， `__proto__` 就是对象跟 "对象构造器的原型" 联系起来的纽带。

4. 如果对象无法相应某个请求，它会把这个请求委托给它的构造器的原型
在 JS 中， 每个对象都是从 Object.prototype 对象克隆而来的，如果是这样的话，我们只能得到单一的继承关系，即每个对象都继承自 Object.prototype， 这样的对象系统显然是非常受限的。

实际上，虽然 JS 的对象最初都是由 Object.prototype 对象克隆而来的，但对象构造器的原型并不仅限于 Object.prototype 上，而是可以动态的指向其它对象。这样一来，当对象 a 需要借用对象 b 的能力时，可以有选择地把对象 a 的构造器的原型指向对象 b，从而达到继承的效果。下面的代码是我们常见的原型继承方式：
```js
const obj = { name: 'ardor' };

const A = function() {};
A.prototype = obj;

const instanceA = new A();
console.log(instanceA.name);
```
我们来看看执行这段代码的时候，引擎做了什么？
- 首先，尝试遍历对象 instanceA 中的所有属性，但没有找到 name 这个属性
- 查找 name 属性的这个请求被委托给对象 instanceA 的构造函数的原型，它被 `instanceA.__proto__` 记录着并且指向 A.prototype, 而 A.prototype 被设置为对象 obj
- 在 obj 中找到了 name 属性，并返回它的值

当我们期望得到一个 "类" 继承自另一个 "类" 的效果时，往往会用下面的代码来模拟实现：
```js
// 简单的原型链继承
const A = function() {};
A.prototype = { name: 'ardor-zhang' };

const B = function() {};
B.prototype = new A();

const b = new B();
console.log(b.name);


//  盗用构造函数 + 原型链 实现继承
function Person(feature) {
  this.feature = feature;
};

Person.prototype.getFeature = function() {
  return this.feature;
};

function Man(...args) {
  Person.apply(this, args);
};

Man.prototype = new Person();
// Man.prototype = Person.prototype;

const ardor = new Man('ardor');

console.log(ardor);
console.log(ardor.feature);
console.log(ardor.getFeature());
```

上面有两种方式，这里来讲讲第一种方式（第一段代码）在执行时，引擎做了什么事情
- 首先，尝试遍历对象 b 中的所有属性，但没有找到 name 这个属性
- 查找 name 属性的请求被委托被对象 b 的构造器的原型，它被 `b.__proto__` 记录并执行 B.prototype。而 B.prototype 被设置为一个通过 new A() 创建出来的对象。
- 在该对象中依然没有找到 name 属性，于是请求被继续委托给这个对象的构造器的原型， 即 `A.prototype`
- 在 `A.prototype` 中找到 name 属性， 并返回它的值。

和把 B.prototype 直接指向一个字面量对象相比（B.prototype = A.prototype）,通过 B.prototype = new A() 形成的原型链比之前多了一层。但二者之间并没有本质的区别，都是将对象构造器的原型指向另一个对象，继承总是发生在对象和对象之间。

最后还要留意一点，原型链并不是无限长的。比如访问对象 b 的address 属性，而对象 b 和它构造器的原型上都没有 address 属性，name这个请求最终会到哪里尼？

实际上，当请求到达 A.prototype 时，并且在 A.prototype 中也没有找到这个属性的时候，请求会被传递到 A.prototype 的构造器的原型上，即 Object.prototype, 显然 Object.prototype 也是没有的，但 Object.prototype 的原型是 null， 说明这时候原型链的后面已经没有别的节点了，所以请求就到此打住，b.address 返回 undefined。