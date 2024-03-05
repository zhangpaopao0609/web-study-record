// 强大的 replace
// 把 2,3,5 变成 “222,333,555”;

const string = '2,3,5';
const regex = /(\d+)/g;

const res = string.replace(regex, '$&$&$&');

console.log(res);