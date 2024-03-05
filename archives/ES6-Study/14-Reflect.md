[toc]

# Reflect

## 1. 概述

Reflect 对象 也是ES6为操作对象儿提供的新API，目的如下：

1. 将语言内部方法放到 Reflect上

2. 修改某些Object方法的返回结果

3. 让Object操作都变成函数行为，某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。

   ```javascript
   // 老写法
   'assign' in Object // true
   
   // 新写法
   Reflect.has(Object, 'assign') // true
   ```

