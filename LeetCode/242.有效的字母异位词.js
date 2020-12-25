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
const isAnagram = (s, t) => {
  if(s.length !== t.length) return false;
  const table = Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    // table[s.codePointAt(i) - 'a'.charCodeAt()]++;
    table[s.codePointAt(i) - 97]++;
  };
  for (let i = 0; i < s.length; i++) {
    table[t.codePointAt(i) - 97]--;
    if(table[t.codePointAt(i) - 97] < 0) return false;
  };
  return true;
};

// @lc code=end

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

const isAnagram_1 = (s, t) => {
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

