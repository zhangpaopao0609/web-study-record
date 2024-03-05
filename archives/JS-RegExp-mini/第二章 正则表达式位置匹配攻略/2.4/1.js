// 不匹配任何东西的正则
// const regex = /[^\w\W]/;
const regex = /.^/;


const string = 'test';

console.log(regex.test(string));