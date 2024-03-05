[toc]

# 详解ES5类的实现和继承的实现

## 1. 前言

ES5 中类的实现以及类的继承是 JS 中一个不得不跨越和征服的高点。不论是在学习的过程中为了更好的理解 ES 6 class 的实现方法以及学习原型链和构造函数等知识，还是为了在面试中应对面试官让描述ES5类和继承的原理甚至手动实现ES5继承（博主在面试中就遇到过）。这个高点必须拿下，下面就让我们来一步一步的详细解析，刨根问底吧！

## 2. ES5 中类的实现

ES5 中使用构造函数来实现类，在分析code前先简单看一下以下概念，不明白没关系，在示例代码中有详细的说明：

- 构造函数：其实就是一个函数，在这个函数中定义属性和方法
- 实例：通过 `new 构造函数` 得到的就是一个实例。
- 实例属性（方法）：这个属性（方法）在构造函数中定义。特别注意：只有实例可获取
- 原型链属性（方法）：这个属性（方法）在构造函数的原型链上定义。特别注意，原型链属性在实例间是共享的，在示例中有说明和演示
- 静态属性（方法）：这个属性（方法）直接定义在构造函数上。特别注意：只有构造函数可获取

通过一个示例来说明ES5中类的实现。其中`Person`就是一个构造函数，`name, age, star`就是实例属性，`init` 就是实例方法，`nationality`就是原型链属性，`home`就是原型链方法，`universe`就是静态属性，`shuttle`就是静态方法。

```js
// ES5 类
// 构造函数方式实现类
function Person(name, age) {
  // 实例属性，只能实例使用，构造函数获取不到
  this.name = name;
  this.age = age;   
  this.star = 'Earth'; // console.log(Person.star);  undefined

  // 实例方法，也只能实例使用
  this.init = function() {
    console.log(`${this.name} is fighting: ${this.age}!`);
  };
};
// 原型链属性，可被多个实例共享，比如原型链属性是引用值时，是共享的。也只能实例使用
Person.prototype.nationality = ['China'];   // console.log(Person.nationality); undefined
// 原型链方法
Person.prototype.home = function() {
  console.log(`${this.name}'s home is in ${this.star}`);
};

// 静态属性,实例无法获取, 只能构造函数本身使用
Person.universe = 'TheMilkyWay';    // console.log(arrow.universe); undefined
// 静态方法
Person.shuttle = function() {
  console.log('shuttling');
};

const arrow = new Person('Arrow', 12);
console.log('实例----------------------------');
console.log(arrow.name, arrow.age);     // Arrow 12 父类的实例属性
arrow.init();     // Arrow is fighting: 12! 父类的实例方法

console.log(arrow.nationality);    // [ 'China' ] 父类原型链属性
arrow.home();   // Arrow's home is in Earth 父类原型链方法

console.log(Person.universe);   // TheMilkyWay  构造函数静态属性
Person.shuttle();    // shuttling  构造函数静态方法

// Arrow 12
// Arrow is fighting: 12!
// Arrow's home is in Earth
// TheMilkyWay
// shuttling

const tom = new Person('Tom', 22);
console.log('\n原型链属性共享----------------------------');
console.log(tom.nationality);   // 父类原型链属性，引用类型
tom.nationality.push('French');    // 原型链上的属性是共享的
console.log(tom.nationality);  
console.log(arrow.nationality);

// [ 'China' ]
// [ 'China', 'French' ]
// [ 'China', 'French' ]
```

## 3. ES5 中类继承的实现

首先需要提出的是：**在ES5中实现继承主要采用组合继承（也称伪经典继承），采用原型链 + 盗用构造函数 来实现继承**。但为了更好的追根溯源，明白其根源，博主这里先分别讲解原型链继承和盗用构造函数继承的实现方法和优劣势，然后再讲解组合继承。以第2节中的 `Person` 构造函数为父类。

### 3.1 原型链继承

基本思想：通过原型继承多个引用类型的属性和方法。实现的原理需要回顾一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。试想一下，如果原型是另一个类型的实例呢？那是不是就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向它所对应的构造函数。这样就在实例和原型之间构造了一条原型链。这段话需要好好理解一下。

```js
// ES5 继承
// 1. 原型链继承，可以继承父类的实例属性和方法以及父类原型链上的属性和方法，但是子类在实例化时不能给父类的构造函数传参
function Man_1() {};
Man_1.prototype = new Person();

const bullet_1 = new Man_1();
console.log('bullet-1-----------------------------------------');
console.log(bullet_1.star);   // Earth 可以获取到父类的实例属性
console.log(bullet_1.nationality);   // [ 'China' ] 可以获取到父类原型链上的属性
bullet_1.init();    // undefined is fighting: undefined!  可以使用父类的实例方法，但是没有参数传递
bullet_1.home();    // undefined's home is in Earth  可以使用父类的原型链上的方法，但是没有参数传递
// Earth
// [ 'China' ]
// undefined is fighting: undefined!
// undefined's home is in Earth
```

原型链继承的优劣：

- 优势：可以继承父类的实例属性和方法以及父类原型链上的属性和方法

- 劣势：子类在实例化时不能给父类的构造函数传参

### 3.2 盗用构造函数实现继承

盗用构造函数继承(constructor stealing, 也称对象伪装或者经典继承)基本思想：在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用 `apply()`和`call()`方法以新创建的对象为上下文执行构造函数。

```js
// 2. 盗用构造函数(constructor stealing, 也称对象伪装或者经典继承)继承，子类可继承父类的实例属性和方法同时子类在实例化时可以给父类的构造函数传参，但是无法继承父类原型链上的属性和方法
function Man_2(...args) {
  Person.call(this, ...args)
};

const bullet_2 = new Man_2('bullet', 32);
console.log('\nbullet-2-----------------------------------------');
console.log(bullet_2.name, bullet_2.age, bullet_2.star);   // bullet 32 Earth 可以获取到父类的实例属性，并且可以传递参数
bullet_2.init();  // bullet is fighting: 32! 可以获取到父类的实例方法，并且可以传递参数

console.log(bullet_2.nationality);  // undefined 无法获取到父类原型链上的属性, 自然方法也获取不到

// bullet 32 Earth
// bullet is fighting: 32!
// undefined
```

盗用构造继承的优劣：

- 优势：子类可继承父类的实例属性和方法同时子类在实例化时可以给父类的构造函数传参

- 劣势：无法继承父类原型链上的属性和方法

### 3.3 组合继承（原型链 + 盗用构造函数）

组合继承（也称伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思想就是使用原型链继承原型链上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```js
// 3. 原型链 + 盗用构造函数 实现组合继承（也称伪经典继承）
// 原型链继承原型链上的属性和方法
// 盗用构造函数继承实例属性和参数的传递
function Man(...args) {
  Person.call(this, ...args)
};

Man.prototype = new Person();

const love = new Man('love', 18);
console.log('\nlove-----------------------------------------');
console.log(love.name, love.age, love.star);    // love 18 Earth 可获取到父类的实例属性以及参数传递
love.init();    // love is fighting: 18!  可获取父类的实例方法以及参数传递

console.log(love.nationality);    // [ 'China' ] 可获取到父类的原型链属性
love.home();    // love's home is in Earth  可获取到父类的原型链方法
```

## 4. 总结

有时有趣，有时烦躁，学习这样的知识点需要静下心来，一点一点的啃，反复琢磨。

《红宝书4》P238 详细的介绍了继承，更多详细的细节可到书中查看。

