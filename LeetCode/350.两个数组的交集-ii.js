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
  if(l1 > l2) {
    n1 = nums1;
    n2 = nums2;
  }else {
    n1 = nums2;
    n2 = nums1;
  }

  const hash = new Map();
  const res = [];

  for (let i = 0; i < n1.length; i++) {
    if(!hash.has(n1[i])) {
      hash.set(n1[i], 1);
    }else {
      hash.set(n1[i], hash.get(n1[i])+1);
    }
  }
  for (let i = 0; i < n2.length; i++) {
    if(hash.has(n2[i]) && hash.get(n2[i])) {
      res.push(n2[i]);
      hash.set(n2[i], hash.get(n2[i])-1);
    }
  };
  return res;
};
// Accepted
// 61/61 cases passed (80 ms)
// Your runtime beats 92.33 % of javascript submissions
// Your memory usage beats 5.83 % of javascript submissions (40.4 MB)
// @lc code=end

