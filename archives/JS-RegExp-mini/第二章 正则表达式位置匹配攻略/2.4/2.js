// 数字的千分位分隔符表达法
// 比如： 将 "123456789" 变成 "123,456,789"

// 首先，弄出最后一个逗号
const string = "12345678";
const lastIcon = /(?=\d{3}$)/g;

const result_01 = string.replace(lastIcon, ',');
console.log(result_01);

// 然后所有的逗号
const allIcon = /(?=(\d{3})+$)/g;

const result_02 = string.replace(allIcon, ',');
console.log(result_02);

const result_03 = "123456789".replace(allIcon, ',');
console.log(result_03);

const allIconReally = /(?!^)(?=(\d{3})+$)/g;

const result_04 = "1234".replace(allIconReally, ',');
console.log(result_04);
