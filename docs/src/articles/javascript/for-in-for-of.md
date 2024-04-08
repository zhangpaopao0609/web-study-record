# for in 和 for-of

在JavaScript中，`for...in`和`for...of`是两种不同的循环语句，它们用于遍历对象和数组（以及其他可迭代对象），但它们的工作方式和用途有所不同。

### for...in

`for...in`循环用于遍历一个对象的所有可枚举属性（包括继承的属性）。这个循环会遍历对象的键（key），而不是值（value）。`for...in`通常用于对象，但也可以用于数组，尽管这并不是它的主要用途。

```javascript
const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) {
  console.log(key); // 输出: 'a', 'b', 'c'
  console.log(obj[key]); // 输出: 1, 2, 3
}
```

使用`for...in`遍历数组时，需要注意它会遍历数组的所有可枚举属性，包括数组对象的自定义属性，而不仅仅是数组元素。因此，如果数组被扩展了额外的属性，这些属性也会被遍历。

```javascript
const array = [1, 2, 3];
array.customProperty = 'hello';

for (const index in array) {
  console.log(index); // 输出: '0', '1', '2', 'customProperty'
}
```

### for...of

`for...of`循环用于遍历可迭代对象的值。这包括数组、字符串、Map、Set以及实现了迭代器协议的对象。`for...of`循环直接提供了对象的元素值，而不是键，这使得它特别适合用于数组和其他类似集合的数据结构。

```javascript
const array = [1, 2, 3];

for (const value of array) {
  console.log(value); // 输出: 1, 2, 3
}
```

`for...of`循环不会遍历对象的自定义属性，因为普通对象不是可迭代的（除非它们定义了迭代器协议）。

```javascript
const obj = { a: 1, b: 2, c: 3 };

// 下面的代码会抛出错误，因为obj不是可迭代的
// for (const value of obj) {
//   console.log(value);
// }
```

### 总结

- **使用`for...in`来遍历对象的键**（包括继承的可枚举属性）。
- **使用`for...of`来遍历数组、字符串和其他可迭代对象的值**。
- 在处理数组时，通常推荐使用`for...of`，因为它不会遍历数组的非元素属性，并且语法更简洁直观。
- 如果需要遍历对象的属性，或者你需要键和值，那么使用`for...in`或者`Object.keys`、`Object.values`、`Object.entries`配合`for...of`循环。

> 可以这么说，`for in` 的出现就是为了遍历普通对象，其实 `for in` 的性能要低于 `for of`，但普通对象没有迭代器对象，所以只能用 `for in`
