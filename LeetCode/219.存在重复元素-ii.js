/*
 * @lc app=leetcode.cn id=219 lang=javascript
 *
 * [219] 存在重复元素 II
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
// 又来 hash
const containsNearbyDuplicate = (nums, k) => {
  const len = nums.length;
  if(!len) return false;
  const hashMap = new Map();
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(hashMap.has(now) && (i - hashMap.get(now) <= k)) {
      return true;
    }else {
      hashMap.set(now, i);
    }
  };
  return false;
};
// Accepted
// 23/23 cases passed (72 ms)
// Your runtime beats 99.81 % of javascript submissions
// Your memory usage beats 36.12 % of javascript submissions (43.4 MB)
// @lc code=end

