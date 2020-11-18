const str1 = "2020-11-18";
const str2 = "2020.11.18";
const str3 = "2020/11/18";
const str4 = "2020-11/18";

const regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/;

console.log(regex.test(str1));
console.log(regex.test(str2));
console.log(regex.test(str3));
console.log(regex.test(str4));
