const string = "2020.06.09";

console.log(string.search('.'));
console.log(string.search('\\.'));
console.log(string.search(/\./));

console.log(string.match('.'));
console.log(string.match('\\.'));
console.log(string.match(/\./));
console.log(string.match(/\./g));


console.log(string.split('.'));
console.log(string.replace('.', '-'));
console.log(string.replace(/\./g, '-'));

