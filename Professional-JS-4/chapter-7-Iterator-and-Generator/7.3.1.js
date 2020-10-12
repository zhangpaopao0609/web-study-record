function* genetatorFn() {
    return 'foo';
};

const g = genetatorFn();

console.log(g);
console.log(g[Symbol.iterator]);
console.log(g.next);
console.log(g.next());
