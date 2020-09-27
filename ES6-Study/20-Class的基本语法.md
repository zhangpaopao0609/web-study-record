[toc]

# Class的基本语法

## 1. 简介

### 类的由来

JS中，生成实例对象的传统方法是通过构造函数。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function (){
  return '(' + this.x + ',' + this.y + ')';
}

let p = new Point(1, 2);
```

这种写法和传统的面向对象的语言（c++, java）差异很大，新手很容易困惑

ES6提供更加接近传统语言的写法，引入Class（类）这个概念，作为对象的模板，通过class关键字，可以定义类

基本上，ES6的class可以看做是一个语法糖，它的绝大部分功能，ES5都能完成，新的Class写法只是让对象原型的写法更加清晰、更像面向编程的语法而已。上面的ES6 class写法改写

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
} 
```

上面的代码定义了一个类，可以看到里面有一个Constructor方法,这就是构造方法,而this关键字则代表实例对象.也就是说,ES5的构造函数Point，对应ES6的Point类的构造方法。

ES6的类，完全可以看做构造函数的另一种写法

```javascript
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

上面的code表明，类的数据类型就是函数，类本身就是指向构造函数的

同样使用new来创建实例

构造函数的prototype属性，在ES6的"类"上面继续存在，事实上，类的所有方法都定义在类的prototype属性上面。

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

***<u>在类的实例上面调用类的方法，其实就是调用类原型上的方法</u>***

```javascript
class B {}
let b = new B();

b.constructor === B.prototype.constructor // true
```

由于类的方法都定义在prototype对象上，所以类的新方法可以添加在prototype对象上面，Object.assign可以很方便的一次向类添加多个方法

```js
class Porint {
  constructor() {
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
})
```

另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）

```js
class Point {
  constructor(x, y) {
    
  }
  
