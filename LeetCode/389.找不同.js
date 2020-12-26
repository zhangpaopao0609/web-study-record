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
// 可以用 ASCII求和
const findTheDifference = (s, t) => {
  let sumS = 0;
  let sumT = 0;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    sumS += s.codePointAt(i);
    sumT += t.codePointAt(i);
  };
  sumT += t.codePointAt(len);
  return String.fromCharCode(sumT - sumS);
};
// Accepted
// 54/54 cases passed (80 ms)
// Your runtime beats 93.64 % of javascript submissions
// Your memory usage beats 98.44 % of javascript submissions (38.2 MB)
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