/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 * 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = x => {
  if(x === 0) return 0;
  if(x === 1) return 1;

  let left = 0;
  let right = x-1;

  while(left <= right) {
    const mid = (right + left) >> 1;
    if(mid*mid < x) {
      left = mid + 1;
    }else if(mid*mid > x) {
      right = mid - 1;
    }else {
      return mid;
    }
  };

  return Math.min(left, right);
};
// @lc code=end

