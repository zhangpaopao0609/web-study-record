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
// 双向映射，A <-> B
const wordPattern = (pattern, s) => {
  const hashA = new Map();
  const hashB = new Map();

  const arrS = s.split(' ');
  if(arrS.length !== pattern.length) return false;

  // for (let i = 0; i < len; i++) {
  //   if(hashA.has(pattern[i]) && arrS[i] !== hashA.get(pattern[i]) || hashB.has(arrS[i]) && pattern[i] !== hashB.get(arrS[i])) return false;
  //   hashA.set(pattern[i], arrS[i]);
  //   hashB.set(arrS[i], pattern[i]);
  // }
  for (const [i, word] of arrS.entries()) {
    const p = pattern[i];
    if(hashA.has(p) && word !== hashA.get(p) || hashB.has(word) && p !== hashB.get(word)) return false;
    hashA.set(p, word);
    hashB.set(word, p);
  }
  return true;
};
// @lc code=end



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

const wordPattern_1 = (pattern, s) => {
  return arrToNum(pattern.split('')) === arrToNum(s.split(' '));
};
// Accepted
// 36/36 cases passed (80 ms)
// Your runtime beats 73.22 % of javascript submissions
// Your memory usage beats 91.43 % of javascript submissions (37.4 MB)
