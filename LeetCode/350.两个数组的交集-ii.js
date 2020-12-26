/*
 * @lc app=leetcode.cn id=350 lang=javascript
 *
 * [350] 两个数组的交集 II
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersect = (nums1, nums2) => {
  const l1 = nums1.length;
  const l2 = nums2.length;
  if(!l1 || !l2) return [];

  const hash = new Map();
  const res = [];

  for (let i = 0; i < l1; i++) {
    if(!hash.has(nums1[i])) {
      hash.set(nums1[i], 1);
    }else {
      hash.set(nums1[i], hash.get(nums1[i])+1);
    }
  }
  for (let i = 0; i < l2; i++) {
    if(hash.has(nums2[i]) && hash.get(nums2[i])) {
      res.push(nums2[i]);
      hash.set(nums2[i], hash.get(nums2[i])-1);
    }
  };
  return res;
};
// @lc code=end

const intersect = (nums1, nums2) => {
  const l1 = nums1.length;
  const l2 = nums2.length;
  if(!l1 || !l2) return [];
  if(l1 > l2) {
    nums1 = nums1;
    nums2 = nums2;
  }else {
    nums1 = nums2;
    nums2 = nums1;
  }

  const hash = new Map();
  const res = [];

  for (let i = 0; i < nums1.length; i++) {
    if(!hash.has(nums1[i])) {
      hash.set(nums1[i], 1);
    }else {
      hash.set(nums1[i], hash.get(nums1[i])+1);
    }
  }
  for (let i = 0; i < nums2.length; i++) {
    if(hash.has(nums2[i]) && hash.get(nums2[i])) {
      res.push(nums2[i]);
      hash.set(nums2[i], hash.get(nums2[i])-1);
    }
  };
  return res;
};
// Accepted
// 61/61 cases passed (80 ms)
// Your runtime beats 92.33 % of javascript submissions
// Your memory usage beats 5.83 % of javascript submissions (40.4 MB)
