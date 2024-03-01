/*
 * @lc app=leetcode.cn id=342 lang=javascript
 *
 * [342] 4的幂
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 我们首先检查 x 是否为 2 的幂：x > 0 and x & (x - 1) == 0。然后可以确定 x = 2^a
// 若 x 为 4 的幂则 a 为偶数。
// 下一步是考虑 a=2k 和 a=2k+1 两种情况，对 x 对 3 进行取模：

const isPowerOfFour = n => {
  return n > 0 && (n & (n-1)) === 0 && (n % 3) === 1;
};
// @lc code=end

const isPowerOfFour_1 = n => {
  if(n <= 0) return false;
  while(n % 4 === 0) {
    n /= 4;
  };
  return n === 1;
};


const isPowerOfFour = n => {
  return /^10*$/.test(n.toString(4));
};

const isPowerOfFour = n => {
  return ((Math.log10(n) / Math.log10(4)) % 1) === 0;
};

// 这个十六进制怎么转换呀
const isPowerOfFour = n => {
  return (n > 0 && n & (n-1)) === 0 && (n & 0xaaaaaaaa) === 0;
};