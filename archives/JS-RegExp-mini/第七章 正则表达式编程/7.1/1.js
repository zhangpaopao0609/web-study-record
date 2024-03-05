const regex = /\d/;

const string = 'abc123';

console.log(string.search(regex));
console.log(regex.test(string));

console.log(string.match(regex));
console.log(regex.exec(string));