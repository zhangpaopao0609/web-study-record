[toc]

# Class的继承

## 1. 简介

Class可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```javascript
class Point {
}

class ColorPoint extends Point {
}
```

ColorPoint继承了Point类的所有属性和方法。

```js
class  ColorPoint extend Point {
  constructor(x, y, color) {
    super(x, y);  // 调用父类的constructor(x, y)
    this.color = color;
  }
  
  toString() {
    return this.color + ' ' + super.toString();  // 调用父类的toString() 
  }
}
```

面代码中，`constructor`方法和`toString`方法之中，都出现了`super`关键字，它在这里表示父类的构造函数，用来新建父类的`this`对象。

==子类必须在constructor方法中调用super方法，**否则新建实例会报错**，这是因为子类自己的this对象， 必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。==

```javascript
class Point { /* ... */ }

class ColorPoint extends Point {
  constructor() {
  }
}

let cp = new ColorPoint(); // ReferenceError
```

上面的代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例报错。

ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的集成机制完全不同， 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

如果子类没有定义constructor方法，这个方法会被默认添加。也就是说，不管有没有显示定义，任何一个子类都有constructor方法

```js
class ColorPoint extends Point {
  
}
// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args)
  }
}
```

这里一定要注意：如果自己在子类中添加了constructor方法，将会覆盖默认添加的constructor方法，因此，不显示定义constructor方法会自动添加constructor以及super方法，但是如果是显示定义了constructor方法，这时候如果要创建实例或者在子类构造函数中使用this，就一定要添加super方法

另一个需要注意的地方是，在子类的构造函数中， 只有调用了super之后，才可以在构造函数中使用this关键字，否则会报错。**这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例**。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```

上面代码中，子类的`constructor`方法没有调用`super`之前，就使用`this`关键字，结果报错，而放在`super`方法之后就是正确的。

```javascript
let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point // true
```

上面代码中，实例对象`cp`同时是`ColorPoint`和`Point`两个类的实例，这与 ES5 的行为完全一致。

最后，父类的静态方法，也会被子类继承。

```javascript
class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
```

## 2. Object.getPrototypeOf()

Object.getPrototypeOf()方法可以从子类上获取父类

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
```

因此，可以使用这个方法判断，一个类是否继承了另一个类

## 3. super关键字

super这个关键字， 既可以当做函数使用，又可以当做对象使用。

1. super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数

   ```javascript
   class A {}
   
   class B extends A {
     constructor() {
       super();
     }
   }
   ```
   
   上面代码中，子类`B`的构造函数之中的`super()`，代表调用父类的构造函数。这是必须的，否则当创建实例时， JavaScript 引擎会报错。
   
   注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指向的是B的实例，这是调用super是将父类的方法和属性绑定到B的this上，因此，super在这里相当于A.prototype.constructor.call(this).	
   
   ```js
   class A {
     constructor() {
       console.log(new.target.name)
     }
   }
   
   class B extends A {
     constructor() {
       super()
     }
   }
   
   new A()  	// A
   new B()		// B
   ```
   
   作为函数时，super() 只能用在子类的构造函数中，其他地方报错
   
