/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 动态规划
const fib = n => {
  if(n < 2) return n;
  let p = 0, q = 0, r = 1;
  for (let i = 2; i <= n; i++) {
    p = q;
    q = r;
    r = q + p;
  };
  return r;
};
// @lc code=end
const fib = n => {
  if(n === 0) return 0;
  else if (n === 1) return 1;
  else return fib(n-1) + fib(n-2);
};

// 动态规划
const fib = n => {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  };
  return dp[n];
};

const fib = n => {
  if(n < 2) return n;
  let p = 0, q = 1;
  for (let i = 2; i <= n; i++) {
    const temp = q;
    q = p + q;
    p = temp;
  };
  return q;
};