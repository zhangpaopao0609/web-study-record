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
// 对我这个暴力法优化一下
// 1. 因为子串至少需要重复一遍，因此，只需要一半
// 2. 因为子串肯定是字符串长度的整数倍
const isSub = (sub, s) => {
  const l = sub.length;
  for (let i = 0; i < s.length; ) {
    if(s.substr(i, l) !== sub) return false;

    i += l;
  };
  return true;
}

const repeatedSubstringPattern = s => {
  const len = s.length;
  for (let i = 1; i * 2 <= len; i++) {
    if(len % i) continue;
    if(isSub(s.substr(0, i), s)) return true;
  };
  return false;
};
// Accepted
// 120/120 cases passed (76 ms)
// Your runtime beats 98.44 % of javascript submissions
// Your memory usage beats 42.16 % of javascript submissions (40.6 MB)
// @lc code=end


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

// Accepted
// 120/120 cases passed (176 ms)
// Your runtime beats 6.47 % of javascript submissions
// Your memory usage beats 16.6 % of javascript submissions (44.1 MB)


// 我想，我这个是暴力法吧
// 对我这个暴力法优化一下
// 1. 因为子串至少需要重复一遍，因此，只需要一半
// 2. 因为子串肯定是字符串长度的整数倍
const isSub = (sub, s) => {
  const l = sub.length;
  for (let i = 0; i < s.length; ) {
    if(s.substr(i, l) !== sub) return false;

    i += l;
  };
  return true;
}

const repeatedSubstringPattern = s => {
  const len = s.length;
  for (let i = 1; i * 2 <= len; i++) {
    if(len % i) continue;
    if(isSub(s.substr(0, i), s)) return true;
  };
  return false;
};
// Accepted
// 120/120 cases passed (76 ms)
// Your runtime beats 98.44 % of javascript submissions
// Your memory usage beats 42.16 % of javascript submissions (40.6 MB)
