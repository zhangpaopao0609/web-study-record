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
  let res = "";
  let carry = 0;
  for (let i = a.length-1, j = b.length - 1; i >=0 || j >= 0; i--, j--) {
    let sum = carry;
    sum += i >= 0 ? parseInt(a[i]) : 0;
    sum += j >= 0 ? parseInt(b[j]) : 0;
    res += sum % 2;
    carry = parseInt(sum / 2);
  };
  if(carry) res += '1';
  return res.split('').reverse().join('');
};
// @lc code=end

// 最为朴素的，结果我没想到，不过这超过长度还是不行的
const addBinary_2 = function(a, b) {
  return (parseInt(a, 2) + parseInt(b, 2)).toString(2);
};

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

