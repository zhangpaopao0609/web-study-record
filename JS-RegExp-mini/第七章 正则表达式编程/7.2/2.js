const string = "2016.06.09";
const regex = /\b(\d+)\b/g;

console.log(regex.exec(string));
// console.log(string.match(regex));
console.log(regex.lastIndex);
