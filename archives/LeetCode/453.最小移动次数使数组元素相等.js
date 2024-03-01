/*
 * @lc app=leetcode.cn id=453 lang=javascript
 *
 * [453] 最小移动次数使数组元素相等 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 优化一波，用数组之和减去最小值的len倍
const minMoves = nums => {
  const len = nums.length;
  let min = nums[0];
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(now < min) min = now;
    sum += now;
  };
  return sum - min*len;
};
// @lc code=end


// 我已经找到规律了，哈哈！
// 就是用每个数减去最小的之和
const minMoves = nums => {
  const len = nums.length;
  let min = nums[0];
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(now < min) min = now;
  };
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += (nums[i] - min);
  };
  return sum;
};
