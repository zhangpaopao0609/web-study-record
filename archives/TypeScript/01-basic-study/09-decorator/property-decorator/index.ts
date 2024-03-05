/**
 * 2. 属性装饰器
 * 属性装饰器表达式会在运行时当做函数被调用，传入2个参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
 * 2. 成员的名字
 */

function propertyDecorator(target: any, key: any) {
  target[key] = 'test'
};

function propertyDecoratorWithParams(params: string) {
  return function(target: any, key: any) {
    target[key] = params;
  }
}

class Url {
  @propertyDecorator
  public data: string | undefined;

  @propertyDecoratorWithParams("default value")
  public value: string | undefined;

  getData() {
    console.log(this.data);
    console.log(this.value);
  }
};

const h = new Url();
h.getData()

export {}