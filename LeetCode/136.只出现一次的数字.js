/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

 // 看看位运算的魅力
const singleNumber = nums => {
  let res = 0;
  for (const key of nums) {
    res ^= key;
  }
  return res;
};
// @lc code=end


// 这样需要额外的空间复杂度
const singleNumber_1 = nums => {
  const res = {};
  for (let i = 0; i < nums.length; i++) {
    if(res[nums[i]] !== undefined) {
      delete res[nums[i]];
    }else {
      res[nums[i]] = nums[i];
    }
  }
  let ans;
  Object.keys(res).forEach(item => ans = res[item]);
  return ans;
};

