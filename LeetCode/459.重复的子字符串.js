/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 我想，我这个是暴力法吧
const isSub = (sub, s) => {
  const l = sub.length;
  for (let i = 0; i < s.length; ) {
    if(s.substr(i, l) !== sub) return false;

    i += l;
  };
  return true;
}

const repeatedSubstringPattern = s => {
  for (let i = 1; i < s.length; i++) {
    if(isSub(s.substr(0, i), s)) return true;
  };
  return false;
};
// @lc code=end

