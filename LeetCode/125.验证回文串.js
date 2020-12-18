/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = s => {
  const len = s.length;
  let i = 0;
  let j = len - 1;
  while(i < j) {
    const ii = s.charAt(i);
    const jj = s.charAt(j);
    if(/[^0-9a-zA-Z]/.test(ii)) {
      i++;
      continue;
    };
    if(/[^0-9a-zA-Z]/.test(jj)) {
      j--;
      continue;
    }  
    if(ii.toLowerCase() !== jj.toLowerCase()) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};
// @lc code=end

