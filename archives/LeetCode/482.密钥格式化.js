/*
 * @lc app=leetcode.cn id=482 lang=javascript
 *
 * [482] 密钥格式化 
 * 
 */

// @lc code=start
/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
const licenseKeyFormatting = (S, K) => {
  S = S.toUpperCase();
  let res = "";
  let num = 0;
  for (let i = S.length-1; i >= 0; ) {
    if(num !== K && S.charAt(i) === '-') {
      i--;
      continue;
    }
    if(num === K) {
      res = '-' + res;
      num = 0;
    }else {
      res = S.charAt(i) + res;
      num++;
      i--;
    }
  };
  while(res.charAt(0) === '-') {
    res = res.substr(1);
  }
  return res;
};
// Accepted
// 38/38 cases passed (72 ms)
// Your runtime beats 100 % of javascript submissions
// Your memory usage beats 48.11 % of javascript submissions (42.9 MB)
// @lc code=end

