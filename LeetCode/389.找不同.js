/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 *
 * https://leetcode-cn.com/problems/find-the-difference/description/ 
 * 
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
// 可以用数组的嘛，我咋就是不长记性呢？
const findTheDifference = (s, t) => {
  const arr = new Array(26).fill(0);
  const len = s.length;
  for (let i = 0; i < len; i++) {
    arr[s.codePointAt(i) - 97]++;
  };
  for (let i = 0; i < len + 1; i++) {
    if(arr[t.codePointAt(i) - 97]) {
      arr[t.codePointAt(i) - 97]--;
    }else{
      return t.charAt(i);
    }
  }
};
// Accepted
// 54/54 cases passed (76 ms)
// Your runtime beats 97.99 % of javascript submissions
// Your memory usage beats 91.71 % of javascript submissions (38.4 MB)
// @lc code=end

const findTheDifference = (s, t) => {
  const hashMap = new Map();
  const len = s.length;
  for (let i = 0; i < len; i++) {
    const now = s.charAt(i);
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else{
      hashMap.set(now, 1);
    }
  };
  for (let i = 0; i < len + 1; i++) {
    const now = t.charAt(i);
    const nowValue = hashMap.get(now);
    if(hashMap.has(now) && nowValue) {
      hashMap.set(now, nowValue - 1);
    }else{
      return now;
    }
  }
};

