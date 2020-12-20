/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 利用排序
// 拍完序后下标为 n>>1 的元素一定是众数
const majorityElement = nums => {
  // 这里就不用归并排了，直接使用内置api sort 排序
  return nums.sort((a,b) => a - b)[nums.length >> 1];
};
// @lc code=end

// 利用hash
const majorityElement_1 = nums => {
  const len = nums.length;
  const hashMap = new Map();
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(hashMap.has(now)) {
      hashMap.set(now,  hashMap.get(now) + 1);
    }else{
      hashMap.set(now, 1);
    }
  };
  const d = len >> 1;
  for (const key of hashMap) {
    if(key[1] > d) return key[0];
  }
};

// 优化hash  用打擂台方式把值保存下来，这样就可以不用遍历hash表了
const majorityElement = nums => {
  const len = nums.length;
  const hashMap = new Map();
  let max = 0;
  let maxKey = nums[0];
  for (let i = 0; i < len; i++) {
    const now = nums[i];
    if(hashMap.has(now)) {
      const val = hashMap.get(now) + 1;
      if(val > max) {
        max = val;
        maxKey = now;
      }
      hashMap.set(now,  val);
    }else{
      hashMap.set(now, 1);
    }
  };
  return maxKey;
};


// 利用排序
// 拍完序后下标为 n>>1 的元素一定是众数
const majorityElement = nums => {
  // 这里就不用归并排了，直接使用内置api sort 排序
  return nums.sort((a,b) => a - b)[nums.length >> 1];
};