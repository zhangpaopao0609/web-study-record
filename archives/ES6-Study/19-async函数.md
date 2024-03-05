[toc]

# async 函数

## 1. 含义

async函数使得异步更为方便

async其实就是Generator函数的语法糖

前文有一个Generator函数，依次读取两个文件

```javascript
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

上面代码的函数gen可以写成async函数

```javascript
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

其实，async函数就是将Generator函数的星号（*）替换成async，将yield替换成await

改进有四点：

1. 内置执行器

   Generator函数的执行必须靠执行器，也就是说需要先let obj = new gen(),obj.next(), obj.next()，所以才有了co模块，而async函数自带执行器。也就是说，async函数的执行，与普通函数一模一样

   ```javascript
   asyncReadFile();
   ```

   上面的代码调用了asyncReadFile();函数，然后它就会自动执行，输出最后结果。这完全不像Generator函数，需要调用next方法，或者用co模块，才能真正执行

2. 更好的语义

   async和await，比起星号和yield，语义更加清楚了，saync表示函数里面有异步操作，await表示紧跟在后面的表达式需要等待的结果。

3. 更广的适用性

   co模块约定，yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面，可以是Promise对象和原始类型的值（数值，字符串和布尔值，但这时会自动转成立即resolved的Promise对象）

4. 返回值是Promise

   返回值是Promise就十分方便了，可以用then方法指定下一步的操作。

进一步说，async函数完全可以看做多个异步操作，包装成的一个Promise对象，而await命令就是内部命令的语法糖

## 2. 基本用法

## 3. 语法

总体比较简单，难点是错误处理机制

### 返回Promise对象

async函数返回一个Promise对象

async函数内部return语句返回的值，会成为then方法回调函数的参数

```javascript
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// "hello world"
```

### Promise对象的状态变化

async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误，也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数

### await命令

任何一个await语句后面的Promise对象变成reject状态，那么整个async函数都会中断执行

```javascript
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

### 错误处理

如果await后面的异步操作出错，那么等同于async函数返回的Promise对象被reject

### 使用注意点

1. await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中

   ```javascript
   async function myFunction() {
     try {
       await somethingThatReturnsAPromise();
     } catch (err) {
       console.log(err);
     }
   }
   
   // 另一种写法
   
   async function myFunction() {
     await somethingThatReturnsAPromise()
     .catch(function (err) {
       console.log(err);
     });
   }
   ```

2. 多个await命令后面的异步操作，如果不存在继发关系，最好让他们同时触发

   ```javascript
   let foo = await getFoo();
   let bar = await getBar();
   ```

   上面代码中，两个异步操作互不依赖，被写成继发关系，这样比较耗时，完全可以同时触发

   ```javascript
   // 写法一
   let [foo, bar] = await Promise.all([getFoo(), getBar()]);
   
   // 写法二
   let fooPromise = getFoo();
   let barPromise = getBar();
   let foo = await fooPromise;
   let bar = await barPromise;
   ```

3. await函数只能用在async函数中

4. async函数可以保留运行堆栈

## 4. async函数的实现原理

实现原理就是将Generator函数和自动执行器，包装在一个函数里

```javascript
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

所有的`async`函数都可以写成上面的第二种形式，其中的`spawn`函数就是自动执行器。

## 5. 与其他异步处理方法非比较

## 6. 按顺序完成异步操作

## 7. 顶层await













``























































