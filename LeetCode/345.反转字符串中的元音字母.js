/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// 关键是在左右两边都有原因字母的时候才交换
const reverseVowels = s => {
  const vowel = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  const arrS = s.split('');
  let start = 0;
  let end = s.length-1;
  // 不是同时移动，发现了元音就另一边移动，本边暂停
  while(start < end) {
    if(!vowel.has(arrS[start])) {
      start++;
    };
    if(!vowel.has(arrS[end])) {
      end--;
    };
    if(vowel.has(arrS[start]) && vowel.has(arrS[end])) {
      const temp = arrS[start];
      arrS[start] = arrS[end];
      arrS[end] = temp;
      start++;
      end--;
    }
  };
  return arrS.join('');
};
// @lc code=end

