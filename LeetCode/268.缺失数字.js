/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 缺失数字 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 第一种，排完序，然后依次遍历下标和数字即可
// 位置交换，把对应数字交换对正确的下标中，正确了往前移动，

// 解析用了hashMap 我个人觉得不好哈

// 解析第二种方法是用的位运算，因为一个数的两次异或为零
// 所以，只需要异或数组中的数 和 0-n 异或就可以了
const missingNumber = nums => {
  const len = nums.length;
  let res = len;
  for (let i = 0; i < len; i++) {
    res ^= i^nums[i];
  };
  return res;
};
// @lc code=end

// 第一种，排完序，然后依次遍历下标和数字即可
// 位置交换，把对应数字交换对正确的下标中，正确了往前移动，
const missingNumber_1 = nums => {
  nums.push(-1);
  let j = nums.length;
  for (let i = 0; i < nums.length; ) {
    if(nums[i] === -1) {
      j = i;
      i++;
    }else if(nums[i] !== i) {
      const temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
    }else{
      i++;
    }
  }
  return j;
};


const missingNumber_2 = nums => {
  const hashMap = new Map();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    hashMap.set(nums[i], 1);
  };
  for (let i = 0; i <= len; i++) {
    if(!hashMap.has(i)) return i;
  }
};

// 解析第二种方法是用的位运算，因为一个数的两次异或为零
// 所以，只需要异或数组中的数 和 0-n 异或就可以了
const missingNumber_3 = nums => {
  const len = nums.length;
  let res = len;
  for (let i = 0; i < len; i++) {
    res ^= i^nums[i];
  };
  return res;
};
// Accepted
// 122/122 cases passed (76 ms)
// Your runtime beats 98.88 % of javascript submissions
// Your memory usage beats 28.5 % of javascript submissions (40.3 MB)

