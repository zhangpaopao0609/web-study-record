// 匹配成对标签
// 要求匹配 <title>regular expression</title>
// <p>lauyao</p>
// 不匹配
// <title>wrong</p>

const regex = /^(<)(.+>).*\1\/\2$/g;

// const str_01 = '<title>regular expression</title>';

// console.log(regex.test(str_01));

// const str_02 = '<p>regular expression</p>';

// console.log(regex.test(str_02));

// const str_03 = '<regular>regular expression</p>';

// console.log(regex.test(str_03));