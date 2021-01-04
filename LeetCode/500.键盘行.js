/*
 * @lc app=leetcode.cn id=500 lang=javascript
 *
 * [500] 键盘行
 * 
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
// 现在，我要写一个正则模式，然后优化一下
const findWords = words => {
  const re = /(^[qwertyuiop]+$)|(^[asdfghjkl]+$)|(^[zxcvbnm]+$)/;
  return words.filter(i => re.test(i.toLowerCase()));
};
// @lc code=end
// 这是hash表模式，但是麻烦，所以我没写完
const findWords = words => {
  const hashMap = new Map();
  const res = [];
  for (let i = 0; i < words.length; i++) {
    let flag = true;
    const now = words[i];
    for (let j = 0; j < now.length-1; j++) {
      if(hashMap.get(now[j]) !== hashMap.get(now[j+1])) {
        flag = false;
        break;
      }
    };
    flag && res.push(now);
  }
};


// 现在，我要写一个正则模式
const findWords = words => {
  const res = [];
  // const re = /^([qwertyuiop]|[asdfghjkl]|[zxcvbnm])+$/;
  const re1 = /^[qwertyuiop]+$/;
  const re2 = /^[asdfghjkl]+$/;
  const re3 = /^[zxcvbnm]+$/;
  words.forEach(item => {
    const copy = item.toLowerCase();
    if(re1.test(copy) || re2.test(copy) || re3.test(copy)) {
      res.push(item);
    }
  });
  return res;
};