/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 缺失数字 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 第一种，排完序，然后依次遍历下标和数字即可
// 位置交换，把对应数字交换对正确的下标中，正确了往前移动，
const missingNumber = nums => {
  nums.push(-1);
  let j = nums.length;
  for (let i = 0; i < nums.length; ) {
    if(nums[i] === -1) {
      j = i;
      i++;
    }else if(nums[i] !== i) {
      const temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    }else{
      i++;
    }
  }
  return j;
};
// @lc code=end

