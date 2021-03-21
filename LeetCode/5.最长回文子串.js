/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

const longestPalindrome = str => {
  // dp[i][j] 为子串起点和终点位置 dp[i][j] = dp[i+1][j-1] && same
  const n = str.length;
  const dp = Array.from(new Array(n),() => new Array(n).fill(0));
  let res = "";

  for (let l = 0; l < n; l++) { // 子串长度减去 1, 这里要稍微理解一下为什么是0开始，因为l为0时子串长度其实为1
    for (let i = 0; i + l < n; i++) {    // 子串起点  起点加长度必须小于总长
      const j = i + l; // 子串终点位置
      if(l === 0) {
        dp[i][j] = true;
      }else if(l === 1) {
        dp[i][j] = str[i] === str[j];
      }else {
        dp[i][j] = ((str[i] === str[j]) && dp[i+1][j-1]);
      };
      if(dp[i][j] && l+1 > res.length) {
        res = str.slice(i, j + 1);
      }
    }
  }
  return res;
};
// @lc code=end

