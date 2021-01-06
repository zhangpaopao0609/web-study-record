/*
 * @lc app=leetcode.cn id=521 lang=javascript
 *
 * [521] 最长特殊序列 Ⅰ 
 * 
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
// 如果a === b      -1
// 如果a !== b 但length同，返回length即可
// 如果a !== b 返回length长的一个
const findLUSlength = (a, b) => {
  if(a === b) {
    return -1;
  }else{
    return Math.max(a.length, b.length)
  }
};
// @lc code=end

// 如何暴力出字符串的子序列

