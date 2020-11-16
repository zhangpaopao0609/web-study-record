// 匹配 16 进制颜色值
const regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

const string = '#ffbbad #Fc01DF #FFF #ffE';

const res = string.match(regex);

const re = regex.test(string)

console.log(res);

console.log(re);