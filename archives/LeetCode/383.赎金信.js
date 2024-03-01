/*
 * @lc app=leetcode.cn id=383 lang=javascript
 *
 * [383] 赎金信 
 * 
 */

// @lc code=start
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
// hash表可以优化一下，可以优化成数组，因为全是小写，所以可以优化为数组
const canConstruct = (ransomNote, magazine) => {
  const arr = new Array(26).fill(0);
  for (let i = 0; i < magazine.length; i++) {
    arr[magazine.codePointAt(i)-97]++;
  };
  for (let i = 0; i < ransomNote.length; i++) {
    if(arr[ransomNote.codePointAt(i)-97]) {
      arr[ransomNote.codePointAt(i)-97]--;
    }else{
      return false;
    }
  };
  return true;
};
// Accepted
// 129/129 cases passed (88 ms)
// Your runtime beats 96.55 % of javascript submissions
// Your memory usage beats 90.93 % of javascript submissions (40.3 MB)
// @lc code=end
// 首想hash表
const canConstruct = (ransomNote, magazine) => {
  const hashMap = new Map();
  for (let i = 0; i < magazine.length; i++) {
    const now = magazine.charAt(i);
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else{
      hashMap.set(now, 1);
    }
  };

  for (let i = 0; i < ransomNote.length; i++) {
    const now = ransomNote.charAt(i);
    if(hashMap.has(now) && hashMap.get(now)) {
      hashMap.set(now, hashMap.get(now) - 1);
    }else{
      return false;
    }
  };
  return true;
};

