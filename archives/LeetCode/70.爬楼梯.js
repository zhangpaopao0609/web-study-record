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

// 动态规划
// https://www.zhihu.com/question/39948290
const climbStairs = n => {
  let p = 0, q = 0, r = 1;
  for (let i = 1; i <= n; ++i) {
    p = q;
    q = r;
    r = p + q;
  };
  return r;
};
// @lc code=end

// 动态规划
// https://www.zhihu.com/question/39948290
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


// 矩阵快速幂
// square root
// sqrt