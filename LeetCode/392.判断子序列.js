/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 *
 * https://leetcode-cn.com/problems/is-subsequence/description/
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 优化一下，这就是双指针,让代码看起来更简洁好看
const isSubsequence = (s, t) => {
  const m = s.length, n = t.length;
  let i = 0, j = 0;

  while(i < m && j < n) {
    if(s.charAt(i) === t.charAt(j)) {
      i++;
    };
    j++;
  };
  return i === m;
};
// @lc code=end
const isSubsequence = (s, t) => {
  if(!s) return true;
  let j = 0;
  for (let i = 0; i < t.length; i++) {
    if(s.charAt(j) === t.charAt(i)) {
      j++;
      if(j === s.length) return true;
    };
    
  };
  return false;
};


// 优化一下，这就是双指针,让代码看起来更简洁好看
const isSubsequence = (s, t) => {
  const m = s.length, n = t.length;
  let i = 0, j = 0;

  while(i < m && j < n) {
    if(s.charAt(i) === t.charAt(j)) {
      i++;
    };
    j++;
  };
  return i === m;
};
