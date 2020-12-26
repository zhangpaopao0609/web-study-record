/*
 * @lc app=leetcode.cn id=292 lang=javascript
 *
 * [292] Nim 游戏 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 重点在于给对手留下4块石头
const canWinNim = n => {
  return (n % 4 !== 0);
};
// @lc code=end

