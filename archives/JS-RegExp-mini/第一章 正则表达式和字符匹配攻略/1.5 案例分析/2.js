// 匹配时间
// 23:59
// 02:07
// 1位可以为 012
// 当1位是01时，2位可以是0-9，当1位是2是，2位只能是0123
// 3位 :
// 4位为0-5，5位为0-9
const regex = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/;

console.log(regex.test('23:59'));
console.log(regex.test('02:07'));
console.log(regex.test('2:7'));
