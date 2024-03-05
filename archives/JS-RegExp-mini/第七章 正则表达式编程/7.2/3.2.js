// 强大的 replace
// 把 2+3=5 变成 “2+3=2+3=5=5”;

const string = '2+3=5';
const regex =/=/;

// const res = string.replace(regex, "$`=$`=$'=$'");
const res = string.replace(regex, "$&$`$&$'$&");

console.log(res);