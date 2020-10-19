# Asynchronous programming  （异步编程）
[Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
异步编程-如何控制好异步过程
- JS的执行环境是单线程（Single thread）
- I/O 处理需要回调函数异步处理（异步I/O）
- 前端异步IO可以消除UI阻塞，提高用户体验
- 后端则可以提高CPU和内存利用率
## 串联异步处理
异步操作队列化，按照预期执行
## 回调地狱
```js
const callback = () => {
  setTimeout(() => {
    logTime('callback 1');
    setTimeout(() => {
      logTime('callback 2');
      setTimeout(() => {
        logTime('callback 3');
        setTimeout(() => {
          logTime('callback 4');
        },100)
      },100)
    },100)
  },100);
};
```
## Promise
异步执行的状态机，异步执行的契约
```js
const promise = (name, delay = 100) => new Promise(resolve => {
  setTimeout(() => {
    logTime(name);
    resolve();
  }, 100);
})

const promiseRes = () => {
  promise('Promise 1')
    .then(promise('Promise 2')
    .then(promise('Promise 3')))
}
```
### Generator
Generator函数
- function -> function* 称为Generator函数
- 函数内部有 yield 表达式

### async/await
async/await 是 es7 推出的一套关于异步的终极解决方案
- 任何一个await语句后面的Promise对象变为reject转态，那么整个async函数都会中断执行
- async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完成，才会发生状态改变，除非遇到return语句或者抛出错误。也就是说，只有async函数内部的异步操作执行完，才会执行then方法执行的回调函数

