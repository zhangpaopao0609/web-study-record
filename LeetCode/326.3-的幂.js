/*
 * @lc app=leetcode.cn id=326 lang=javascript
 *
 * [326] 3的幂 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 利用对数的性质
const isPowerOfThree = n => {
  return n > 0 && 1162261467 % n == 0;
};
// @lc code=end

// 还是先写个循环吧！
const isPowerOfThree_1 = n => {
  if(n <= 0) return false;
  while(n % 3 === 0) {
    n /= 3;
  };
  return n === 1;
};

// 将数字转换成3进制的
const isPowerOfThree_2 = n => {
  const threeN = n.toString(3);
  const regex = /^10*$/
  return regex.test(threeN);
};


// 利用对数的性质
const isPowerOfThree_3 = n => {
  return (Math.log10(n) / Math.log10(3)) % 1 === 0;
};
