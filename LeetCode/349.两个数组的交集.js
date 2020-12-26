/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = (nums1, nums2) => {
  if(!nums1.length || !nums2.length) return [];
  const hash = new Set();
  const res = new Set();
  for (let i = 0; i < nums1.length; i++) {
    if(!hash.has(nums1[i])) hash.add(nums1[i]);
  }
  for (let i = 0; i < nums2.length; i++) {
    if(hash.has(nums2[i]) && !res.has(nums2[i])) res.add(nums2[i]);
  };
  return [...res];
};
// @lc code=end

