'use strict';
let _a;
const stat = false;
const n = 1;
const str = 'this is string';
// 数组
const arr1 = [1, 2];
const arr2 = [1, 2];
// 元组
const tup1 = ['1', 2, true];
// 枚举
// pay_status 0 未支付， 1 支付， 2 交易成功
// flag 1表示true， -1表示false
let Flag;
(function (Flag) {
  Flag[Flag.success = 1] = 'success';
  Flag[Flag.error = -1] = 'error';
})(Flag || (Flag = {}));
;
const flag = Flag.error;
console.log(flag);
let PayStatus;
(function (PayStatus) {
  PayStatus[PayStatus.notPay = 0] = 'notPay';
  PayStatus[PayStatus.hasPay = 1] = 'hasPay';
  PayStatus[PayStatus.dealSuccess = 2] = 'dealSuccess';
})(PayStatus || (PayStatus = {}));
;
const businessStatus = PayStatus.dealSuccess;
console.log(businessStatus);
// 任意类型
let hard = 'sd';
hard = 2;
// null 和 undefined 是其它类型（never）的子类型
// let num:number;
// console.log(num);
let unde;
console.log(unde);
let num_unde;
console.log(num_unde);
const null_data = null;
console.log(null_data);
let special;
// void 类型，typescript 中的 void 表示没有任何类型，一般用于定义方法的时候方法没有返回值
function foo() {
  console.log('foo');
}
;
foo();
// never 类型表示的是那些永不存在的值的类型。
// 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
let a;
// a = (() => {
//   throw Error("never type test!");
// })();
const s1 = Symbol('arrow');
console.log(s1);
const obj = (_a = {},
_a[s1] = 'try',
_a.age = 1,
_a.name = 'arr',
_a);
console.log(obj);
for (const key in obj) {
  console.log(key);
}
;
console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
console.log(JSON.stringify(obj, null, 2));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Reflect.ownKeys(obj));
// Symbol.for()  Symbol.keyFor()
Symbol.hasInstance;
Symbol.isConcatSpreadable;
Symbol.match;
Symbol.replace;
Symbol.search;
Symbol.split;
Symbol.iterator;
Symbol.toPrimitive;
Symbol.toString;
Symbol.unscopables;
