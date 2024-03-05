// 货币格式化
// 188888
// $ 1,888.00

function format(num) {
  return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, "$$ ");
}

console.log(format(188888));