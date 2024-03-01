/*
 * @lc app=leetcode.cn id=504 lang=javascript
 *
 * [504] 七进制数
 * 
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
const convertToBase7 = num => {
  if(!num) return '0';
  let res = '';
  let keep = num > 0 ? num : -num;
  while(keep) {
    const m = keep % 7;
    res = m + res;
    keep = (keep - m) / 7;
  };
  return num > 0 ? res : '-'+res;
};
// @lc code=end

