/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function(nums) {
  if(!nums.length) return 0;
  let slow = 0;
  for (let i = 0; i < nums.length; i++) {
    if(nums[slow] !== nums[i]) {
      nums[++slow] = nums[i]
    };
  }
  return slow+1;
};
// @lc code=end

