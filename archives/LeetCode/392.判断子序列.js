/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 *
 * https://leetcode-cn.com/problems/is-subsequence/description/
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 使用动态规划预处理 t 数组
const isSubsequence = (s, t) => {
  const m = s.length, n = t.length;
  const dp = [];
  for (let i = 0; i < n+1; i++) {
    dp.push(Array(26).fill(n));
  }
  for (let i = n-1; i >= 0; i--) {
    for (let j = 0; j < 26; j++) {
      if(t.codePointAt(i)-97 === j) {
        dp[i][j] = i;
      }else{
        dp[i][j] = dp[i+1][j];
      }
    }
  };
  console.log(dp);
  let add = 0;
  for (let i = 0; i < m; i++) {
    if(dp[add][s.codePointAt(i) - 97] === n)
      return false;
    add = dp[add][s.codePointAt(i) - 97] + 1;
  };
  return true;
};
// @lc code=end
const isSubsequence = (s, t) => {
  if(!s) return true;
  let j = 0;
  for (let i = 0; i < t.length; i++) {
    if(s.charAt(j) === t.charAt(i)) {
      j++;
      if(j === s.length) return true;
    };
    
  };
  return false;
};


// 优化一下，这就是双指针,让代码看起来更简洁好看
const isSubsequence = (s, t) => {
  const m = s.length, n = t.length;
  let i = 0, j = 0;

  while(i < m && j < n) {
    if(s.charAt(i) === t.charAt(j)) {
      i++;
    };
    j++;
  };
  return i === m;
};
