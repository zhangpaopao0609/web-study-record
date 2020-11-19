// 匹配浮点数
const regex = /[+-]?\d*\.?\d*/;

const str_one = 1.23;

console.log(regex.test(str_one));

const str_two = -10;

console.log(regex.test(str_two));

const str_three = -.2;

console.log(regex.test(str_three));

const str_four = '';

console.log(regex.test(str_four));