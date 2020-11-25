const regex = /\D/;

const string_1 = '2020.06.09';
const string_2 = '2020/06/09';
const string_3 = '2020-06-09';

console.log(string_1.split(regex));
console.log(string_2.split(regex));
console.log(string_3.split(regex));