  toString() {
    
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ['constructor', 'toString']
```

上面代码中，toString方法是Point类内部定义的方法，它是不可枚举的。这一点与ES5的行为不一致。

```js
var Point = function(x, y) {
  
}

Point.prototype.toString = function() {
  
}

Oject.keys(Point.prototype)
// ['toString']
Object.getOwnPropertyNames(Point.prototype)
// ['constructor', 'toString']
```

### constructor 方法

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

constructor方法默认返回实例对象（即this），完全可以指定返回另一个对象

```js
class Foo {
  constructor() {
    return Object.create(null)
  }
}

new Foo() instanceof Foo
// false
```

### 类的实例

生成类的实例的写法，与ES5完全一样，也是使用new

```javascript
class Point {
  // ...
}

// 报错
var point = Point(2, 3);

// 正确
var point = new Point(2, 3);
```

实例的属性除非显示地定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）

```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

所有的实例都共享一个原型对象

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

上面的code 中，p1和p2都是point的实例，他们的原型都是Point.prototype,所以\_\_proto\_\_属性是相等的。

这也就意味着，可以通过实例的\_\_proto\_\_属性为“类”添加方法

​			\_\_proto\_\_并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多浏览器的JS引擎中都提供了这个私有属性，但是依旧不建议在生产环境中使用该属性，避免对环境产生依赖，生产环境中，我们可以使用Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法或属性

### 取值函数（getter）和存值函数（setter）

类的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

存值函数和取值函数都是设置在属性的Descriptor对象上面的

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

这个似乎类似于对象，在descriptor上进行的设置

### 属性表达式

类的属性名，可以采用表达式

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

console.log(Object.getOwnPropertyNames(Square.prototype));
```

### class 表达式

class有以下两种定义方式

```js
class Foo {
  
}

let Foo = class {
  
}

// 也可以为class增加一个名字
let Foo = class name {
  
}
// 这个name只是内部使用和Foo.getClassName() 使用
// 创建实例时还是使用 Foo  new Foo()
```

### 注意点

1. 严格模式

   类和模块的内部。默认就是严格模式。

2. 不存在提升

   类不存在变量提升（hoist）,这一点和ES5完全不同

   ```js
   new Foo();		// ReferenceError
   class Foo {};
   ```

   这个代码会报错，是因为ES6不会把类的声明提升到代码头部。**这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义**

   ```javascript
   {
     let Foo = class {};
     class Bar extends Foo {
     }
   }
   ```

   上面的代码不会报错，因为Bar集成Foo的时候，Foo已经定义了。但是如果存在class的提升，上面的代码就不对了，因为class提升了，但是let是不会提升的，所以导致Bar继承Foo的时候，Foo还没有定义

3. name属性

   ```javascript
   class Point {}
   Point.name // "Point"
   ```

   `name`属性总是返回紧跟在`class`关键字后面的类名。

4. Generator 方法

   在某个方法前面加上*，就表示方法是一个Generator函数了

5. this的指向

   类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很有可能出错

   ```javascript
   class Logger {
     printName(name = 'there') {
       this.print(`Hello ${name}`);
     }
   
     print(text) {
       console.log(text);
     }
   }
   
   const logger = new Logger();
   const { printName } = logger;
   printName(); // TypeError: Cannot read property 'print' of undefined
   ```

   上面代码中，`printName`方法中的`this`，默认指向`Logger`类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境（由于 class 内部是严格模式，所以 this 实际指向的是`undefined`），从而导致找不到`print`方法而报错。

   1） 解决方法1， 在构造函数中绑定this

   ```js
   class Logger {
     constructor() {
       tiis.printName = this.printName.bind(this);
     }
   }
   ```

   2) 解决方案2， 使用箭头函数

   ```javascript
   class Obj {
     constructor() {
       this.getThis = () => this;
     }
   }
   
   const myObj = new Obj();
   myObj.getThis() === myObj // true
   ```

   ```js
   class Obj {
     constructor() {
       this.getThis = () => this;
     }
   
     getTest = () => {
       return this;
     }
   }
   
   const myObj = new Obj();
   myObj.aa = 1;
   myObj.cc = 2;
   let a = myObj.getTest() === myObj // true
   // myObj.getThis();
   
   console.log(a, myObj.getThis());
   console.log(myObj.getTest());
   
   ```

   

   箭头函数内部的`this`总是指向定义时所在的对象。上面代码中，箭头函数位于构造函数内部，它的定义生效的时候，是在构造函数执行的时候。这时，箭头函数所在的运行环境，肯定是实例对象，所以`this`会总是指向实例对象。

   ????

   3)解决方案3， Proxy， 获取方法的时候，自动绑定this

   ```javascript
   function selfish (target) {
     const cache = new WeakMap();
     const handler = {
       get (target, key) {
         const value = Reflect.get(target, key);
         if (typeof value !== 'function') {
           return value;
         }
         if (!cache.has(value)) {
           cache.set(value, value.bind(target));
         }
         return cache.get(value);
       }
     };
     const proxy = new Proxy(target, handler);
     return proxy;
   }
   
   const logger = selfish(new Logger());
   ```

   ## 2. 静态方法

   类相当于实例的原型，所有在类定义的方法，都会被实例继承，如果一个方法前，加上static关键字，就表示该方法不会被**实例**继承，而是直接通过类来调用，称为静态方法

   ```javascript
   class Foo {
     static classMethod() {
       return 'hello';
     }
   }
   
   Foo.classMethod() // 'hello'
   
   var foo = new Foo();
   foo.classMethod()
   // TypeError: foo.classMethod is not a function
   ```

   注意，如果静态方法包含this关键字，这个this指定的类，而不是实例

   ```javascript
   class Foo {
     static bar() {
       this.baz();
     }
     static baz() {
       console.log('hello');
     }
     baz() {
       console.log('world');
     }
   }
   
   Foo.bar() // hello
   ```

   上面代码中，静态方法`bar`调用了`this.baz`，这里的`this`指的是`Foo`类，而不是`Foo`的实例，等同于调用`Foo.baz`。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

   静态方法虽然不能被实例继承，但是子类却是可以继承的

   ```javascript
   class Foo {
     static classMethod() {
       return 'hello';
     }
   }
   
   class Bar extends Foo {
   }
   
   Bar.classMethod() // 'hello'
   ```

   静态方法也是可以从super对象上调用的

   ```javascript
   class Foo {
     static classMethod() {
       return 'hello';
     }
   }
   
   class Bar extends Foo {
     static classMethod() {
       return super.classMethod() + ', too';
     }
   }
   
   Bar.classMethod() // "hello, too"
   ```

### 3. 实例属性的新写法

实例属性除了定义在constructor方法里面的this上面，也可以定义在类的最顶层

```javascript
class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性`this._count`定义在`constructor()`方法里面。另一种写法是，这个属性也可以定义在类的最顶层，其他都不变。

```javascript
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

上面代码中，实例属性`_count`与取值函数`value()`和`increment()`方法，处于同一个层级。这时，不需要在实例属性前面加上`this`。

这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

```javascript
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

上面的代码，一眼就能看出，`foo`类有两个实例属性，一目了然。另外，写起来也比较简洁。

## 4. 静态属性

静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

上面的写法为`Foo`类定义了一个静态属性`prop`。

## 5. 私有方法和私有属性

### 现有的解决方案

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是十分常见的需求，有利于代码的封装，但ES6不提供，只能通过变通方法模拟实现

1. 做法一是命名上区别

   ```javascript
   class Widget {
   
     // 公有方法
     foo (baz) {
       this._bar(baz);
     }
   
     // 私有方法
     _bar(baz) {
       return this.snaf = baz;
     }
   
     // ...
   }
   ```

   上面代码中，`_bar`方法前面的下划线，表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

2. 将所有方法移出模块，因为模块内部的所有方法都是对外可见的

   ```javascript
   class Widget {
     foo (baz) {
       bar.call(this, baz);
     }
   
     // ...
   }
   
   function bar(baz) {
     return this.snaf = baz;
   }
   ```

   上面代码中，`foo`是公开方法，内部调用了`bar.call(this, baz)`。这使得`bar`实际上成为了当前模块的私有方法。

3. 方法三是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值

   ```javascript
   const bar = Symbol('bar');
   const snaf = Symbol('snaf');
   
   export default class myClass{
   
     // 公有方法
     foo(baz) {
       this[bar](baz);
     }
   
     // 私有方法
     [bar](baz) {
       return this[snaf] = baz;
     }
   
     // ...
   };
   ```

   上面代码中，`bar`和`snaf`都是`Symbol`值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，`Reflect.ownKeys()`依然可以拿到它们。

   ```javascript
   const inst = new myClass();
   
   Reflect.ownKeys(myClass.prototype)
   // [ 'constructor', 'foo', Symbol(bar) ]
   ```

   上面代码中，Symbol 值的属性名依然可以从类的外部拿到。

## 6. new target 属性

new 是从构造函数生成实例对象的命令，ES6为new命令引入了一个new.target属性，该属性一般用在构造函数中，返回new命令作用于构造函数，如果构造函数不是通过new命令或Reflect.construct()的，new.target会返回undefined，因此，这个属性可以用来确定构造函数是怎么被调用的

```javascript
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

上面的代码确保构造函数只能通过new命令调用

Class内部调用new.target,返回当前class

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    this.length = length;
    this.width = width;
  }
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，new.target会返回子类

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
    // ...
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width);
  }
}

var obj = new Square(3); // 输出 false
```

利用这个特点，可以写出不能独立使用，必须继承后才能使用的类

```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```



















