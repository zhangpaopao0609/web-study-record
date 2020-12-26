/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 * 
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
//
const arrToNum = arr => {
  const hashMap = new Map();
  let res = '';
  for (let i = 0; i < arr.length; i++) {
    if(!hashMap.has(arr[i])) {
      hashMap.set(arr[i], i);
    }
    res += hashMap.get(arr[i]);
  };
  return res;
}

const wordPattern = (pattern, s) => {
  return arrToNum(pattern.split('')) === arrToNum(s.split(' '));
};
// Accepted
// 36/36 cases passed (80 ms)
// Your runtime beats 73.22 % of javascript submissions
// Your memory usage beats 91.43 % of javascript submissions (37.4 MB)
// @lc code=end

