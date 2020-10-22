// async function foo() {
//   console.log(1);
//   Promise.reject(3);
// }

// foo().catch(e => console.log(e));

// console.log(2);


async function foo() {
  console.log(1);
  throw 3;
}

foo().catch(e => console.log(e));

console.log(2);