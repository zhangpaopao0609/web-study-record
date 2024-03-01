/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 * 
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle 
 * @return {number}
 */

 /**
  * KMP 解法     
  * https://www.zhihu.com/question/21923021
  */
const strStr = function(haystack, needle) {
  return KMP(haystack, needle)
};

const KMP = (t, p) => {
  let i = 0;
  let j = 0;
  const next = getNext(p);
  while(i < t.length && j < p.length) {
    if(j == -1 || t[i] == p[j]) {
      i++;
      j++;
    }else {
      j = next[j];
    }
  }

  if(j == p.length) {
    return i - j;
  }else {
    return -1;
  }
};

const getNext = p => {
  const next = [];
  next[0] = -1;
  let i = 0;
  let j = -1;

  while(i < p.length) {
    if(j == -1 || p[i] == p[j]) {
      ++i;
      ++j;
      next[i] = j;
    }else {
      j = next[j];
    }
  }
  return next;
}  
// @lc code=end

// KMP







const strStr_1 = function(haystack, needle) {
  if(!needle) return 0;
  return haystack.indexOf(needle);
};
