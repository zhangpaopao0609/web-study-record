[toc]

# 实现sum(1)(2)通用函数 — 两种角度

## 1. 前言

有幸看到这样一道题目，觉得非常的有意思，因此在此记录；

题目：实现一个通用函数 sum，使其实现以下功能；

sum(1)   // 1

sum(1)(2)    // 3

sum(1)(2)(3)    // 6

## 2. 实现思路及code

### 2.1 思考一

sum 函数最终实现的目的是将各个参数进行求和，那么是不是将参数全部收集起来，然后求和就可以了？那么如何将参数全部收集起来呢？因为每一次都会将参数传递给函数，**所以通过 arguments 进行收集，同时返回一个新的收集参数的函数**，**因为是闭包，所以每一次返回的收集参数的函数中都可以获取到上一次收集的参数。** 通过参数的收集，然后再使用reduce相加即可。

code  如下：

```js
// toString(): 返回对象的字符串表示
// valueOf(): 返回对象对应的字符串、数值或布尔值表示，通常与 toString() 相同

function sum_1() {      
  const args = [...arguments]
  // 收集参数的角度
  const add = function () {
    args.push(...arguments)
    return add
  }

  add.toString = () => args.reduce((a, b) => a + b);

  return add
}

console.log(sum_1(1)(2) == 3);
```

### 2.2 思考二

最初的思路其实是一致的，也是收集所有参数，只是收集参数不再是采用闭包的模式，而是递归传递的过程。将之前的参数组合本次的参数一同传递给 sum 函数。

```js
function sum_2() {
  const args = [...arguments];

  // 参数传递的角度
  const fn = function () {
    const arg_fn = [...arguments];
    
    return sum_2(...args.concat(arg_fn));
  }

  fn.valueOf = () => args.reduce((a, b) => a + b);

  return fn;
}

console.log(sum_2(1)(2) == 3);
```

## 3. 总结

题目是很有趣的，也比较考验 JS 的功底，但其实最终的想要的结果还是没实现，需要显示的调用 valueOf()，后续有进展再来更新。