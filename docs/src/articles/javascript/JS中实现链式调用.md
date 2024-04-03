[toc]

# JS中实现链式调用

## 1. 前言

很喜欢一句话，程序是一门可以长相厮守的艺术，最近真觉得 JavaScript 真的是万千神奇（所有语言应该都是如此），例如本文要实现的链式调用。

实现需求如下：

实现一个可像以下code般链式调用的"变量"。其中 `sleep`指会停留，类似暂停；`work`直接打印；`firstSleep`也是暂停，但它相当特殊，首先只能调用一次，其次，无论在链路上何处调用，都必须第一个执行。因此，以下code执行顺序（结果）为：

```js
man.work().sleep(1000).firstSleep(5000).work().sleep(1000);

// 执行结果
// 暂停 5 秒 firstSleep(5000)
// 暂停 1 秒 sleep(1000)
// 打印 work()
// 暂停 1 秒 sleep(1000)
```

## 2. 实现思路和code

### 2.1 思路

1. 链式调用： 如果采用类的思想，那么它的子类就会继承类的所有方法，同时如果每次调用方法后都返回的是这个子类本身，那么就实现了链式调用。
2. 顺序执行：既然要顺序执行，那么如果在执行函数之前利用**队列**先收集所有的函数，然后依次执行呢？
3. firstSleep首先执行：既然能够收集所有的函数，是不是如果把firstSleep直接放到队列头最先执行就可以了呢？

### 2.2 code

```js
class Man {
  constructor() {
    this.queue = [];  // 记录调用的函数,全部是同步收集然后依次执行
    this.index = 0;   // 执行函数的索引
    this.firstSleepWatch = false;   // 检查 firstSleep 调用次数,最多调用一次
    this.init();     
  }
	
  // 因为执行需要在函数收集之前，因此需要利用事件机制，先收集后执行
  init() {
    setTimeout(() => this.run() , 0);
  }

  run() {
    const fn = this.queue[this.index++];
    // 最后一个 fn 为 undefined, 因此需要做处理
    fn && fn();
  }

  firstSleep(delay) {
    if(this.firstSleepWatch) {
      throw Error("Already declared firstSleep!!");
    }
    this.queue.unshift(() => {
      setTimeout(() => {
        console.log('firstSleep end!!');
        this.run();
      }, delay);
    });
    this.firstSleepWatch = true;
    return this;
  }

  sleep(delay) {
    this.queue.push(() => {
      setTimeout(() => {
        console.log('sleep end!!');
        this.run();
      }, delay);
    });
    return this;
  }

  work() {
    this.queue.push(() => {
      console.log('work runing!!');
      this.run();
    });
    return this;
  }
};

const man = new Man();
// 子类在链式调用之前会先收集所有的调用函数，按照顺序放入队列中，收集完成后顺序执行
man.work().sleep(1000).firstSleep(5000).work().sleep(1000);

// 执行结果
// 5 秒后打印 firstSleep end!!
// 直接打印  work runing!!
// 1 秒后打印  sleep end!!
// 直接打印  work runing!!
// 1 秒后打印  sleep end!!
```

## 3. 总结

非常的有意思的一个需求，这样的代码更多的是让我们考究语言的基础特性，训练思维方式以及巩固语言基础。

希望未来能够遇到更多的这样有意思的需求。