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
// 2021.3.22 早再来写一遍这个最长回文子串
// 采用动态规划
// dp[i][j] 子串i为起点，j为终点想要是回文，那么动态规划的话，存在如下递推公式
// dp[i][j] = dp[i+1][j-1] && (str[i] === str[j]) 当然这里的 j-1 >= i+1 也就是子串长度至少为 2
// dp[i][j] = str[i] === str[j] 这里是指子串长度为 2 的情况
// dp[i][j] = true 这里是指子串长度为 1 的情况
const longestPalindrome = str => {
  const len = str.length;
  let res = "";
  const dp = Array.from(new Array(len), () => new Array(len).fill(0));
  
  for (let d = 0;  d < len; d++) {       // 起点和终点相隔距离：0，表示子串长度为 1。
    for (let i = 0; i+d < len; i++) {   // 子串的起点
      const j = i + d;                  // 子串终点
      if(d === 0) {
        dp[i][j] = true;                // 子串长度为 1
      }else if(d === 1) {
        dp[i][j] = str[i] === str[j];   // 子串长度为 2
      }else {   
        dp[i][j] = dp[i+1][j-1] && (str[i] === str[j]); 
      };

      if(dp[i][j] && d+1 > res.length) {  // 找到最长的回文子串，首先要是回文子串且长度大于之前的
        res = str.slice(i, j + 1);
      };
    };
  };
  return res;
};
// @lc code=end




const longestPalindrome_1 = str => {
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
      };
    }
  }
  return res;
};

console.log(longestPalindrome('babad'));
