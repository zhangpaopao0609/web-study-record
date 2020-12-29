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
const toHex = num => {
  if(!num) return '0';
  let calc = 0xf;
  let trans = 0;
  let res = '';

  while(trans <= 28) {
    const now = (num & calc) >>> trans;
    res = (now > 9 ? String.fromCharCode(now + 87) : now) +res;
    calc <<= 4;
    trans += 4;
  }
  
  while(res.charAt(0) === '0') {
    res = res.substr(1)
  }

  return res;
};

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

