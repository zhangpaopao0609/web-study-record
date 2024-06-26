/*
 * @lc app=leetcode.cn id=231 lang=javascript
 *
 * [231] 2的幂
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 利用位运算
// 因为 x & (-x) 会得到 x 最右边的 1
// 因此，若 x 是 2 的幂，那么二进制中就只会存在一个1
function isPowerOfTwo(n) {
  if (n <= 0) {
    return false;
  }
  return (n & (-n)) === n;
}
// Accepted
// 1108/1108 cases passed (84 ms)
// Your runtime beats 98.36 % of javascript submissions
// Your memory usage beats 57.76 % of javascript submissions (39.1 MB)
// @lc code=end

// 原始的除以2
function isPowerOfTwo_1(n) {
  if (n === 0) {
    return false;
  }
  while (n !== 1) {
    if (n % 2 !== 0) {
      return false;
    }
    n /= 2;
  }
  return true;
}
// Accepted
// 1108/1108 cases passed (80 ms)
// Your runtime beats 99.56 % of javascript submissions
// Your memory usage beats 73.35 % of javascript submissions (39 MB)

// 利用位运算
// 因为 x & (-x) 会得到 x 最右边的 1
// 因此，若 x 是 2 的幂，那么二进制中就只会存在一个1
function isPowerOfTwo_2(n) {
  if (n <= 0) {
    return false;
  }
  return (n & (n - 1)) === 0;
}
