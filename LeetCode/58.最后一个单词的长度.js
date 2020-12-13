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

// 发现关键在于解题的思路，不在于代码
// 从字符串末尾开始向前遍历，其中主要有两种情况
// 第一种情况，以”hello world“ 为例，之前从后往前遍历直到空格为止
// 第二种情况，以“hello world ”为例，需要先把末尾的空格去掉，然后和第一种情况一样
// 因此，就是先把末尾空格去掉，然后末尾开始遍历
const lengthOfLastWord = s => {
  let end = s.length - 1;
  while(end >= 0 && s.charAt(end) === " ") end--;
  if(end < 0) return 0;
  let start = end;
  while(start >= 0 && s.charAt(start) !== " ") start--;
  return end - start;
};
// @lc code=end

// 自己的解法
const lengthOfLastWord_1 = s => {
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

