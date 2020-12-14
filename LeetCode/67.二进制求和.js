/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和 
 * 
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = function(a, b) {
  const a_n = Number(a);
  const b_n = Number(b);
  let res_n = a_n + b_n;
  let res = 0;
  let n = 1;
  while(true) {
    let r = res_n % 10;
    res_n = Math.floor(res_n / 10);
    if(r > 1 ) {
      res_n++;
      r = r - 2;
    }
    res += r * Math.pow(10, n-1);
    if(!res_n) {
      return res.toString();
    }
    n++;
  }
};
// @lc code=end


// 想法不错，但是当超过长度就不行了
const addBinary_1 = function(a, b) {
  const a_n = Number(a);
  const b_n = Number(b);
  let res_n = a_n + b_n;
  let res = 0;
  let n = 1;
  while(true) {
    let r = res_n % 10;
    res_n = Math.floor(res_n / 10);
    if(r > 1 ) {
      res_n++;
      r = r - 2;
    }
    res += r * Math.pow(10, n-1);
    if(!res_n) {
      return res.toString();
    }
    n++;
  }
};

