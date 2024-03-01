/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 * 
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

// 数组两数最大差可以转化为连续子数组最大和
const maxDistanceToMaxSum = arr => {
  let size = arr.length - 1;
  while(size > 0) {
    arr[size] = arr[size] - arr[size-1];
    size--;
  }
  arr[0] = 0;
  return arr;
}
// dp[i] = max(dp[i-1]+ai, ai);
const maxProfit = prices => {
  let ans = 0;
  let dp = [];
  const arr = maxDistanceToMaxSum(prices);
  dp[0] = 0;
  for (let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(dp[i-1] + arr[i], arr[i]);
  };
  for (let i = 0; i < dp.length; i++) {
    ans = Math.max(dp[i], ans);
  }
  return ans;
};
// @lc code=end

// 暴力法
const maxProfit_1 = prices => {
  let ans = 0;
  const len = prices.length
  for (let i = 0; i < len-1; i++) {
    for (let j = i+1; j < len; j++) {
      ans = Math.max(ans, prices[j] - prices[i]);
    }
  }
  return ans;
};

// 一次遍历，当前点之前的最小值可得，然后当前点之前的最大值可得
const maxProfit_2 = prices => {
  let min = Infinity;
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    if(prices[i] < min) {
      min = prices[i];
    }else if(prices[i] - min > max) {
      max = prices[i] - min;
    }
  }
  return max;
};
