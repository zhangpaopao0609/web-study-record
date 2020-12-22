/*
 * @lc app=leetcode.cn id=191 lang=javascript
 *
 * [191] 位1的个数 
 * 
 */

// @lc code=start
/**
 * @param {number} n - a positive integer
 * @return {number}
 */

// 因为 n & (n-1)总是能把n中最低位的1变成0
const hammingWeight = n =>  {
  let count = 0;
  while(n) {
    count++;
    n &= (n-1);
  }
  return count;
};
// @lc code=end

// 因为 n & 1 就是 n 的末尾数
// 然后 n >> 1 即可
const hammingWeight_1 = n =>  {
  let count = 0;
  let num = 32;
  while(num) {
    if(n & 1) count++;
    n >>= 1;
    num--;
  }
  return count;
};

