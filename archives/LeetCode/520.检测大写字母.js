/*
 * @lc app=leetcode.cn id=520 lang=javascript
 *
 * [520] 检测大写字母
 *
 */

// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
// 想了几种方法
// 一、判断 ascii 是不是都小于 97 还是只有第一个小于 97
// 二、正则
// 要么全大写，要么全小写，要么第一个大写
const detectCapitalUse = word => {
  let count = 0, len = word.length;
  for (let i = 0; i < len; i++) {
    // 大写的个数
    if(word.codePointAt(i) < 97) count++;
  }
  return count === 0 || count === len || (count === 1 && word.codePointAt(0) < 97);
}
// @lc code=end

const detectCapitalUse = word => {
  // 全大写
  const re1 = /^[A-Z]+$/;
  // 首字母大写 或者全小写
  const re2 = /^[A-Z]?[a-z]*$/;
  return re1.test(word) || re2.test(word);
};

const detectCapitalUse = word => {
  return /(^[A-Z]+$)|(^[A-Z]?[a-z]*$)/.test(word);
};

