/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDisappearedNumbers = nums => {
  for (let i = 0; i < nums.length; ) {
    if(nums[i] === i+1 || nums[i] === nums[nums[i]-1]) {
      i++;
    }else{
      const temp = nums[i];
      nums[i] = nums[temp-1];
      nums[temp-1] = temp;
    }
  };
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if(i+1 !== nums[i]) res.push(i+1);
  };
  return res;
};
// Accepted
// 34/34 cases passed (104 ms)
// Your runtime beats 99.62 % of javascript submissions
// Your memory usage beats 68.53 % of javascript submissions (45.8 MB)
// @lc code=end

