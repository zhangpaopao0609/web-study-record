/*
 * @lc app=leetcode.cn id=171 lang=javascript
 *
 * [171] Excel表列序号
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const titleToNumber = s => {
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    ans = ans * 26 + (s.charAt(i).charCodeAt() - 64);
  }
  return ans;
};
// @lc code=end

// Accepted
// 1000/1000 cases passed (88 ms)
// Your runtime beats 96.37 % of javascript submissions
// Your memory usage beats 24.42 % of javascript submissions (39.4 MB)

const titleToNumber_1 = s => {
  let ans = 0;
  let n = 0;
  while(s) {
    const len = s.length;
    const mod = s.charAt(len - 1);
    ans += (mod.charCodeAt() - 64) * Math.pow(26, n++);
    s = s.slice(0, len - 1);
  };
  return ans;
};


const titleToNumber_2 = s => {
  let ans = 0;
  const len = s.length;
  for (let i = len-1; i >=0; i--) {
    ans += (s.charAt(i).charCodeAt() - 64) * Math.pow(26, len - i - 1);
  }
  return ans;
};