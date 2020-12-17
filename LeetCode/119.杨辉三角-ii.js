/*
 * @lc app=leetcode.cn id=119 lang=javascript
 *
 * [119] 杨辉三角 II 
 */

// @lc code=start
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
// 原始的杨辉三角
const getRow = rowIndex => {
  if(rowIndex === 0) return [1];
  let prev = [1];

  for (let i = 0; i < rowIndex; i++) {
    for (let j = 0; j < i; j++) {
      prev[j] = prev[j] + prev[j+1]
    }
    prev.unshift(1);
  }
  return prev;
};
// @lc code=end

