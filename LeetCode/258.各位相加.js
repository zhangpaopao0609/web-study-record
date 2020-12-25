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
// https://leetcode-cn.com/problems/add-digits/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-5-7/
const addDigits = num => {
  return (num-1) % 9 + 1;
};
// @lc code=end

const addDigits_1 = num => {
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

