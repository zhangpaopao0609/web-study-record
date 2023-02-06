聊2022年 JS 都有哪些更新

ES2022 Finished proposals https://github.com/tc39/proposals/blob/main/finished-proposals.md

- ES2022 之 class 一坨
- ES2022 之 Top-level `await`
- ES2023 之 Hashbang `#!`
- ES2022 之 `.at()`、`.hasOwn()`、`/pattern/d` 和 `.indices`
- ES2023 之 `Array.prototype.findLast()`/`findLastIndex()`
- ES2022 之 Error cause

一个有趣的列表，个人对提案存在异议程度的排序（排在后面的没啥异议）

# 1. Error cause(ES2022)

吴成忠（@legendecas），阿里巴巴

tc39 里面的 champion 指的是推动提案的人

```js
async function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      // How to wrap the error properly?
      // 1. throw new Error('Download raw resource failed: ' + err.message);
      // 2. const wrapErr = new Error('Download raw resource failed');
      //    wrapErr.cause = err;
      //    throw wrapErr;
      // 3. class CustomError extends Error {
      //      constructor(msg, cause) {
      //        super(msg);
      //        this.cause = cause;
      //      }
      //    }
      //    throw new CustomError('Download raw resource failed', err);
    })
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch('//domain/upload', { method: 'POST', body: jobResult });
}
await doJob(); // => TypeError: Failed to fetch
```

1. 得到的是底层错误
2. 函数的错误无法直接表达业务意义
3. 一个函数中有多个fetch 时，无法知道具体是哪一个fetch 发生的错误，无法准确地识别错误

- 不直接暴露低层操作的错误
- 链式错误模式：每个层次的错误提供合适的上下文信息并包装更低层的错误
- 目前不是做不到，但是很麻烦
- 缺乏标准的做法，导致日志和调试工具无法提供帮助



```js
sync function doJob() {
  const rawResource = await fetch('//domain/resource-a')
    .catch(err => {
      throw new Error('Download raw resource failed', { cause: err });
    });
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch('//domain/upload', { method: 'POST', body: jobResult })
    .catch(err => {
      throw new Error('Upload job result failed', { cause: err });
    });
}
try {
  await doJob();
} catch (e) {
  console.log(e);
  console.log('Caused by', e.cause);
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```



## 2. `findLast`/`findLastIndex` (ES2023)

王文璐（@Kingwl），前微软中国



```js
const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
array.find(n => n.value % 2 === 1); // { value: 1 }
array.findIndex(n => n.value % 2 === 1); // 0
// find
[...array].reverse().find(n => n.value % 2 === 1); // { value: 3 }
// findIndex
array.length - 1 - [...array].reverse().findIndex(n => n.value % 2 === 1); // 2
array.length - 1 - [...array].reverse().findIndex(n => n.value === 42); // should be -1, but 4
```



```js
// find
array.findLast(n => n.value % 2 === 1); // { value: 3 }
// findIndex
array.findLastIndex(n => n.value % 2 === 1); // 2
array.findLastIndex(n => n.value === 42); // -1
```



动机和场景（灵魂之问）

为什么用库不行



- `padStart`/`padEnd`/`trimStart`/`trimEnd`
- Performance
- 库被引用的频繁程度
- API的完整性



计科两大难

命名与缓存



- findRight/findIndexRight
- findEnd/findIndexEnd
- findLast/findIndexLast
- findLast/findLastIndex



- `***Right`: `reduce`/`reduceRight`, `trimLeft`/`trimRight`
- `***End`: `padStart`/`padEnd`, `trimStart`/`trimEnd`
- `***Last`: `lastIndexOf`



# 3. RegExp Match Indices (ES2022)

`/pattern/d` 和 `.indices`

Ron Buckton，微软



```js
let techConfs = `
- GIAC
	date: 2022-11-18
	city: 上海
- IDEA
	date: 2022-11-22
	city: 深圳
`
for (let m of techConfs.matchAll(/date:\s*(.+)/g)) {
	console.log(m)
}
// ['date: 2022-11-18', '2022-11-18', index: 9, ...]
// ['date: 2022-11-22', '2022-11-22', index: 44, ...]
// 无法得到捕获组的索引位置
```



```js
for (let m of techConfs.matchAll(/date:\s*(.+)/gd)) {
	console.log(m)
}
// ['date: 2022-11-18', '2022-11-18', index: 9,
// indices: [[9, 25], [15, 25]],
// ...]
// ['date: 2022-11-22', '2022-11-22', index: 44,
// indices: [[44, 60], [50, 60]],
// ...]
```

为什么要额外的`d`？

因为性能

`d`的含义？

inDices



# 4. `Object.hasOwn()` (ES2022)

Jamie Kyle, Rome (Author)

Tierney Cyren, Microsoft



```js
let o = { hasOwnProperty: "hehe" }
o.hasOwnProperty("foo")
Object.create(null).hasOwnProperty("foo")
// Uncaught TypeError: hasOwnProperty is not a function

// 健壮但繁琐的写法
let hasOwnProperty = Object.prototype.hasOwnProperty
if (hasOwnProperty.call(o, "foo")) {
  console.log("has property foo")
}
// 或者
if (Object.getOwnPropertyDescriptor(o, "foo")) {
	console.log("has property foo")
}
```



```js
if (Object.hasOwn(o, "foo")) {
  console.log("has property foo")
}
```



# 5. `.at()` (ES2022)

Tab Atkins, Shu-yu Guo, Google

```js
let last = array[array.length - 1]
```



```js
let last = array.at(-1)
```



```js
++array[array.length - 1]
array[array.length - 1] = array.at(-1) + 1 // 黑人问号
```



玩笑归玩笑，玩笑背后的真正问题：

```
arr.at(i)`方法和`arr[i]
```

在处理非索引时语义不同



- 字符串是不是有at()方法？
- `arguments`是不是有at()方法？
- `document.body.classList`上是不是有at()方法？

和老的 `String.prototype.at` 提案

语义不同，不能处理代理对字符



`a.at(-idx)` 当`idx`是计算值的时候，

若该值正好为边界值 `0`，到底程序员意图是什么？

- `a.at(a.length - 0)`
- `a.at(0)`



负数索引本身是有坑的

（尽管现有的方法如`slice`已经如此）



```js
let a = [1,2,3]
let i = a.findIndex(x => x > 3)
a[i] // undefined
a.at(i) // 1 !
```

- 个人评价：鸡肋
- 个人建议：避免使用
- 替代方案：`a[^i]`提案

为啥当初不反对这个提案？

因为当初这个提案原名`item()`

有额外的motivation：统一DOM已有的方法

后来因为兼容性问题必须改名就只剩鸡肋



# 5. Hashbang `#!` (ES2023)

Bradley Farias, Node.js



```js
#!/usr/bin/env node
console.log(1);
```

在 linux 下可直接执行，而不需要在前面加一个 node xxx

`#!/usr/bin/env node` linux 会自动地找 node

