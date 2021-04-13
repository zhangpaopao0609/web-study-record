let stat: boolean = false;

let n: number = 1;

let str: string = "this is string";

// 数组
let arr1: number[] = [1, 2];
let arr2: Array<number> = [1, 2];

// 元组
let tup1: [string, number, boolean] = ['1', 2, true];

// 枚举
// pay_status 0 未支付， 1 支付， 2 交易成功
// flag 1表示true， -1表示false
enum Flag {
  success = 1,
  error = -1
};

let flag: Flag = Flag.error;
console.log(flag);

enum PayStatus {
  notPay = 0,
  hasPay = 1,
  dealSuccess = 2
};

let businessStatus: PayStatus = PayStatus.dealSuccess;
console.log(businessStatus);


// 任意类型
let hard: any = "sd";
hard = 2;

// null 和 undefined 是其它类型（never）的子类型
// let num:number;
// console.log(num);

let unde: undefined;
console.log(unde);

let num_unde: number | undefined;
console.log(num_unde);

let null_data: null = null;
console.log(null_data);

let special: number | null | undefined;

// void 类型，typescript 中的 void 表示没有任何类型，一般用于定义方法的时候方法没有返回值
function foo(): void {
  console.log('foo');
};

foo();

// never 类型表示的是那些永不存在的值的类型。
// 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
let a: never;
a = (() => {
  throw Error("never type test!");
})()