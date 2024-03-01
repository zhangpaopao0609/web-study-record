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

const isIsomorphic = (s, t) => {
  const len = s.length;
  if(!len) return true;
  for (let i = 0; i < len; i++) {
    // 返回字符在字符串中第一次出现的索引
    if(s.indexOf(s.charAt(i)) !== t.indexOf(t.charAt(i))) return false;
  };
  return true;
};
// @lc code=end


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

const isIsomorphic_1 = (s, t) => {
  if(!s.length) return true;
  return stringToNum(s) === stringToNum(t);
};
