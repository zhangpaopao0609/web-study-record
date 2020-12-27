/*
 * @lc app=leetcode.cn id=367 lang=javascript
 *
 * [367] 有效的完全平方数
 *
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
// 牛顿法
const isPerfectSquare = num => {
  if(num <= 0) return false;
  if(num === 1) return true;
  let x = num >> 1;
  while(x**2 > num) {
    x = (x + num / x) >> 1;
  };
  return x**2 === num;
};
// @lc code=end

const isPerfectSquare = num => {
  if(num <= 0) return false;
  if(num === 1) return true;
  let end = num;
  let start = 0;
  while(start < end) {
    const mid = start + ((end - start) >> 1);
    if(mid ** 2 > num) {
      end = mid;
    }else if(mid ** 2 < num){
      start = mid + 1;
    }else{
      return true;
    }
  }
  return false;
};


// 优化二分
const isPerfectSquare = num => {
  if(num <= 0) return false;
  if(num === 1) return true;
  let end = num >> 1;
  let start = 2;
  while(start <= end) {
    const mid = start + ((end - start) >> 1);
    if(mid ** 2 > num) {
      end = mid - 1;
    }else if(mid ** 2 < num){
      start = mid + 1;
    }else{
      return true;
    }
  }
  return false;
};
