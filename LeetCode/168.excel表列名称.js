/*
 * @lc app=leetcode.cn id=168 lang=javascript
 *
 * [168] Excel表列名称
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
// 这道题的思路就是26进制
const convertToTitle = n => {
  let res = "";
  while(n) {
    const mod = n % 26 ? n % 26 : 26;
    res = String.fromCharCode(mod + 64) + res;
    n = (n-mod) / 26;
  };
  return res;
};
// Accepted
// 18/18 cases passed (68 ms)
// Your runtime beats 98.29 % of javascript submissions
// Your memory usage beats 40.59 % of javascript submissions (37.6 MB)
// @lc code=end

