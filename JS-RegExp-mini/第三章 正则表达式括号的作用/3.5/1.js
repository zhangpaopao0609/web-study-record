// 字符串 trim 方法模拟
// trim 是将字符串开头和结尾的空白符去掉
const str = "    test arrow      ";

const regex = /^\s+|\s+$/g;

console.log(str.replace(regex, ""));

function trim_(str) {
  return str.replace(/^\s*(.*?)\s*$/g, "$1")
};

console.log(trim_(str).length);