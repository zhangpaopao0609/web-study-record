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
// 将数字转换成3进制的
const isPowerOfThree = n => {
  const threeN = n.toString(3);
  const regex = /^10*$/
  return regex.test(threeN);
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

