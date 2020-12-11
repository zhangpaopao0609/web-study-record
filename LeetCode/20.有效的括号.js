/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
  const len = s.length;
  if(len%2 !== 0) return false;
  const hash = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  const left = [];
  for (let i = 0; i < len ; i++) {
    if(hash[s[i]]) {
      left.push(s[i]);
    }else {
      if(hash[left.pop()] !== s[i]) {
        return false;
      }
    }
  }
  return !left.length
};
// @lc code=end
const isValid_1 = function(s) {
  const len = s.length;
  if(len%2 !== 0) return false;
  const hash = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  const left = [];
  for (let i = 0; i < len ; i++) {
    if(hash[s[i]]) {
      left.push(s[i]);
    }else {
      if(hash[left.pop()] !== s[i]) {
        return false;
      }
    }
  }
  return !left.length
};

