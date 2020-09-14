// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

 // 解法1 暴力破解法
const twoSum_1 = function(nums, target) {
    for( let i=0; i<nums.length-1; i++ ) {
      for( let j=i+1; j<nums.length; j++ ) {
        if(nums[i] + nums[j] === target) {
          return [i, j]
        } 
      }
    }
};

// 解法2 hash表
/**
 * https://leetcode-cn.com/problems/two-sum/submissions/
 */
const twoSum_2 = function(nums, target) {
  let hash = {};
  let j = 0;
  for(let i=0; i<nums.length; i++) {
    if(hash[target-nums[i]] === undefined) {
      hash[nums[i]] = j++;
    }else {
      return [ hash[target-nums[i]], i ]
    }
  }
};

// 解法3 解法2的改进
const twoSum_3 = function(nums, target) {
  let hash = {};
  let j;
  for(let i=0; i<nums.length; i++) {
    hash[nums[i]] = i
  }
  for(let i=0; i<nums.length; i++) {
    j = hash[target-nums[i]];
    if(j && i !== j) {
      return [i, j]
    }
  }
};

// 解法4 leetCode看到的比较舒服的代码
const twoSum_4 = (nums, target) => {
  const prevNums = {};                         // 存放出现过的数字，和对应的索引
  for (let i = 0; i < nums.length; i++) {      // 遍历每一项
    const curNum = nums[i];                    // 当前项
    const targetNum = target - curNum;         // 希望从过去的数字中找到的呼应项
    const targetNumIndex = prevNums[targetNum];// 在prevNums中找targetNum的索引
    if ( targetNumIndex !== undefined ) {        // 如果能找到
      return [targetNumIndex, i];              // 直接返回targetNumIndex和当前的i
    }                                          // 如果找不到，说明之前没出现过targetNum
    prevNums[curNum] = i;                      // 往prevNums存当前curNum和对应的i
  }
}


console.log(twoSum_3([2,4,4,6], 8))
