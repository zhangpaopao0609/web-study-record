// 强大的 replace
// 把 2,3,5 变成 “5=2+3”;

const string = '2,3,5';
const regex = /(\d),(\d),(\d)/;

console.log(regex.exec(string));

const res = string.replace(regex, '$3=$1+$2');

console.log(res);