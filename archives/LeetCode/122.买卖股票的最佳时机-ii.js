/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 *
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfitToMaxSum = arr => {
  for (let i = arr.length-1; i > 0; i--) {
    arr[i] = arr[i] - arr[i-1];
  }
  arr[0] = 0;
  return arr;
}

const maxProfit = prices => {
  const arr = maxProfitToMaxSum(prices);

  let ans = 0;
  for (let i = 0; i < arr.length; i++) {
    ans += arr[i] > 0 ? arr[i] : 0;
  }
  return ans;
};
// @lc code=end

