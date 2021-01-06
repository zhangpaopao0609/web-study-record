/*
 * @lc app=leetcode.cn id=507 lang=javascript
 *
 * [507] 完美数
 *
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
// 欧几里得-欧拉定理
const pn = p => {
  return (1 << (p-1)) * ((1 <<p) -1);
}

const checkPerfectNumber = num => {
  const arr = [2, 3, 5, 7, 13];
  for (let i = 0; i < arr.length; i++) {
    if(pn(arr[i]) === num) return true;
  };
  return false;
};
// @lc code=end

// 迭代
const checkPerfectNumber = num => {
  if(num === 1) return false; 
  let sum = 0;
  let i = 2;
  while(i*i < num) {
    if(num % i === 0) {
      sum += (num / i) + i;
    };
    i++; 
  };
  if(i*i === num) sum += i;
  if(sum+1 === num) {
    return true;
  };
  return false;
};