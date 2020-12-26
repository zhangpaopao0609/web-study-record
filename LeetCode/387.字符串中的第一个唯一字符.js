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
  const len = s.length;
  for (let i = 0; i < len; i++) {
    arr[s.codePointAt(i) - 97]++;
  };
  for (let i = 0; i < len; i++) {
    if(arr[s.codePointAt(i) - 97] === 1) return i;
  }
  return -1;
};
// 104/104 cases passed (76 ms)
// Your runtime beats 99.85 % of javascript submissions
// Your memory usage beats 83.76 % of javascript submissions (40.8 MB)
// @lc code=end

