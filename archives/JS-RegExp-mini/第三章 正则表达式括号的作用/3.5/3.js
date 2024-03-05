// 驼峰化
// function camelize(str) {
//   const regex = /\b\w/g;
//   console.log(str.match(regex));
//   return str.replace(regex, c => c.toUpperCase()).replace(/-/g, '');
// };

// console.log(camelize('-moz-transform'));

function camelize(str) {
  const regex = /[-_\s]+(.)?/g;
  console.log(str.match(regex));
  return str.replace(regex, (match, c) => c ? c.toUpperCase() : '');
};

console.log(camelize('-moz-transform'));