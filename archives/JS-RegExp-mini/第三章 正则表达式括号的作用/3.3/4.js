const regex = /(?:ab)+/g;

const string = "ababa abbb ababab";

console.log(string.match(regex));
console.log(regex.test(string));
console.log(RegExp.$1);