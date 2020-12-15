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

// 牛顿法
const mySqrt = x => {
  if(x === 0) return 0;
  let x0 = 0, x1 = x;
  while(Math.abs(x1-x0) > 10E-2) {
  // while(Math.abs(x1-x0) > 10E-6) {
    x0 = x1;
    x1 = (x0 + (x / x0)) * 0.5
  }
  return  parseInt(x1);
};
// @lc code=end

// 二分法
// 关键在于临界值
const mySqrt_1 = x => {
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

// 清爽的二分法
const mySqrt_3 = x => {
  let l = 0, r = x, ans = -1;
  while(l <= r) {
    const mid = (l + r) >> 1;
    if(mid*mid <= x) {
      ans = mid;
      l = mid + 1;
    }else {
      r = mid - 1;
    }
  }
  return ans;
};

// 数学法
// 根号x 其实就等于x的1/2方，x又等于e的lnx次幂，所以根号x也就等于e的1/2倍lnx次幂
const mySqrt_2 = x => {
  if(x === 0) return 0;
  let ans = parseInt(Math.exp(0.5 * Math.log(x)));
  return (ans + 1) * (ans + 1) <= x ? ans + 1 : ans
};
