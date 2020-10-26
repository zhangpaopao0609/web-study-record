const add = (x, y) => x + y;
const square = z => z * z;
// const fn = (x, y) => square(add(x, y));
// console.log(fn(1, 2));

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));
// const fn = compose(add, square);
// console.log(fn(1, 2));

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args);
//   other.forEach(fn => {
//     ret = fn(ret);
//   });
//   return ret;
// }

// const fn = compose(add, square, square);
// console.log(fn(1, 2));

const compose = (...[first, ...other]) => (...args) => {
  return other.reduce((res, fn) => fn(res), first(...args))
}

const fn = compose(add, square, square);
console.log(fn(1, 2));