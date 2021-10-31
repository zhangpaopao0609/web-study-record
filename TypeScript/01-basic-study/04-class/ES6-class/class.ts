class Person {
  name: string; // 前面省略了 public 关键词

  constructor(name: string) {   // 构造函数，实例化类的时候触发的方法
    this.name = name;
  }

  getName(): void {
    console.log(this.name);
  }

  setName(name: string): void {
    this.name = name;
  }
};

const p = new Person('arrow');

p.getName();
p.setName('bullet');
p.getName();

class Man extends Person {
  
};

// 默认情况下两者等同
// class Man extends Person {};
// class Man extends Person {
//   constructor(...args) {
//     super(...args);
//     1. super作为函数，指父类的构造函数，只是内部 this 指向为子类的实例，相当于 Person.prototype.constructor.call(this)
//     2. super作为对象时，普通方法中指向父类的原型，静态方法中指向父类
//   }
// }

// 1. 类 class
// 2. 继承 extends super
// 3. 类的修饰符 typescript 里面定义属性的时候给我提供了三种修饰符
/**
 * public: 公有，在类里面、子类、类外面都可以访问
 * protected： 保护类型，在类里面、子类里面可以访问，在类外面不可访问
 * private：私有  只能再类里面访问，子类和类外面都不访问
 * 属性如果不加修饰符，默认是 public
 */

 export {}
 