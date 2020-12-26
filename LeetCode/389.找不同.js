/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 *
 * https://leetcode-cn.com/problems/find-the-difference/description/ 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
const findTheDifference = (s, t) => {
  const hashMap = new Map();
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const now = s.charAt(i);
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else{
      hashMap.set(now, 1);
    }
  };
  for (let i = 0; i < len + 1; i++) {
    const now = t.charAt(i);
    const nowValue = hashMap.get(now);
    if(hashMap.has(now) && nowValue) {
      hashMap.set(now, nowValue - 1);
    }else{
      return now;
    }
  }
};
// Accepted
// 54/54 cases passed (80 ms)
// Your runtime beats 93.64 % of javascript submissions
// Your memory usage beats 85.14 % of javascript submissions (38.7 MB)
// @lc code=end

