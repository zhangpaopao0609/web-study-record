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