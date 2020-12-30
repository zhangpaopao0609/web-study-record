/*
 * @lc app=leetcode.cn id=414 lang=javascript
 *
 * [414] 第三大的数 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 针对我的第一想法做一点优化
const thirdMax = nums => {
  let first = -Infinity;
  let second = -Infinity;
  let third = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    const now = nums[i];
    if(now === first || now === second || now === third) continue;
    if(now > first) {
      third = second;
      second = first;
      first = now;
    }else if(now > second) {
      third = second;
      second = now;
    }else if(now > third) {
      third = now;
    }
  };
  if(third === -Infinity) return first;
  return third;
};

// @lc code=end

// 第一想法就是最大，然后忽略最大，循环到第三次即可
const thirdMax = nums => {
  let max1 = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] > max1) max1 = nums[i];
  };
  let max2 = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] > max2 && nums[i] !== max1) max2 = nums[i];
  }
  let max3 = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    if(nums[i] > max3 && nums[i] !== max1 && nums[i] !== max2) max3 = nums[i];
  };
  if(max3 !== -Infinity) return max3;
  return max1;
};
// Accepted
// 26/26 cases passed (76 ms)
// Your runtime beats 95.83 % of javascript submissions
// Your memory usage beats 97.24 % of javascript submissions (37.6 MB)
