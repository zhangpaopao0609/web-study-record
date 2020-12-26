/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const firstUniqChar = s => {
  const arr = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    arr[s.codePointAt(i) - 97]++;
  };
  for (let i = 0; i < s.length; i++) {
    if(arr[s.codePointAt(i) - 97] === 1) return i;
  }
  return -1;
};
// Accepted
// 104/104 cases passed (92 ms)
// Your runtime beats 97.44 % of javascript submissions
// Your memory usage beats 51.76 % of javascript submissions (41.2 MB)
// @lc code=end

