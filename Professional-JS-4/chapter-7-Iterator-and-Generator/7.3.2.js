// function* generatorFn() {
//     yield 'a';
//     yield 'b';
//     return 'c';
// };

// const g = generatorFn();

// console.log(g.next());
// console.log(g.next());
// console.log(g.next());

// for (const x of generatorFn()) {
//     console.log(x);
// }


// function* test() {
//     console.log(yield);
// };

// const g = test();

// console.log(g.next('a'));
// console.log(g.next('b'));


function* test2() {
    yield* [1, 2, 3];
};

const g1 = test2();

console.log(g1.next());
console.log(g1.next());


