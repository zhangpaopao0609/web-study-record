// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

// 示例 1:

// 输入: 121
// 输出: true
// 示例 2:

// 输入: -121
// 输出: false
// 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
// 示例 3:

// 输入: 10
// 输出: false
// 解释: 从右向左读, 为 01 。因此它不是一个回文数。
// 进阶:

// 你能不将整数转为字符串来解决这个问题吗？

/**
 * @param {number} x
 * @return {boolean}
 */
const solution1 = function(x) {
  if(x < 0) return false
  if(x === Number(x.toString().split('').reverse().join(''))) {
    return true;
  };
  return false;
}

const solution2 = function(x) {
  if(x < 0) return false
  let result = 0;
  let y = x;
  while(y) {            
    num =  y % 10;      
    result = result * 10 + num;
    y = (y-num) / 10  
  }
  return result === x 
}

const solution3 = function(x) {  //  思想很好，结果一般
  if (x < 0) return false;
  if (x < 10) return true;      //  这里很好
  let n = 10 ** Math.floor(Math.log10(x));    // 计算数字长度
  while (n > 1 && x > 0) {
      if (Math.floor(x / n) !== x % 10) return false;  // 首尾不同
      x = Math.floor((x % n) / 10);  // 相同则去掉首尾
      n /= 100;
  }
  return true;
}

console.log(solution2(-121))

var isPalindrome = function(x) {
  solution1(x)
};

