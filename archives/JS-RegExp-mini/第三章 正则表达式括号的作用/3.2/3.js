const regex = /(\d{4})-(\d{2})-(\d{2})/;

const string = "2017-06-12";

console.log(regex.test(string));
// console.log(regex.exec(string));
// console.log(string.match(regex));

console.log(RegExp.$1);

console.log(RegExp.$2);
