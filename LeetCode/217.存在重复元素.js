/*
 * @lc app=leetcode.cn id=217 lang=javascript
 *
 * [217] 存在重复元素
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 偶尔利用一下js的set吧
const containsDuplicate = nums => {
  return nums.length !== [...new Set(nums)].length
};
// @lc code=end

// 老久的hash
const containsDuplicate_1 = nums => {
  const len = nums.length;
  if(!len) return false;
  const hashMap =new Map();
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(hashMap.has(now)) {
      return true;
    }else{
      hashMap.set(now);
    }
  }
  return false;
};

// 偶尔利用一下js的set吧
const containsDuplicate_2 = nums => {
  return nums.length !== [...new Set(nums)].length
};

