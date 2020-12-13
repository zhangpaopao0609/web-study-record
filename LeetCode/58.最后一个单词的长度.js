/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 *  
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = s => {
  const len = s.length;
  if(!len) return 0;
  if(s === ' ') return 0;
  let flag = true;
  let num = 0;
  for (let i = len-1; i >= 0; i--) {
    if(s.charAt(i) === ' ' && flag) {
      num++;
    }else if(s.charAt(i) === ' ') {
      return len-i-1-num;
    }else {
      flag = false;
    }
  }
  return len-num;
};
// @lc code=end

