/*
 * @lc app=leetcode.cn id=434 lang=javascript
 *
 * [434] 字符串中的单词数 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const countSegments = s => {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if((i === 0 || s.charAt(i-1) === ' ') && s.charAt(i) !== ' ') 
      res++;
  };
  return res;
};
// @lc code=end

const countSegments = s => {
  s = s.trim();
  if(!s) return 0;
  let res = 0;
  let arr = s.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if(arr[i]) res++;
  };
  return res;
};

const countSegments = s => {
  const trimmed = s.trim();
  if(trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
};

