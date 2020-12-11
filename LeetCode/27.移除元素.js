/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
  const len = nums.length;
  if(!len) return 0;
  let slow = 0;
  for (let i = 0; i < len; i++) {
    if(nums[i] !== val) {
      nums[slow++]=nums[i]
    }
  }
  return slow;
};
// @lc code=end

