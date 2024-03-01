/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 二分
const searchInsert = (nums, target) => {
  const n = nums.length;
  let left = 0, right = n - 1, ans = n;
  while (left <= right) {
      let mid = ((right - left) >> 1) + left;
      if (target <= nums[mid]) {
          ans = mid;
          right = mid - 1;
      } else {
          left = mid + 1;
      }
  }
  return ans;
};
// @lc code=end

const searchInsert_1 = function(nums, target) {
  const len = nums.length;
  if(!len) return 0;
  let left = 0;
  let right = len - 1; 
  while(left <= right) {
    const mid = Math.floor((right - left) / 2) +left; 
    const midVal = nums[mid];
    if(target < midVal) {
      right = mid - 1;
    }else if(target > midVal){
      left = mid + 1;
    }else {
      return mid;
    }
  }
  return Math.max(left, right);
};

