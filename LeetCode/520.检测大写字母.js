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
// 一、判断ascii是不是都小于97还是只有第一个小于97
// 二、正则
const detectCapitalUse = word => {
  // 全大写
  const re1 = /^[A-Z]+$/;
  // 首字母大写 或者全小写
  const re2 = /^[A-Z]?[a-z]*$/;
  return re1.test(word) || re2.test(word);
};
// @lc code=end

const detectCapitalUse = word => {
  // 全大写
  const re1 = /^[A-Z]+$/;
  // 首字母大写 或者全小写
  const re2 = /^[A-Z]?[a-z]*$/;
  return re1.test(word) || re2.test(word);
};

