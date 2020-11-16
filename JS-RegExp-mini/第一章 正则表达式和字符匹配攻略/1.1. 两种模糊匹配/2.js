const regex = /a[123]c/g;
const string = "a0c a1c a2c a3c a4c";

const res = string.match(regex);

console.log(res);