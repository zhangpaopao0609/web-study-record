[toc]

# ES6 类的单例模式

## 1. 前言

想想 ES5 中实现类的方法 和 以及痛苦的继承。

- 利用 function 实现类

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
    // 实例方法
    this.run = function() {
      console.log(this.name + this.age);
    };
  };
  
  // 静态方法
  Person.prototype.work = function() {
    console.log("work")
  }
  
  const newOne = new Person("arr", 13);
  
  newOne.run();
  newOne.work()
  ```

- 利用 原型链 和 盗用构造函数来实现

  ```js
  // 盗用构造函数来传值（不能继承到原型链上的方法和属性）
  function Arrow(name, age) {
    Person.call(this, name, age)
  }
  
  // 原型链来继承方法（单独的原型链继承可以继承实例和方法，但是实例化子类的时候没法给父类传值）
  Arrow.prototype = new Person();
  
  const arrow = new Arrow('arr', 12);
  arrow.run();
  arrow.work();
  ```

所幸的是 ES6 给我们提供了新的类的创建方式 和 继承方式

- class 创建

  ```js
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    // 实例方法
    run() { console.log(this.name + this.age); }
  
    work() { console.log("work"); }
  
    // 静态方法
    static test() { console.log("static"); }
  };
  
  
  const arrow = new Person("arr", 12);
  
  arrow.run();
  arrow.work();
  
  Person.test();
  ```

- extends 继承

  ```js
  class Arrow extends Person {
    constructor(name, age) {
      super(name, age);
    }
  };
  
  const arr = new Arrow("arr", 13);
  arr.run();
  arr.work();
  ```

  ES6 的继承简直太棒了。好了前言就说到这里，本文这不是重点。

  重点是，每一次实例化类时，都是需要重新去新建一个子类的，如下：

  ```js
  class DB {
    constructor() {
      this.connect();
    }
  
    connect() {
      console.log("连接数据库！");
    }
  
    find() {
      console.log("查找数据！");
    }
  };
  
  const instance_1 = new DB();
  instance_1.find();
  
  const instance_2 = new DB();
  instance_2.find();
  
  const instance_3 = new DB();
  instance_3.find();
  // 连接数据库！
  // 查找数据！
  // 连接数据库！
  // 查找数据！
  // 连接数据库！
  // 查找数据！
  ```

  看似没有什么问题，按时如果这里的 connect 方法需要一秒钟呢？那么多次实例化是不是就浪费了时间。因此，本文主要将 JS 的单例模式

## 2. 单例模式



```js
class DB {
  constructor() {
    this.connect();
  }

  static getInstance() {
    if(!DB.instance) {
      DB.instance = new DB();
    };
    return DB.instance;
  }

  connect() {
    console.log("连接数据库！");
  }

  find() {
    console.log("查找数据！");
  }
};

const instance_1 = DB.getInstance();
instance_1.find();

const instance_2 = DB.getInstance();
instance_2.find();

const instance_3 = DB.getInstance();
instance_3.find();
// 连接数据库！
// 查找数据！
// 查找数据！
// 查找数据！
```

这样会发现，构造函数只实例化了一次，这在连接数据库中十分实用。