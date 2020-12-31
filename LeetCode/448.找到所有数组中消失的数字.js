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
// 因为数字是1-n的，所以可以用出现的数字来标记索引，如num[i]为6，
// 那么说明6是出现了的, 把 6-1 索引对应的位置标记一下为负数, 就知道这个数是存在的
const findDisappearedNumbers = nums => {
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const now = Math.abs(nums[i]) - 1;
    if(nums[now] > 0) {
      nums[now] *= -1
    }
  };
  let res = [];
  for (let i = 0; i < len; i++) {
    if(nums[i] > 0) res.push(i+1);
  };
  return res;
};
// Accepted
// 34/34 cases passed (112 ms)
// Your runtime beats 98.34 % of javascript submissions
// Your memory usage beats 65.67 % of javascript submissions (45.8 MB)
// @lc code=end

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