2. super作为对象，**在普通方法中，指向父类的原型对象**；在静态方法中，指向父类

   ```js
   class A {
     p() {
       return 2;
     }
   }
   
   class B extends A {
     constructor() {
       super();
       console.log(super.p());  // 2
     }
   }
   
   let b = new B();
   ```

   这里需要注意：由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的

   ```javascript
   class A {
     constructor() {
       this.p = 2;
     }
   }
   
   class B extends A {
     get m() {
       return super.p;
     }
   }
   
   let b = new B();
   b.m // undefined
   ```

   上面代码中，p是父类A实例的属性，super.p就引用不到它

   如果属性定义在父类的原型对象上，那么super就可以取到

   ```js
   class A {}
   A.prototype.x = 2;
   
   class B extends A {
     constructor() {
       super();
       console.log(super.x)		
     }
   }
   
   let b = new B()		// 2
   ```

   上面的代码中，属性x是定义在A.prototype.type上面的，所以super.x可以取到它的值

   **ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前子类实例**

   ```javascript
   class A {
     constructor() {
       this.x = 1;
     }
     print() {
       console.log(this.x);
     }
   }
   
   class B extends A {
     constructor() {
       super();
       this.x = 2;
     }
     m() {
       super.print();
     }
   }
   
   let b = new B();
   b.m() // 2
   ```

   上面代码中，`super.print()`虽然调用的是`A.prototype.print()`，但是`A.prototype.print()`内部的`this`指向子类`B`的实例，导致输出的是`2`，而不是`1`。也就是说，实际上执行的是`super.print.call(this)`。

   由于`this`指向子类实例，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

   ```js
   class A {
     constructor() {
       this.x = 1;
     }
   }
   
   class B extends a {
     constructor() {
       super();
       this.x = 2;
       super.x = 3;
       console.log(super.x); 	// undefined 这时的super是指向父类的原型的
       console.log(this.x);		// 3
     }
   }
   
   let b = new B();
   ```

   上面代码中，`super.x`赋值为`3`，这时等同于对`this.x`赋值为`3`。而当读取`super.x`的时候，读的是`A.prototype.x`，所以返回`undefined`。

   如果super作为对象，用在静态方法之中，这是super将指向父类，而不是父类的原型对象

   ```javascript
   class Parent {
     static myMethod(msg) {
       console.log('static', msg);
     }
   
     myMethod(msg) {
       console.log('instance', msg);
     }
   }
   
   class Child extends Parent {
     static myMethod(msg) {
       super.myMethod(msg);
     }
   
     myMethod(msg) {
       super.myMethod(msg);
     }
   }
   
   Child.myMethod(1); // static 1		子类直接的调用 此时是静态方法 super是指向父类
   
   var child = new Child();
   child.myMethod(2); // instance 2	子类的实例的调用，此时是普通方法，super是指向父类的原型
   ```

   上面代码中，`super`在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

   另外，在子类的静态方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类，而不是子类的实例。

   ```javascript
   class A {
     constructor() {
       this.x = 1;
     }
     static print() {
       console.log(this.x);
     }
   }
   
   class B extends A {
     constructor() {
       super();
       this.x = 2;
     }
     static m() {
       super.print();
     }
   }
   
   B.x = 3;
   B.m() // 3
   ```

   上面代码中，静态方法`B.m`里面，`super.print`指向父类的静态方法。这个方法里面的`this`指向的是`B`，而不是`B`的实例。

   注意，使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

   ```javascript
   class A {}
   
   class B extends A {
     constructor() {
       super();
       console.log(super); // 报错
     }
   }
   ```

   ```javascript
   class A {}
   
   class B extends A {
     constructor() {
       super();
       console.log(super.valueOf() instanceof B); // true
     }
   }
   
   let b = new B();
   ```

   上面代码中，`super.valueOf()`表明`super`是一个对象，因此就不会报错。同时，由于`super`使得`this`指向`B`的实例，所以`super.valueOf()`返回的是一个`B`的实例。

   最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用`super`关键字。

   ```javascript
   var obj = {
     toString() {
       return "MyObject: " + super.toString();
     }
   };
   
   obj.toString(); // MyObject: [object Object]
   ```

## 4. 类的prototype属性和\_\_proto\_\_属性

大多数浏览器的ES5实现之中，每一个对象都有\_\_proto\_\_属性，指向对应的构造函数prototype属性。Class作为构造函数的语法糖，同时有prototype属性和\_\_proto\_\_，因此同时存在两条继承链。

1. 子类的\_\_proto\_\_属性，表示构造函数的继承，总是指向父类

