/*
 * @lc app=leetcode.cn id=189 lang=javascript
 *
 * [189] 旋转数组
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 使用反转
// 这个方法基于这个事实： 当旋转数组 k 次， k % n 个尾部元素会被移动到头部，剩下的元素会被向后移动
const reverse = (nums, start, end) => {
  while(start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}

const rotate = (nums, k) => {
  const len = nums.length;
  k %= len;
  reverse(nums, 0, len-1);
  reverse(nums, 0, k-1);
  reverse(nums, k, len-1);
};
// Accepted
// 35/35 cases passed (80 ms)
// Your runtime beats 98.88 % of javascript submissions
// Your memory usage beats 27.88 % of javascript submissions (39.6 MB)
// @lc code=end


// 滚动数组
const rotate_1 = (nums, k) => {
  const len = nums.length;
  for (let i = 0; i < k; i++) {
    const last = nums[len - 1];
    for (let j = len-1; j > 0; j--) {
      nums[j] = nums[j - 1]
    }
    nums[0] = last;
  }
};

// 滚动数组
// 简单优化一下，如果 k > length 那就减去
const rotate_2 = (nums, k) => {
  const len = nums.length;
  let l = k % len;
  for (let i = 0; i < l; i++) {
    const last = nums[len - 1];
    for (let j = len-1; j > 0; j--) {
      nums[j] = nums[j - 1]
    }
    nums[0] = last;
  }
};


// 使用一个新数组
const rotate_3 = (nums, k) => {
  const newOne = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    let j = i + k;
    if(j < len) {
      newOne[j] = nums[i];
    }else{
      while(j >= len) {
        j -= len;
      }
      newOne[j] = nums[i];
    }
  };
  for (let i = 0; i < len; i++) {
    nums[i] = newOne[i];
  } 
};

// 使用一个新数组
// 完全可以优化的
const rotate_4 = (nums, k) => {
  const newOne = [];
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    newOne[(i+k) % len] = nums[i];
  };
  for (let i = 0; i < len; i++) {
    nums[i] = newOne[i];
  } 
};


// -------------------------------------------------
// 使用环状替换
const rotate = (nums, k) => {
  let l = count = nums.length;
  k = k % l;
  let prev = next = record = 0;
  let prevNum = nums[0], nextNum = null;
  
  while(count) {
    next = (prev+k) % l;
    nextNum = nums[next];
    nums[next] = prevNum;
    if(next === record){
      record++; 
      prev = record;
      prevNum = nums[record];
    }else{
      prev = next;
      prevNum = nextNum; 
    }
    count--;
  }
};