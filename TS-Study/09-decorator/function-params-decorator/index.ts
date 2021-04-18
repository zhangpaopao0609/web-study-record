/**
 * 4. 方法参数装饰器
 * 参数装饰器表达式会在运行时当前函数被调用，可以使用参数装饰器为类的原型增加一些元素数据，传入下面 3 个参数：
 * 1. 对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象
 * 2. 方法的名字
 * 3. 参数在函数参数列表中的索引
 */

function functionParamsDecorator(target: any, functionName: any, paramsIndex: any) {
  console.log(target, functionName, paramsIndex);
  target.gender = 'boy';
}

class Man {
  getData(str: string, @functionParamsDecorator uuid: any) {
    console.log('get data');
  }
};

const m: any = new Man();
m.getData('a', 'b')
console.log(m.gender);

export {}