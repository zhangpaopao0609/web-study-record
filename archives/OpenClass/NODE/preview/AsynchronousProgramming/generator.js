function* func() {
  console.log('one');
  yield '1';
  console.log('two');
  yield '2';
  console.log('three');
  yield '3';
};

const f = func();
const one = f.next();
console.log(one);
const two = f.next();
console.log(two);
const three = f.next();
console.log(three);
const four = f.next();
console.log(four);

// for (const [key, value] of func()) {
//   console.log(key, value);
// }