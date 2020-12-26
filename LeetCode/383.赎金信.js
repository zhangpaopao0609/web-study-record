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
// @lc code=end

