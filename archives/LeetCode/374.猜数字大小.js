/*
 * @lc app=leetcode.cn id=374 lang=javascript
 *
 * [374] 猜数字大小 
 * 
 */

// @lc code=start
/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
const guessNumber = n => {
  let l = 1;
  let r = n;
  while(l <= r) {
    const m = l + ((r - l) >> 1);
    if(guess(m) === 1) {
      l = m + 1;
    }else if(guess(m) === -1) {
      r = m - 1;
    }else {
      return m;
    }
  }
};
// @lc code=end

