[TOC]

# let 和 const 命令

## 1. let 命令

### 1.1 块级作用域

特别点：for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

```js
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```

### 1.2 不存在变量提升

### 1.3 暂时性死区

只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受到外部的影响

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

“暂时性死区”也意味着`typeof`不再是一个百分之百安全的操作。

```js
typeof x; // ReferenceError
let x;
```

```js
// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
```

### 1.4 不允许重复声明

## 2 块级作用域

### 2.1 为什么需要块级作用域

ES5 只用全局作用域和函数作用域

### 2.2 ES6 的块级作用域

let 

## 3 const 命令

### 3.3 ES6 声明变量的六种方法

var

function

let

const

import

class

## 4 顶层对象的属性

在浏览器环境指 window 对象，在 node 指的是 global 对象。

## 5 globalThis 对象

浏览器 window

web woker 和 浏览器     self

node  global

ES 2020 增加 globalThis 全环境可用





