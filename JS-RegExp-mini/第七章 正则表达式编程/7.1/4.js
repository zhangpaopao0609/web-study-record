const regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;

const string = "2020.02.14";

console.log(string.match(regex));