[toc]

# Symbol（个人感觉，有些鸡肋）

## 1. 概述

ES5的对象名都是字符，这容易造成属性名的冲突，比如你使用了一个他人提供的对象，但是又想为这个对象添加新的方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。如果有一个机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突，这就是ES6引入Symbol的原因

ES6引入了一种新的原始数据类型Symbol,表示独一无二的值,它是JS语言的第七种数据类型，前六种是：undefined，null，boolean，string，number，object

## 2. Symbol.prototype.description

创建Symbol的时候，可以添加一个描述

```js
const sym = Symbol('foo');
```

但是，读取这个描述需要将 Symbol 显示转为字符串，

```js
const sym = Symbol('foo');

String(sym)  // 'Symbol(foo)'
sym.toString()  // 'Symbol(foo)'
```

上面的用法不是很方便，因此提供了这个方法description

```javascript
const sym = Symbol('foo');

sym.description // "foo"
```

## 3. 作为属性名的 Symbol

注意：Symbol 值作为对象属性名，不能用点运算符，包括设置和获取

```javascript
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
```

上面的代码中，因为点运算符后面总是字符串，所以不会读取 mySymbol 作为识别名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个Symbol值

## 4. 消除魔术字符串

魔术字符串指的是，在代码之中多次出现，与代码形成强耦合的某一个具体的字符串或数值，应尽量消除

```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中， 字符串Triangle就是一个魔术字符串，多次出现，与代码形成强耦合，不利用维护和修改

常用的消除魔术字符串的方法，就是把它写成一个变量

```javascript
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```javascript
const shapeType = {
  triangle: Symbol()
};
```

## 5. 属性名的遍历

`Object.getOwnPropertySymbols()`返回对象可用的Symbol值,返回一个数组,成员是当前对象的所有用作属性名的Synbol的值

另一个新的API， `Reflect.ownKeys()` 方法可以返回所有类型的键名，包括常规键名和Symbol键名

















