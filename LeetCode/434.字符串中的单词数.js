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
  s = s.trim();
  if(!s) return 0;
  let res = 0;
  let arr = s.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if(arr[i]) res++;
  };
  return res;
};
// @lc code=end

