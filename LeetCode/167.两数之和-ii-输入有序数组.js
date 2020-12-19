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

// 双指针  因为有序
// 两头指针和如果大于，后指针往前
// 两头指针和如果小于，前指针往后
// 这是一定有答案的情况
// 这里优化一下，提高鲁棒性
// 这里再优化一波，用双指针加二分
const twoSum = (numbers, target) => {
  let head = 0;
  let tail = numbers.length - 1;
  while(head < tail) {
    // 利用二分来进一步优化范围
    const mid = (head + tail) >> 1;
    // 如果中间位数 + 头位数 都大于了目标数，那么尾位 = mid - 1
    if(numbers[mid] + numbers[head] > target) {
      tail = mid - 1;
    // 如果中间位数 + 尾位数 都小于了目标数，那么头位= mid + 1
    }else if(numbers[mid] + numbers[tail] < target) {
      head = mid + 1;
    // 如果上面没满足
    // 如果头位数 + 尾位数 大于了目标数，那么尾位 - 1
    }else if (numbers[head] + numbers[tail] > target) {
      tail--;
    // 如果头位数 + 尾位数 小于了目标数，那么头位 + 1
    }else if(numbers[head] + numbers[tail] < target){
      head++;
    }else {
      return [++head, ++tail];
    }
  }
  return [-1, -1];
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


// 双指针  因为有序
// 两头指针和如果大于，后指针往前
// 两头指针和如果小于，前指针往后
// 这是一定有答案的情况
const twoSum_2 = (numbers, target) => {
  let head = 0;
  let tail = numbers.length - 1;
  while(numbers[head] + numbers[tail] !== target) {
    const sum = numbers[head] + numbers[tail];
    if(sum > target) {
      tail--;
    }else{
      head++;
    }
  }
  return [++head, ++tail];
};



// 双指针  因为有序
// 两头指针和如果大于，后指针往前
// 两头指针和如果小于，前指针往后
// 这是一定有答案的情况
// 这里优化一下，提高鲁棒性
const twoSum_3 = (numbers, target) => {
  let head = 0;
  let tail = numbers.length - 1;
  while(head < tail) {
    const sum = numbers[head] + numbers[tail];
    if(sum > target) {
      tail--;
    }else if(sum < target){
      head++;
    }else {
      return [++head, ++tail];
    }
  }
  return [-1, -1];
};