//  055188888888
//  0551-88888888
//  (0551)88888888

//  055188888888
const str_one = '055188888888';
const one = /^0\d{2,3}[1-9]\d{6,7}$/;
console.log(one.test(str_one));

//  0551-88888888
const str_two = '0551-88888888';
const two = /^0\d{2,3}-[1-9]\d{6,7}$/;
console.log(two.test(str_two));

//  (0551)88888888
const str_three = '(0551)88888888';
const three = /^\(0\d{2,3}\)[1-9]\d{6,7}$/;
console.log(three.test(str_three));

const all = /^(0\d{2,3}-?|\(0\d{2,3}\))[1-9]\d{6,7}$/;
console.log(all.test(str_one));
console.log(all.test(str_two));
console.log(all.test(str_three));

const str_four = '(0551-88888888';
console.log(all.test(str_four));


