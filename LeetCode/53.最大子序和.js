/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 贪心2
const maxSubArray = function(nums) {
  let max = current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if(current < 0) {
      current = nums[i];
    }else {
      current += nums[i];
    }
    max = Math.max(current, max);
  }
  return max;
};
// @lc code=end

// 这动态规划简直太恐怖了
// 给跪了
const maxSubArray_1 = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      pre = Math.max(pre + x, x);
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
};

// 贪心1
const maxSubArray_2 = function(nums) {
  let max = nums[0];
  let pre = nums[0];
  let now = 0;
  for (let i = 1; i < nums.length; i++) {
    if(pre < 0) {
      now = nums[i];
    }else {
      now = pre + nums[i];
    }
    pre = now;
    max = Math.max(now, max);
  }
  return max;
};
