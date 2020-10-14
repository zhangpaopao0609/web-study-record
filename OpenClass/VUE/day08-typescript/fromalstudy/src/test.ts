// // 类型注解
// let foo: string = 'open';

// // 类型推论
// let foo2 = true;

// // 原始类型
// // string，number，boolean，undefined，null，symbol
// let foo3: string | undefined;   // 联合类型

// // 类型数组
// let arr: Array<string>;

// // 任意类型
// let strAny: any;

// // any 也可以用于数组
// let arrAny: Array<any>;

// // 函数类型约束
// function greet(person: string): string {
//     return `hello ${person}`;
// };
// const msg = greet('arrow');

// // void类型
// function noReturn(): void {
//     console.log(1);
// }

// // 对象object,在ts中，不是原始类型，就是对象类型
// function fn1(o: object) {};

// fn1({prop: 0});

// // 正确的姿势
// function fn2(o: {prop: number}) {};

// fn2({prop: 0})
// // fn2({prop: 'tom'})

// // 类型别名 type 自定义类型
// type Prop = {prop: number}; // 这种声明的是一种类型结构
// // type Prop = {prop: number} & {foo: number}; 类型扩展
// function fn3(o: Prop) {};   // 等同于fn2，但是更加规范

// // type 和 interface的区别，基本上是一样的，只是在兼容上有区别
// // type是2.7以后才实现的，基本上是可以互换的

// interface Prop2 {
//     prop: number;
// }


// 类型断言
// const someValue: any = 'this is a string';
// const len = (someValue as string).length;

// // 联合类型 相当于或语句
// let union: string | number;
// union = 2
// union = '1'

// // 交叉类型 做扩展
// type First = {first: number};
// type Second = {second: number};
// // 扩展新的type  集合合并  并
// type FirstAndSecond = First & Second;

// function fn4(): FirstAndSecond {
//     return {first: 1, second: 2};
// }

// // 函数
// // 1. 设置了，就是必填参数
// // 2. 默认值 msg = 'msg'
// // 3. 可选参数？
// function greeting(person: string, msg = 'msg', msg2?: string): string {
//     return ''
// }

// greeting('arrow')

// // 函数重载: 场景主要是源码和框架，函数用参数的个数、类型或者返回值类型区分同名函数
// // 重载的正确姿势，先声明，再实现
// // 同名的声明可以有多个
// function watch(cb1: () => void): void;
// function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void;
// // 实现
// function watch(cb1:() => void, cb2?: (v1: any, v2: any) => void): void {
//     if(cb1 && cb2) {
//         console.log("执行重载2");
//     }else {
//         console.log("执行重载1");
//     }
// }

// watch()
// class Parent {
//     private _foo = "foo";   // 私有属性，不能在类的外部访问
//     protected bar = "bar";  // 保护属性，可以在子类访问

//     // 参数属性： 构造函数参数加修饰符，能够成为成员属性
//     constructor(public tua = "tua") {};
//     // 方法也有修饰符
//     private _someMethod() {};

//     // 存取器：属性方式访问，可添加额外逻辑，控制读写性
//     get foo() {
//         return this._foo;
//     };

//     set foo(val) {
//         this._foo = val;
//     };
// }

// class Child extends Parent {
//     say() {
//         this.bar;
//     }
// }

// const p = new Parent();
// const c = new Child();
