/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
const countAndSay = function(n) {
  let res = '1';
  for (let i = 1; i < n; i++) {
    const splitArr = splitSame(res);
    res = '';
    for (let j = 0; j < splitArr.length; j++) {
      const now = splitArr[j];
      res += now.length + now[0];
    }
  }
  return res;
};

const splitSame = str => {
  let temp = str[0];
  const res = [];
  for (let i = 1; i <= str.length; i++) {
    if(str[i] === str[i-1]) {
      temp += str[i];
    }else {
      res.push(temp);
      temp = str[i];
    }
  }
  return res;
}
// @lc code=end

