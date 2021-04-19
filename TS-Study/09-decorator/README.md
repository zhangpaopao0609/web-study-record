# 09-decorator
装饰器：
装饰器是一种特殊类型的声明：它能够被附加到类声明，方法，属性或参数上，可以修改类的行为。
通俗的将装饰器就是一个方法，可以注入到类，方法，属性参数上来扩展类、属性、方法、参数的功能。
常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器
装饰器的写法： 普通装饰器（无法传参）、装饰器工厂（可传参）
装饰器是过去几年中 js 最大的成就之一，已是 ES7 的标准特性之一

## 装饰器
1. 类装饰器
类装饰器在类声明之前就被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。
传入一个参数,即类本身

2. 属性装饰器
属性装饰器表达式会在运行时当做函数被调用，传入2个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字

3. 方法装饰器
它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义

方法装饰会在运行时传入下面 3 个参数
1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
2. 成员的名字
3. 成员的属性描述符

4. 方法参数装饰器
参数装饰器表达式会在运行时当前函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下面 3 个参数：
1. 对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
2. 方法的名字
3. 参数在函数参数列表中的索引

## 装饰器的执行顺序
1. 属性装饰器
2. 方法装饰器
3. 方法属性装饰器
4. 类装饰器

如果有多个装饰器装饰同一个，会先执行后面的
```js
/**
 * 装饰器执行的顺序
 * Sequence of decorator execution
 */

function propertyDecorator_1(target: any, propertyName: any) {
  console.log("1. propertyDecorator_1");
};
function propertyDecorator_2(target: any, propertyName: any) {
  console.log("1. propertyDecorator_2");
};

function functionDecorator_1(target: any, functionName: any, descriptor: any) {
  console.log("2. functionDecorator_1");
};
function functionDecorator_2(target: any, functionName: any, descriptor: any) {
  console.log("2. functionDecorator_2");
};

function functionParamsDecorator_1(target: any, functionName: any, paramsIndex: number) {
  console.log("3. functionParamsDecorator_1");
};
function functionParamsDecorator_2(target: any, functionName: any, paramsIndex: number) {
  console.log("3. functionParamsDecorator_2");
};

function classDecorator_1(target: any) {
  console.log("4. classDecorator_1");
};
function classDecorator_2(target: any) {
  console.log("4. classDecorator_2");
};

@classDecorator_1
@classDecorator_2
class Arrow {
  @propertyDecorator_1
  @propertyDecorator_2
  name: string | undefined;

  @functionDecorator_1
  @functionDecorator_2
  getName() {}

  set(@functionParamsDecorator_1 name: string, @functionParamsDecorator_2 age: string) {}
};

// 1. propertyDecorator_2
// 1. propertyDecorator_1
// 2. functionDecorator_2
// 2. functionDecorator_1
// 3. functionParamsDecorator_2
// 3. functionParamsDecorator_1
// 4. classDecorator_2
// 4. classDecorator_1
```