/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const romanToInt = function(s) {
  const hashMap = {
    'I': 1,
    'IV': 4,
    'V': 5,
    'IX': 9,
    'X': 10,
    'XL': 40,
    'L': 50,
    'XC': 90,
    'C': 100,
    'CD': 400,
    'D': 500,
    'CM': 900,
    'M': 1000
  };
  let res = 0;
  while(s) {
    const temp = hashMap[s.slice(0, 2)];
    if(temp){
      res += temp;
      s = s.substr(2);
    }else{
      res += hashMap[s[0]];
      s = s.substr(1);
    }
  }
  return res;
};
// @lc code=end

