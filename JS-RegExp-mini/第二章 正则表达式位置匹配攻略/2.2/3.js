const result_01 = "hello".replace(/(?=l)/g,'#');
console.log(result_01);

const result_02 = "hello".replace(/(?!l)/g,'#');
console.log(result_02);
//#h#ell#o#

const result_03 = "hello".replace(/(?<=l)/g,'#');
console.log(result_03);

const result_04 = "hello".replace(/(?<!l)/g,'#');
console.log(result_04);
// #h#e#llo# 