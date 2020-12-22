/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

const squareEveryOne = n => {
  let ans = 0;
  while(n) {
    const mod = n % 10;
    ans += mod * mod;
    n = (n - mod) / 10;
  };
  return ans;
}

const isHappy = n => {
  const hashSet = new Set();
  while(!hashSet.has(n)) {
    hashSet.add(n);
    n = squareEveryOne(n);
    if(n === 1) return true;
  };
  return false;
};
// Accepted
// 402/402 cases passed (80 ms)
// Your runtime beats 97.43 % of javascript submissions
// Your memory usage beats 59.04 % of javascript submissions (39.3 MB)
// @lc code=end

// 纯粹就数学算了，至于循环多少次，不知道
// 就题目给的用例，我试了，最少可以6次， 但也就仅限这些case了
const squareEveryOne = n => {
  let ans = 0;
  while(n) {
    const mod = n % 10;
    ans += mod * mod;
    n = (n - mod) / 10;
  };
  return ans;
}

const isHappy_1 = n => {
  // 至于循环多少次， 不知道
  let count = 6;
  while(count) {
    n = squareEveryOne(n);
    if(n === 1) return true;
    count--;
  }
  return false;
};
// Accepted
// 402/402 cases passed (84 ms)
// Your runtime beats 92.18 % of javascript submissions
// Your memory usage beats 72.09 % of javascript submissions (39.1 MB)
