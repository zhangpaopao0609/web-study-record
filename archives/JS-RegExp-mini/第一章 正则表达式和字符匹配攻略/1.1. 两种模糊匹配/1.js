const regex = /ab{2,5}c/g;
const string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";

const res = string.match(regex);

console.log(res);