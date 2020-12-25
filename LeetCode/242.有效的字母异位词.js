/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 *  
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const hashMap = s => {
  const hashMap = new Map();
  for (let i = 0; i < s.length; i++) {
    const now = s.charAt(i);
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else {
      hashMap.set(now, 1);
    }
  };
  return hashMap;
}

const isAnagram = (s, t) => {
  if(s.length !== t.length) return false;
  const S = hashMap(s);
  const T = hashMap(t);
  for (let i = 0; i < s.length; i++) {
    const now = s.charAt(i);
    if(S.get(now) !== T.get(now)) {
      return false;
    }
  };
  return true;  
};

// Accepted
// 34/34 cases passed (92 ms)
// Your runtime beats 89.55 % of javascript submissions
// Your memory usage beats 90.12 % of javascript submissions (38.9 MB)
// @lc code=end

