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
var firstUniqChar = function(s) {
  const position = new Map();
  const q = [];
  for (let [i, ch] of Array.from(s).entries()) {
    if (!position.has(ch)) {
      position.set(ch, i);
      q.push([s[i], i]);
    } else {
      position.set(ch, -1);
      while (q.length && position.get(q[0][0]) === -1) {
          q.shift();
      }
    }
  }
  return q.length ? q[0][1] : -1;
};
// 104/104 cases passed (76 ms)
// Your runtime beats 99.85 % of javascript submissions
// Your memory usage beats 83.76 % of javascript submissions (40.8 MB)
// @lc code=end

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
