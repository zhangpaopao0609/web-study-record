/**
 * 3. 方法装饰器
 * 它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义
 * 
 * 方法装饰会在运行时传入下面 3 个参数
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * 2. 成员的名字
 * 3. 成员的属性描述符
 */

function functionDecorator(target: any, functionName: any, descriptor: any) {
  console.log(target, functionName, descriptor);
  console.log(target);    // 类的原型
  // 保存当前的方法
  const old = descriptor.value;
  descriptor.value = function() {
    console.log('改造原来的方法！');
    old.apply(this);    // 实例
  }
};

class Person {
  public name: string = 'arrow';
  public age: string | undefined;

  @functionDecorator
  getName() {
    console.log(this.name);
  }

  getAge() {
    console.log(this.age);
  }
};

const t = new Person();
t.getName()

export {}