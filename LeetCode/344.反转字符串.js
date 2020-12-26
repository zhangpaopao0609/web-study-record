/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 *  
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = s => {
  let start = 0;
  let end = s.length - 1;
  while(start < end) {
    const temp = s[start];
    s[start] = s[end];
    s[end] = temp;
    start++;
    end--;
  }  
};
// @lc code=end

