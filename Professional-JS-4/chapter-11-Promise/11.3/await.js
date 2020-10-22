async function foo() {
  console.log(1);
  console.log(await Promise.resolve(2)); 
  console.log(3);
};

async function bar() {
  console.log(4);
  console.log(await 5);
  console.log(6);
};

console.log(7);
foo();
console.log(8);
bar();
console.log(9);