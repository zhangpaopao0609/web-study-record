"use strict";
var stat = false;
var n = 1;
var str = "this is string";
// 数组
var arr1 = [1, 2];
var arr2 = [1, 2];
// 元组
var tup1 = ['1', 2, true];
// 枚举
// pay_status 0 未支付， 1 支付， 2 交易成功
// flag 1表示true， -1表示false
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = -1] = "error";
})(Flag || (Flag = {}));
;
var flag = Flag.error;
console.log(flag);
var PayStatus;
(function (PayStatus) {
    PayStatus[PayStatus["notPay"] = 0] = "notPay";
    PayStatus[PayStatus["hasPay"] = 1] = "hasPay";
    PayStatus[PayStatus["dealSuccess"] = 2] = "dealSuccess";
})(PayStatus || (PayStatus = {}));
;
var businessStatus = PayStatus.dealSuccess;
console.log(businessStatus);
// 任意类型
var hard = "sd";
hard = 2;
// null 和 undefined 是其它类型（never）的子类型
// let num:number;
// console.log(num);
var unde;
console.log(unde);
var num_unde;
console.log(num_unde);
var null_data = null;
console.log(null_data);
var special;
// void 类型，typescript 中的 void 表示没有任何类型，一般用于定义方法的时候方法没有返回值
function foo() {
    console.log('foo');
}
;
foo();
// never 类型表示的是那些永不存在的值的类型。
// 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
var a;
a = (function () {
    throw Error("never type test!");
})();
