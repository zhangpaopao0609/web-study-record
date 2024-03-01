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
// 惊艳一波
const repeatedSubstringPattern = s => {
  return (s+s).indexOf(s, 1) !== s.length;
};
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

// 哇塞，优化后的暴力法简直了
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

// 我想，我这个是暴力法吧
// 对我这个暴力法优化一下
// 1. 因为子串至少需要重复一遍，因此，只需要一半
// 2. 因为子串肯定是字符串长度的整数倍
// 再优化一波暴力法
const repeatedSubstringPattern = s => {
  const len = s.length;
  for (let i = 1; i * 2 <= len; i++) {
    if(len % i === 0) {
      let mark = true;
      for (let j = i; j < len; j++) {
        if(s.charAt(j) !== s.charAt(j-i)) {
          mark = false;
          break;
        }
      };
      if(mark) return true;
    }
  };
  return false;
};
// Accepted
// 120/120 cases passed (104 ms)
// Your runtime beats 45.31 % of javascript submissions
// Your memory usage beats 38.57 % of javascript submissions (40.9 MB)