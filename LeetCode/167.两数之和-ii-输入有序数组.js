/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

// 先用hash的方法来
const twoSum = (numbers, target) => {
  
};
// @lc code=end


const twoSum_1 = (numbers, target) => {
  const hash = new Map();
  for (let i = 0; i < numbers.length; i++) {
    if(hash.has(numbers[i])) {
      return [hash.get(numbers[i]), i+1];
    }else {
      hash.set(target - numbers[i], i+1);
    }
  }
};

