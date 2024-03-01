/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续1的个数
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const findMaxConsecutiveOnes = nums => {
  let max = 0;
  let now = 0;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] === 1) {
      now += 1;
    }else {
      max = now > max ? now : max;
      now = 0;
    };
  };

  return now > max ? now : max;
};
// Accepted
// 41/41 cases passed (80 ms)
// Your runtime beats 98.99 % of javascript submissions
// Your memory usage beats 89.96 % of javascript submissions (40 MB)
// @lc code=end

