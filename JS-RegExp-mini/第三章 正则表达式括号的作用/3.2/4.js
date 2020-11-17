const regex = /(\d{4})-(\d{2})-(\d{2})/;

const string = "2017-06-12";

const result = string.replace(regex, "$2/$3/$1");

console.log(result);