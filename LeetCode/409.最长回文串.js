/*
 * @lc app=leetcode.cn id=409 lang=javascript
 *
 * [409] 最长回文串
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = s => {
  const hashMap = new Map();

  for (let i = 0; i < s.length; i++) {
    const now = s.charAt(i);
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else{
      hashMap.set(now, 1);
    };
  };
  let res = 0;
  let flag = 0;
  for (const [key, val] of hashMap) {
    if(val % 2 === 0) {
      res += val;
    }else{
      res += (val-1)
      flag = 1;
    }
  };
  return res + flag;
};
// Accepted
// 95/95 cases passed (76 ms)
// Your runtime beats 98.45 % of javascript submissions
// Your memory usage beats 60.78 % of javascript submissions (39.4 MB)
// @lc code=end

