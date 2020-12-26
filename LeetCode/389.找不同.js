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
// 如果将两个字符串拼接成一个字符串，则问题转换成字符串中出现奇数词的字符，类似于只出现一次的数字，使用位运算
const findTheDifference = (s, t) => {
  let res = 0;
  const len = s.length;
  for (let i = 0; i < len; i++) {
    res ^= s.codePointAt(i);
    res ^= t.codePointAt(i);
  };
  res ^= t.codePointAt(len);
  return String.fromCharCode(res);
};
// Accepted
// 54/54 cases passed (88 ms)
// Your runtime beats 73.31 % of javascript submissions
// Your memory usage beats 97.06 % of javascript submissions (38.1 MB)
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