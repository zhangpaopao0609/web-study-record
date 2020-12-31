/*
 * @lc app=leetcode.cn id=441 lang=javascript
 *
 * [441] 排列硬币
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 二分法 也是可以的
const arrangeCoins = n => {
  let l = 0;
  let r = n;
  while(l <= r) {
    const m = l + ((r - l) >> 1);
    const sum = m * (m + 1) >> 1;
    if(sum > n) {
      r = m - 1;
    }else if(sum < n) {
      l = m + 1;
    }else {
      return m;
    }
  };
  return r;
};
// @lc code=end
// 我觉得吧我这算是完美
// 直接利用 n(n+1)/2 反推 x 就可
const arrangeCoins = n => {
  return Math.floor(Math.sqrt(2*n + 1/4) -1/2);
};
// Accepted
// 1336/1336 cases passed (104 ms)
// Your runtime beats 90.22 % of javascript submissions
// Your memory usage beats 78.31 % of javascript submissions (39.1 MB)


// 二分法 也是可以的 
// 只是在 JS 中不知道如何处理 长整型
const arrangeCoins = n => {
  let l = 0;
  let r = n;
  while(l <= r) {
    const m = l + ((r - l) >> 1);
    const sum = m * (m + 1) >> 1;
    if(sum > n) {
      r = m - 1;
    }else if(sum < n) {
      l = m + 1;
    }else {
      return m;
    }
  };
  return r;
};
