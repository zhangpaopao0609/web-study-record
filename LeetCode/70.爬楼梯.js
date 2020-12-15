/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = n => {
  const way = Array(n+1).fill(0);
  way[n] = 1;
  way[n-1] = 2;
  while(n > 2) {
    way[n-2] = way[n-1] + way[n];
    n--;
  }
  return way[1];
};
// @lc code=end

