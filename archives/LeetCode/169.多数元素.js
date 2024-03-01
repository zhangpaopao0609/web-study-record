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
// 

// 投票算法证明：

// 如果候选人不是maj 则maj,会和其他非候选人一起反对候选人,所以候选人一定会下台(maj==0时发生换届选举)
// 如果候选人是maj , 则maj会支持自己，其他候选人会反对，同样因为maj 票数超过一半，所以maj一定会成功当选

// Boyer-Moore 投票
const majorityElement = nums => {
  let candidate = null;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if(!count) candidate = nums[i];
    count += candidate === nums[i] ? 1 : -1;
  }
  return candidate;
};
// @lc code=end

// ---------------------------------------------------------------------------------------------
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


// ---------------------------------------------------------------------------------------------
// 优化hash  用打擂台方式把值保存下来，这样就可以不用遍历hash表了
const majorityElement_2 = nums => {
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

// ---------------------------------------------------------------------------------------------
// 利用排序
// 拍完序后下标为 n>>1 的元素一定是众数
const majorityElement_3 = nums => {
  // 这里就不用归并排了，直接使用内置api sort 排序
  return nums.sort((a,b) => a - b)[nums.length >> 1];
};

// 随机
// 随机的时间复杂度为 O(n)  这是期望值了
const majorityElement_4 = nums => {
  
};

// ---------------------------------------------------------------------------------------------
// 利用分治的思想，数组nums的众数至少是左或者右其中一个的众数
// 因此，如果左右众数相同，那么就是了，如果不同，那就比较左右众数在左右数组合并中出现的次数
// 关键在于思想
const findTheWinner = (nums, l, r, num) => {
  let res = 0;
  for (let i = l; i <= r; i++) {
    if(nums[i] === num) res++;
  };
  return res;
};

const devideAndConquer = (nums, l, r) => {
  if(l === r) return nums[l];
  const m = (l + r) >> 1;
  const leftNum = devideAndConquer(nums, l, m);
  const rightNum = devideAndConquer(nums, m+1, r);
  if(leftNum === rightNum) return leftNum;

  const leftNumCount = findTheWinner(nums, l, r, leftNum);
  const rightNumCount = findTheWinner(nums, l, r, rightNum);
  return leftNumCount > rightNumCount ? leftNum : rightNum;
}

const majorityElement_5 = nums => {
  return devideAndConquer(nums, 0, nums.length - 1);
};