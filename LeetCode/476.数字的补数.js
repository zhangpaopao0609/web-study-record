/*
 * @lc app=leetcode.cn id=476 lang=javascript
 *
 * [476] 数字的补数 
 * 
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
const findComplement = num => {
  let maxBitNum = 0;
  let temp = num;
  while(temp !== 0) {
    maxBitNum += 1;
    temp >>= 1;
  };
  return num ^ ((1 << maxBitNum) - 1);
};
// @lc code=end

