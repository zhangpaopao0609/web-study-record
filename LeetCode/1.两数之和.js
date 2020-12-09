/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

const twoSum = function(nums, target) {
  const hash = {};
  for(let i=0; i<nums.length; i++) {
    const another = target-nums[i];
    if(hash.hasOwnProperty(another)) {
      return [ hash[another], i]
    }
    hash[nums[i]] = i;
  }
};
// @lc code=end

// 暴力循环
const twoSum_1 = function(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if(nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

