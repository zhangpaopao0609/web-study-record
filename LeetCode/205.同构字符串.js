/*
 * @lc app=leetcode.cn id=205 lang=javascript
 *
 * [205] 同构字符串
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

// hashMap
const stringToNum = s => {
  let newS = "";
  const hashMap = new Map();
  for (let i = 0; i < s.length; i++) {
    const now = s.charAt(i);
    if(!hashMap.has(now)) {
      hashMap.set(now, i);
    }
    newS += hashMap.get(now);
  }
  return newS;
}

const isIsomorphic = (s, t) => {
  if(!s.length) return true;
  return stringToNum(s) === stringToNum(t);
};
// @lc code=end

