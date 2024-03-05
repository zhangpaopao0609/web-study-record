// 密码长度 6-12 位，由数字小写大写字母组成，但必须至少包括 2 中字符

// 首先，由数字和大小写字母组成 6-12 位
const one = /^[0-9a-zA-Z]{6,12}$/;

const one_res = one.test("zbxl0609");

console.log(one_res);

const two = /(?=.*[0-9])^[0-9a-zA-Z]{6,12}$/;

const two_res = two.test("zbxlzzzz");

console.log(two_res);

const three = /(?=.*[a-zA-Z])^[0-9a-zA-Z]{6,12}$(?<=[0-9].*)/;

const three_res = three.test("a1424214a1F");

console.log(three_res);