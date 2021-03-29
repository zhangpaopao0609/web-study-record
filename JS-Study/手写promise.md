# 手写轮子系列——手写 Promise

## 1. 前言

Promise 是异步编程的一种解决方案：

- 从语法上讲，promise是一个 class 对象，从它可以获取异步操作的消息；
- Promise有三种状态：pending, fulfilled, rejected; 状态一旦改变，就不会再改变;
- 创建Promise实例后，会立即执行;
- Promise 主要用来解决回调地狱；
- Promise支持多个并发请求，并获取并发请求的数据。

## 2. 基础版 Promise

- 首先我们调用 Promise 时，会返回一个 Promise 对象。
- 构建 Promise 对象时，需要传入一个 executor 函数， Promise 的主要业务流程都在 executor 函数中执行。
- 运行 executor 函数，如果调用resolve或reject函数，会返回对应的值。
- Promise 的状态不可逆，同时调用 resolve 函数和 reject 函数，默认会采取第一次调用的结果。

根据 Promise 的一些主要的使用方法，结合 Promise / A+ 规范，我们可以分析出 Promise 的基本特征：

- promise 有三个状态： pending， fulfilled， rejected
- new Promise 时，需要传递一个 executor() 执行器，执行器立即执行。
- executor 接收两个参数，分别是 resolve 和 reject
- promise 的默认状态时 pending
- promise 有一个 value 保存成功状态的值，可以是 undefined / thenable / promise
- promise 只能从 pending 到 rejected，或者从 pending 到 fulfilled,状态一旦确认，就不会再改变。
- promise 必须有一个 then 方法， then 接收两个参数，分别是 promise 成功的回调 onFulfilled 和 promise 失败的回调 onRejected。
- 如果调用 then 时，promise 已经成功，那么执行 onFulfilled, 参数是 promise 的 value。
- 如果调用 then 时，promise 已经失败，那么执行 onRejected, 参数是 promise 的 reason
- 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调 onRejected

```js
// promise 的状态值
const PENDING = 'PENDING',
      FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

class BasePromise {
  constructor(executor) {
    this.status = PENDING;                // 初始状态均为 pending        
    this.value = undefined;               // promise 返回值
    this.reason = undefined;              // 错误原因
    this.onResolvedCallbacks = [];        // 保存成功的回调
    this.onRejectedCallbacks = [];        // 保存失败的回调

    // 成功时调用的方法
    const resolve = value => {
      // 只有状态为 pending 时才可以更新状态，防止 executor 中调用两次 resolve/reject 方法，只有第一个生效
      if(this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 执行回调
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    // 失败时调用的方法
    const reject = resaon => {
      if(this.status === PENDING) {
        this.status = REJECTED;
        this.reason = resaon;

        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法，接收两个参数 onFulfilled, onRejected
  then(onFulfilled, onRejected = err => { throw err }) {
    if(this.status === FULFILLED) {
      onFulfilled(this.value);
    }else if(this.status === REJECTED) {
      onRejected(this.reason);
    }else if(this.status === PENDING) {
      // 如果 promise 的状态是 PENDING,需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再一次执行对应的函数
      this.onResolvedCallbacks.push(() => onFulfilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.reason));
    }
  }

  catch(onRejected = err => { throw err }) {
    if(this.status === REJECTED) {
      onRejected(this.reason);
    }else if(this.status === PENDING) {
      this.onRejectedCallbacks.push(() => onRejected(this.reason));
    }
  }
};
```

## 3. 完整版 Promise (继承基础版 Promise 类)

完整版的 Promise 主要是要实现以下两点：

- 提供链式调用

  链式调用，我们使用 Promise 时候，当 then 函数中 return 一个值时，不管是什么值，我们都能在下一个 then 中获取到，这就是 then 的链式调用；

- 值穿透特性：

  值穿透特性，当我们不在 then 中放入参数，如： Promise.then().then()，那么后面的 then 依旧可以得到之前 then 返回的值，这就是所谓的值的穿透。

实现原理：如果每次调用 then 的时候，我们都重新创建一个 promise 对象，并把上一个 then 的返回结果传给这个新的 promise 的 then 方法，这样就可以一直 then 下去。

```js
/**
 * 执行 promise
 * @param {*} promise2 上一个 then 创建的 promise
 * @param {*} x        上一个 then 返回的 值
 * @param {*} resolve  
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  let called;

  if((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;      
      if(typeof then === 'function') {    // 上一个 then 返回的值仍然是一个 promise
        then.call(x, y => {
          if(called) { return; }
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called) { return; }

          called = true;
          reject(r);
        })
      }else {
        resolve(x);
      }
    } catch (error) {
      if(called) { return; }

      called = true;
      reject(error);
    }
  }else {
    resolve(x);
  }
}

class FullPromise extends BasePromise {
  constructor(executor) {
    super(executor);
  }

  then(onFulfilled = v => v, onRejected = err => { throw err; }) {
    const promise2 = new FullPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);

            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if(this.status === PENDING) {
        // 状态为 pending 时，收集回调
        this.onResolvedCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value);

            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      }
    });

    return promise2;
  }
}
```

## 4. 测试

```js
const { BasePromise, FullPromise  } = require("../index");

it('基础版Promise返回成功测试', done => {
  const p = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 100);
  });

  p.then(res => {
    expect(res).toBe('success');
    done();
  });
});

it('基础版Promise返回失败测试', done => {
  const p = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 100);
  });

  p.then(res => {
    console.log('resolve res: ', res)
  }, err => {
    expect(err).toBe('failed');
    done();
  });
});

it('基础版Promise返回失败catch测试', done => {
  const p = new BasePromise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 100);
  });

  p.catch(err => {
    expect(err).toBe('failed');
    done();
  });
});

it('完整版 Promise 返回成功测试', done => {
  const p = new FullPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 100);
  });

  p.then().then().then(res => {
    expect(res).toBe('success');
    done();
  })
});

it('完整版 Promise 返回失败测试', done => {
  const p = new FullPromise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 100);
  });

  p.then().then().then(res => {
    console.log(res);
  },err => {
    expect(err).toBe('failed');
    done();
  })
});
```

``![image-20210329115743236](/Users/aispeech/Desktop/MyGitHub/web-study-record/JS-Study/img/promise-test.png)

## 5. 源码地址

[点击查看源码地址，顺便给个star吧！！](https://github.com/Arrow-zb/magic-wheel)

