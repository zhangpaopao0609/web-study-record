/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// for循环，非零往前移动
// 移动的跨度由零的个数来决定
const moveZeroes = nums => {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] === 0) {
      count++;
    }else if(count){
      nums[i-count] = nums[i];
      nums[i] = 0;
    }
  }
};

// Accepted
// 21/21 cases passed (80 ms)
// Your runtime beats 97.35 % of javascript submissions
// Your memory usage beats 28.4 % of javascript submissions (39.6 MB)
// @lc code=end

