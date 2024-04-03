'use strict';
// interface Named {
//   name: string;
// }
// let x: Named;
// let y = { name: 'arrpw', location: 's' };
// // x 兼容 y
// x = y;
const x = function (a) {
  return 0;
};
let y = function (b, s) {
  return 0;
};
y = x; // OK
console.log(y);
// x = y; // Error
