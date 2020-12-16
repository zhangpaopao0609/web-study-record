/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// 记录一下2020.12.16
// 早上这道算法题，跑步的时候一下子就想到了方法，交换两个数组即可



// 第儿种方法 O(n)
// 从后往前遍历放置即可
const merge = function(nums1, m, nums2, n) {
  let i = m - 1, j = n -1 , k = m + n - 1;
  while(i >= 0 && j >= 0) {
    if(nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--] 
    }else {
      nums1[k--] = nums2[j--] 
    }
  }
  while(i >= 0) {
    nums1[k--] = nums1[i--] 
  }  
  while(j >= 0) {
    nums1[k--] = nums2[j--] 
  }  
};
// @lc code=end

// 有点行不通呀
const merge_1 = function(nums1, m, nums2, n) {
  const res = [];
  let i = 0, j = 0, k = 0;
  while(i < m && j < n) {
    if(nums1[i] < nums2[j]) res[k++] = nums1[i++];
    else res[k++] = nums2[j++];
  };
  while(i < m) {
    res[k++] = nums1[i++]
  }

  while(j < n) {
    res[k++] = nums2[j++]
  }
  num1 = [...res];
};


// 第一种方法 nlog(m+n)
// 把nums2 插入到nums1中（二分）
const merge_2 = function(nums1, m, nums2, n) {
  let i = 0, j = 0;
  while(i <= n) {

  }
};
