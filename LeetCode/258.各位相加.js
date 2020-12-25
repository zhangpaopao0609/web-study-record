/*
 * @lc app=leetcode.cn id=258 lang=javascript
 *
 * [258] 各位相加
 *  
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
const addDigits = num => {
  while(num >= 10) {
    let res = 0;
    while(num) {
      const mod = num % 10;
      res += mod;
      num = (num-mod) / 10;
    };
    num = res;
  }
  return num;
};
// @lc code=end

