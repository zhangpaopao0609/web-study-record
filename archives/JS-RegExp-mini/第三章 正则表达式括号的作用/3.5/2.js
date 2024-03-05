// 单词的首字母转换为大写

function titleize(str) {
  str = str.toLowerCase();
  const regex = /(^|\s)\w/g;
  console.log(str.match(regex));
  console.log(regex.test(str));
  console.log(RegExp.$2);

  return str.toLowerCase().replace(/(?:^|\s)\w/g, c => c.toUpperCase())
}

console.log(titleize('my name is arrow'));