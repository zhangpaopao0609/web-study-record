/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function(nums, val) {
  const len = nums.length;
  if(!len) return 0;
  let slow = 0;
  for (let i = 0; i < len; i++) {
    if(nums[i] !== val) {
      nums[slow++]=nums[i]
    }
  }
  return slow;
};
// @lc code=end

// 补充一点，当删除的元素很少的时候
// 比如[1,2,3,4,5] 删除5
// 比如[1,2,3,4,5] 删除1 
// 双指针都会做四次不必要的复制操作
// 因此，可以做简单的优化
// 当遇到num[i] === val 时，可以让当前元素等于最后一个元素，并释放最后一个元素，这实际上使得数组的大小减少了1
const removeElement_1 = function(nums, val) {
  let len = nums.length;
  if(!len) return 0;
  let slow = 0;
  while(slow < len) {
    if(nums[slow] === val) {
      nums[slow] = nums[len-1];
      len--;
    }else {
      slow++;
    }
  }
  return slow;
};