2. 子类prototype属性的\_\_proto\_\_属性，表示方法的继承，总是指向父类的prototype属性

   ```javascript
   class A {
   }
   
   class B extends A {
   }
   
   B.__proto__ === A // true
   B.prototype.__proto__ === A.prototype // true
   ```

   上面代码中，子类B的\_\_proto\_\_属性指向父类A，子类B的prototype属性的\_\_proto\_\_属性指向父类A的prototype属性

   这样的结果是因为，类的继承是按照下面的模式实现的

   ```js
   class A {
     
   }
   
   class B {
     
   }
   
   // B的实例继承A的实例
   Object.setPrototypeOf(B.prototype, A.prototype)
   
   // B继承A的静态属性
   Object.setPrototypeOf(B,A)
   
   const b = new B()
   ```

   对象的扩展一章给出过Object.setPrototypeOf方法的实现

   ```js
   Object.setPrototypeOf = function (obj, proto) {
     obj.__proto__ = proto;
     return obj;
   }
   ```

   因此，就得到了上面的结果

   ```javascript
   Object.setPrototypeOf(B.prototype, A.prototype);
   // 等同于
   B.prototype.__proto__ = A.prototype;
   
   Object.setPrototypeOf(B, A);
   // 等同于
   B.__proto__ = A;
   ```

   extends关键字后面可以跟多种类型的值

   ```js
   class B extends A {
     
   }
   ```

   讨论两种情况

   1. 子类继承Object类

      ```javascript
      class A extends Object {
      }
      
      A.__proto__ === Object // true
      A.prototype.__proto__ === Object.prototype // true
      ```

   2. 不存在任何继承

      ```javascript
      class A {
      }
      
      A.__proto__ === Function.prototype // true
      A.prototype.__proto__ === Object.prototype // true
      ```

      这种情况，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。但是，A调用后返回一个空对象（即Object实例），所以A.prototype.\_\_proto\_\_指向构造函数（Object）的prototype属性

### 实例的 _\_proto\_\_ 属性

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，子类的原型的原型，是父类的原型。

```javascript
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

因此，通过子类实例的`__proto__.__proto__`属性，可以修改父类实例的行为。

```javascript
p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"
```

## 5. 原生构造函数的继承

原生构造函数指语言内置的构造函数，通常用来生成数据结构.ES的原生构造函数大致有下面这些

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些构造函数是无法继承的，比如，不能自己定义一个Array的子类

```javascript
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

上面代码定义了一个继承 Array 的`MyArray`类。但是，这个类的行为与`Array`完全不一致。

```javascript
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内不属性，通过array.apply()或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性

ES5 是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，`Array`构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新`length`属性，这个内部属性无法在子类获取，导致子类的`length`属性行为不正常。

下面的例子中，我们想让一个普通对象继承`Error`对象

```javascript
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```

上面代码中，我们想通过`Error.call(e)`这种写法，让普通对象`e`具有`Error`对象的实例属性。但是，`Error.call()`完全忽略传入的第一个参数，而是返回一个新对象，`e`本身没有任何变化。这证明了`Error.call(e)`这种写法，无法继承原生构造函数。

ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

```javascript
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

上面的例子同时说明了extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数据

```javascript
class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
}

var x = new VersionedArray();

x.push(1);
x.push(2);
x // [1, 2]
x.history // [[]]

x.commit();
x.history // [[], [1, 2]]

x.push(3);
x // [1, 2, 3]
x.history // [[], [1, 2]]

x.revert();
x // [1, 2]
```

注意：继承Object的子类，有一个行为差异

```js
class NewObj extends Object {
  constructor() {
    super(...arguments)
  }
}

var o = new NewObj({ attr: true })
o.attr === true  // false
```

上面代码中，`NewObj`继承了`Object`，但是无法通过`super`方法向父类`Object`传参。这是因为 ES6 改变了`Object`构造函数的行为，一旦发现`Object`方法不是通过`new Object()`这种形式调用，ES6 规定`Object`构造函数会忽略参数。

## 6. Mixin 模式的实现

Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口







































