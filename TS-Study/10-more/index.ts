// interface Named {
//   name: string;
// }

// let x: Named;
// let y = { name: 'arrpw', location: 's' };
// // x 兼容 y
// x = y;



let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
console.log(y);
// x = y; // Error