/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
// 真的跪下了
const isPalindrome = (x) => {
  if (x < 0) return false;
  if (x < 10) return true;
  // 获取数量级
  let n = 10 ** Math.floor(Math.log10(x));
  while (n > 1 && x > 0) {
      if (Math.floor(x / n) !== x % 10) return false;
      x = Math.floor((x % n) / 10);
      n /= 100;
  }
  return true;
}
// @lc code=end

// 字符串方式
const isPalindrome_1 = function(x) {
  if(x < 0) return false;
  if(x < 10) return true; 
  const res = Number(String(x).split('').reverse().join(''));
  return res === x;
};

// 字符串方式
// 只需要比较一半即可
const isPalindrome_2 = function(x) {
  // if(x < 0) return false;
  // if(x < 10) return true; 
  // const str = String(x);
  // const len = str.length;
  // return str.slice(0, Math.floor(len / 2)) === str[1, 2]
};

// 数学方式
const isPalindrome_3 = function(x) {
  if(x < 0) return false;
  if(x < 10) return true;
  const xOld = x;
  let res = 0;
  while(x != 0) {
    const pop = x % 10;
    x = (x - pop) / 10;
    res = res * 10 + pop;
  }
  return res === xOld;
};