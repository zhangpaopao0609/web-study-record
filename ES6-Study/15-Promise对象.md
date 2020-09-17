[toc]

# Promise 对象

## 1. Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案--回调函数和事件--更合理和更强大

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise 对象有以下两个特点

1.  对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能，从pending变为fulfilled和从pending变为rejected。只要这两种情况发生了，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为resolved。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（event）不同， 事件的特点是，如果你错过了它，再去监听，是得不到结果的

如果某些事件不断反复发生，一般来说，使用Stream模式比部署Promise更好

## 2. 基本用法

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。接收一个函数作为参数，该函数的两个参数分别是resolve和reject。。他们是两个函数，由javascript引擎提供，不用自己部署

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

**Promise 新建后会立即执行**

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

console.log('Hi!');

// Promise
// Hi!
```

上面代码中，Promise 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
      if(this.readyState !== 4) {
        return;
      }
      if(this.status === 200) {
        resolve(this.response)；
      }else {
        reject(new Error(this.statusText))；
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  })
  return promise;
}

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

Promise**只要新建就会执行**

注意，调用resolve或reject并不会终结promise的参数函数的执行

```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(res => {
  console.log(res)
})

// 2
// 1
```

上面的代码中，调用resolve（1）以后，后面的console.log(2) 还是会执行，并且会首先打印出来。这是因为立即resolved的promise是在本轮时间循环的末尾执行，总是晚于本轮循环的同步任务

一般俩说，调用resolve或者reject后，promise的使命就完成了， 后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面，所以，最好在r它们前面加上return语句，这样就不会有意外

```js
new Promise((resolve, reject) => {
  return resolve(1);
  console.log(2); // 这是不会执行的
})
```

## 3. Promise.prototype.then()

Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的，他的作用是为Promise实例添加状态改变时的回调函数，前面说过，then方法的第一个参数就是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数

then方法返回的是一个新的Promise实例（注意，不是原来的那个Promise实例），因此可以采用链式写法，

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});
```

## 4. Promise.prototype.catch()

Promise.prototype.catch()方法是 .then(null, rejection) 或 .then(undefined, rejection)的别名，用于指定发生错误时的回调函数

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

上面代码中，`getJSON()`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

```javascript
p.then((val) => console.log('fulfilled:', val))
  .catch((err) => console.log('rejected', err));

// 等同于
p.then((val) => console.log('fulfilled:', val))
  .then(null, (err) => console.log("rejected:", err));
```

如果Promise状态已经变成resolved，再抛出错误是无效的

```javascript
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```

因为状态已经变成了resolved，所以程序就会直接执行.then中的第一个参数，Promise中的状态是不可逆转的

因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

一般来说，不要在then()方法里面定义reject状态的回调函数（即then的第二个参数），总是使用catch方法

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

上面代码中，第二种写法要好于第一种写法，理由是第二种写法可以捕获前面`then`方法执行中的错误，也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch()`方法，而不使用`then()`方法的第二个参数。

跟传统的`try/catch`代码块不同的是，如果没有使用`catch()`方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

上面代码中，`someAsyncThing()`函数产生的 Promise 对象，内部有语法错误。浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程、终止脚本执行，2 秒之后还是会输出`123`。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

## 5. Promise.prototype.finally()

用于指定不管 Promise 对象最后状态如何，都会执行的操作。

## 6. Promise.all()

将多个Promise实例，包装成一个新的Promise实例

```js
const p = Promise.all([p1, p2, p3]);
```











 

