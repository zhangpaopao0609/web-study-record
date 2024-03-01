/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
const reverse = function(x) {
  const limit = Math.pow(2, 31);
  const INT_MAX = limit - 1;
  const INT_MIN = -limit;

  let res = 0;
  while(x != 0) {
    const pop = x % 10;
    x = (x - pop) / 10;
    if(res > INT_MAX / 10 || (res === INT_MAX / 10 && pop > 7)) return 0; 
    if(res < INT_MIN / 10 || (res === INT_MIN / 10 && pop < -8)) return 0;
    res = res * 10 + pop;
  }
  return res;
};
// @lc code=end

const reverse_1 = function(x) {
  const num = Math.abs(x);
  const res = Number(String(num).split('').reverse().join(''));
  const limit = Math.pow(2, 31);
  return res < limit-1 ? x > 0 ?  res : -res : 0;
};

