/*
 * @lc app=leetcode.cn id=405 lang=javascript
 *
 * [405] 数字转换为十六进制数
 * 
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
// 16进制，4位变为


// @lc code=end

const toHex = num => {
  if(!num) return '0';
  if(num < 0) num = Math.pow(2, 32) + num;
  let res = '';
  while(num) {
    const mod = num % 16;
    res = (mod > 9 ? String.fromCharCode(mod + 87) : mod) + res ;
    num = (num - mod) / 16;
  };
  return res;
};
// Accepted
// 100/100 cases passed (60 ms)
// Your runtime beats 100 % of javascript submissions
// Your memory usage beats 63.11 % of javascript submissions (37.6 MB)

